import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '@/db/connection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const connection = await pool.getConnection();

    try {
      // For testing purposes, we'll use a hardcoded teacher ID
      // In production, this should come from the session
      const [rows] = await connection.execute(
        `SELECT 
          u.id,
          u.first_name as firstName,
          u.last_name as lastName,
          u.email,
          p.phone,
          p.department,
          p.qualification,
          p.bio
        FROM users u
        LEFT JOIN profiles p ON u.id = p.user_id
        WHERE u.role = 'teacher'
        LIMIT 1`
      );

      const profile = rows[0] || {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'teacher@example.com',
        phone: '',
        department: '',
        qualification: '',
        bio: ''
      };

      res.status(200).json(profile);

    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
} 