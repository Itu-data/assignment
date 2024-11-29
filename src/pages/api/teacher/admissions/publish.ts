import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    const { 
      course_id,
      start_date,
      end_date,
      capacity,
      requirements,
      description,
      status = 'published'
    } = req.body;

    // Validate required fields
    if (!course_id || !start_date || !end_date || !capacity) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields' 
      });
    }

    await connection.beginTransaction();

    // Generate UUID for new admission
    const id = uuidv4();

    // Insert admission
    const [result] = await connection.execute(
      `INSERT INTO admissions (
        id,
        course_id,
        start_date,
        end_date,
        capacity,
        requirements,
        description,
        status,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        id,
        course_id,
        start_date,
        end_date,
        capacity,
        requirements,
        description,
        status
      ]
    );

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: 'Admission published successfully',
      admission: {
        id,
        course_id,
        start_date,
        end_date,
        capacity,
        requirements,
        description,
        status
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error publishing admission:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to publish admission'
    });
  } finally {
    await connection.end();
  }
} 