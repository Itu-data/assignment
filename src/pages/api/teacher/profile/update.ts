import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/db/connection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      department,
      qualification,
      bio
    } = req.body;

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Update user table
      await connection.execute(
        `UPDATE users 
         SET first_name = ?, last_name = ?, email = ?
         WHERE role = 'teacher'
         LIMIT 1`,
        [firstName, lastName, email]
      );

      // Update or insert profile
      await connection.execute(
        `INSERT INTO profiles (user_id, phone, department, qualification, bio)
         SELECT id, ?, ?, ?, ?
         FROM users WHERE role = 'teacher'
         LIMIT 1
         ON DUPLICATE KEY UPDATE
         phone = VALUES(phone),
         department = VALUES(department),
         qualification = VALUES(qualification),
         bio = VALUES(bio)`,
        [phone, department, qualification, bio]
      );

      await connection.commit();
      res.status(200).json({ message: 'Profile updated successfully' });

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
} 