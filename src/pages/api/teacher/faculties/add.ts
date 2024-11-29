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
      institution_id,
      name,
      head_of_faculty,
      contact_email,
      description
    } = req.body;

    // Validate required fields
    if (!institution_id || !name || !head_of_faculty || !contact_email) {
      return res.status(400).json({ 
        success: false,
        message: 'Missing required fields' 
      });
    }

    await connection.beginTransaction();

    // Generate UUID for new faculty
    const id = uuidv4();

    // Insert faculty
    const [result] = await connection.execute(
      `INSERT INTO faculties (
        id,
        institution_id,
        name,
        head_of_faculty,
        contact_email,
        description,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        id,
        institution_id,
        name,
        head_of_faculty,
        contact_email,
        description
      ]
    );

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: 'Faculty added successfully',
      faculty: {
        id,
        institution_id,
        name,
        head_of_faculty,
        contact_email,
        description
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error adding faculty:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to add faculty'
    });
  } finally {
    await connection.end();
  }
} 