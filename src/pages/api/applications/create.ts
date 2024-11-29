import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'career_guidance',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const connection = await pool.getConnection();

  try {
    const {
      institutionId,
      courseId,
      personalStatement,
      previousEducation,
    } = req.body;

    // Start transaction
    await connection.beginTransaction();

    // Generate unique ID for application
    const applicationId = uuidv4();
    
    // For testing purposes, use a dummy student ID
    // In production, this should come from the authenticated user's session
    const studentId = uuidv4();

    // Insert the application
    const [result] = await connection.execute(
      `INSERT INTO applications (
        id,
        student_id,
        course_id,
        personal_statement,
        previous_education,
        status
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        applicationId,
        studentId,
        courseId,
        personalStatement,
        previousEducation,
        'pending'
      ]
    );

    // Commit the transaction
    await connection.commit();

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId
    });

  } catch (error: any) {
    // Rollback in case of error
    await connection.rollback();
    console.error('Application submission error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit application',
      error: error.message
    });
  } finally {
    // Release the connection back to the pool
    connection.release();
  }
} 