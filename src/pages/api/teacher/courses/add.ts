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
      faculty_id,
      name,
      code,
      description,
      duration,
      qualification_required,
      capacity
    } = req.body;

    // Validate required fields
    if (!faculty_id || !name || !code || !duration || !capacity) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields' 
      });
    }

    await connection.beginTransaction();

    // Generate UUID for new course
    const id = uuidv4();

    // Insert course
    const [result] = await connection.execute(
      `INSERT INTO courses (
        id,
        faculty_id,
        name,
        code,
        description,
        duration,
        qualification_required,
        capacity,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        id,
        faculty_id,
        name,
        code,
        description,
        duration,
        qualification_required,
        capacity
      ]
    );

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: 'Course added successfully',
      course: {
        id,
        faculty_id,
        name,
        code,
        description,
        duration,
        qualification_required,
        capacity
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error adding course:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add course'
    });
  } finally {
    await connection.end();
  }
} 