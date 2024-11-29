import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, location, contactEmail, contactPhone, website, description } = req.body;

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

      // Generate UUID for new institution
      const id = uuidv4();

      // Insert institution
      await connection.execute(
        `INSERT INTO institutions (
          id, 
          name, 
          location, 
          contact_email, 
          contact_phone, 
          website, 
          description
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [id, name, location, contactEmail, contactPhone, website, description]
      );

      // Commit transaction
      await connection.commit();

      // Return success with the institution data
      res.status(201).json({ 
        success: true,
        message: 'Institution added successfully',
        institution: {
          id,
          name,
          location,
          contactEmail,
          contactPhone,
          website,
          description
        }
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
    console.error('Error adding institution:', error);
    res.status(500).json({ 
      success: false,
      message: 'Failed to add institution' 
    });
  }
} 