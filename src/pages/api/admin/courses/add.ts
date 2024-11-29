import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      facultyId,
      name,
      code,
      description,
      duration,
      capacity,
      qualificationRequired
    } = req.body;

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    try {
      await connection.beginTransaction();

      const id = uuidv4();

      await connection.execute(
        `INSERT INTO courses (
          id,
          faculty_id,
          name,
          code,
          description,
          duration,
          capacity,
          qualification_required
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          facultyId,
          name,
          code,
          description,
          duration,
          capacity,
          qualificationRequired
        ]
      );

      await connection.commit();

      res.status(201).json({ 
        success: true,
        message: 'Course added successfully',
        redirectTo: '/admin/dashboard'
      });

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      await connection.end();
    }

  } catch (error) {
    console.error('Error adding course:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to add course' 
    });
  }
} 