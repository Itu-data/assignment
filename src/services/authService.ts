import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcryptjs';
import pool from '../db/connection';
import nodemailer from 'nodemailer';

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'institute';
}

interface VerificationData {
  userId: string;
  token: string;
  expiresAt: Date;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

export const authService = {
  async register(data: RegisterData) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Check if email exists
      const [existingUsers] = await connection.execute(
        'SELECT id FROM users WHERE email = ?',
        [data.email]
      );

      if ((existingUsers as any[]).length > 0) {
        throw new Error('Email already registered');
      }

      // Create user
      const userId = uuidv4();
      const hashedPassword = await hash(data.password, 10);
      const verificationToken = uuidv4();
      
      await connection.execute(
        `INSERT INTO users (id, email, password, role, first_name, last_name, is_active)
         VALUES (?, ?, ?, ?, ?, ?, false)`,
        [userId, data.email, hashedPassword, data.role, data.firstName, data.lastName]
      );

      // Store verification token
      await connection.execute(
        `INSERT INTO email_verifications (user_id, token, expires_at)
         VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))`,
        [userId, verificationToken]
      );

      await connection.commit();

      // Send verification email
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${verificationToken}`;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: data.email,
        subject: 'Verify your email',
        html: `
          <h1>Welcome to Career Guidance</h1>
          <p>Please click the link below to verify your email:</p>
          <a href="${verificationUrl}">Verify Email</a>
          <p>This link will expire in 24 hours.</p>
        `
      });

      return { userId, email: data.email };

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async verifyEmail(token: string) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      // Get verification data
      const [verifications] = await connection.execute(
        `SELECT user_id, expires_at FROM email_verifications 
         WHERE token = ? AND verified_at IS NULL`,
        [token]
      );

      const verification = (verifications as VerificationData[])[0];
      
      if (!verification) {
        throw new Error('Invalid or expired verification token');
      }

      if (new Date(verification.expiresAt) < new Date()) {
        throw new Error('Verification token has expired');
      }

      // Update user and verification status
      await connection.execute(
        'UPDATE users SET is_active = true WHERE id = ?',
        [verification.userId]
      );

      await connection.execute(
        'UPDATE email_verifications SET verified_at = NOW() WHERE token = ?',
        [token]
      );

      await connection.commit();

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async login(email: string, password: string) {
    // Get user
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const user = (users as any[])[0];

    if (!user) {
      throw new Error('Invalid credentials');
    }

    if (!user.is_active) {
      throw new Error('Please verify your email first');
    }

    // Verify password
    const isValidPassword = await compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name
    };
  }
}; 