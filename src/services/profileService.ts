import { v4 as uuidv4 } from 'uuid';
import pool from '../db/connection';

export interface ProfileData {
  userId: string;
  phone?: string;
  address?: string;
  bio?: string;
  avatarUrl?: string;
  // Student specific
  dateOfBirth?: string;
  educationLevel?: string;
  currentSchool?: string;
  // Institute specific
  institutionName?: string;
  website?: string;
  accreditation?: string;
  facilities?: string;
  // Admin specific
  department?: string;
  position?: string;
}

export const profileService = {
  async createProfile(data: ProfileData) {
    const id = uuidv4();
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      await connection.execute(
        `INSERT INTO profiles (
          id, user_id, phone, address, bio, avatar_url,
          date_of_birth, education_level, current_school,
          institution_name, website, accreditation, facilities,
          department, position
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id, data.userId, data.phone, data.address, data.bio, data.avatarUrl,
          data.dateOfBirth, data.educationLevel, data.currentSchool,
          data.institutionName, data.website, data.accreditation, data.facilities,
          data.department, data.position
        ]
      );

      await connection.commit();
      return { id, ...data };

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async getProfile(userId: string) {
    const [rows] = await pool.execute(
      `SELECT p.*, u.email, u.first_name, u.last_name, u.role
       FROM profiles p
       JOIN users u ON p.user_id = u.id
       WHERE p.user_id = ?`,
      [userId]
    );
    return (rows as any[])[0] || null;
  },

  async updateProfile(userId: string, data: Partial<ProfileData>) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();

      const updateFields = Object.entries(data)
        .filter(([key]) => key !== 'userId')
        .map(([key]) => `${key} = ?`)
        .join(', ');

      const values = Object.entries(data)
        .filter(([key]) => key !== 'userId')
        .map(([_, value]) => value);

      await connection.execute(
        `UPDATE profiles SET ${updateFields} WHERE user_id = ?`,
        [...values, userId]
      );

      await connection.commit();
      return this.getProfile(userId);

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  async deleteProfile(userId: string) {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      await connection.execute('DELETE FROM profiles WHERE user_id = ?', [userId]);
      await connection.execute('DELETE FROM users WHERE id = ?', [userId]);
      await connection.commit();

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}; 