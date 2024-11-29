import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { 
      institutionId,
      name,
      description,
      headOfFaculty,
      contactEmail
    } = req.body;

    // Create connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });

    try {
      // Start transaction
      await connection.beginTransaction();

      // Generate UUID for new faculty
      const id = uuidv4();

      // Insert faculty
      await connection.execute(
        `INSERT INTO faculties (
          id,
          institution_id,
          name,
          description,
          head_of_faculty,
          contact_email
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          id,
          institutionId,
          name,
          description,
          headOfFaculty,
          contactEmail
        ]
      );

      // Commit transaction
      await connection.commit();

      // Return success response
      res.status(201).json({ 
        success: true,
        message: 'Faculty added successfully',
        redirectTo: '/admin/dashboard'  // Add redirect path
      });

    } catch (error) {
      // Rollback on error
      await connection.rollback();
      throw error;
    } finally {
      // Close connection
      await connection.end();
    }

  } catch (error) {
    console.error('Error adding faculty:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to add faculty' 
    });
  }
} 