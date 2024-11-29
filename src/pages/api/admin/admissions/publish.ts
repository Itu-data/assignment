import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      courseId,
      startDate,
      endDate,
      capacity,
      requirements,
      description,
      status = 'published'
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

      // Simplified query to match the table structure
      const [result] = await connection.execute(
        `INSERT INTO admissions (
          id,
          course_id,
          start_date,
          end_date,
          capacity,
          requirements,
          description,
          status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          courseId,
          startDate,
          endDate,
          capacity,
          requirements,
          description,
          status
        ]
      );

      await connection.commit();

      res.status(201).json({ 
        success: true,
        message: 'Admission published successfully',
        data: {
          id,
          courseId,
          startDate,
          endDate,
          capacity,
          requirements,
          description,
          status
        }
      });

    } catch (error) {
      await connection.rollback();
      console.error('Database error:', error);
      throw error;
    } finally {
      await connection.end();
    }

  } catch (error) {
    console.error('Error publishing admission:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to publish admission',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 