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
      name,
      surname,
      institutionId,
      courseId,
      dateOfBirth,
      nationality,
      gender,
      address,
      email,
      phoneNumber,
      personalStatement,
      previousEducation,
      requirements
    } = req.body;

    await connection.beginTransaction();

    // Generate UUID for new application
    const id = uuidv4();

    // Insert application
    const [result] = await connection.execute(
      `INSERT INTO applications (
        id,
        name,
        surname,
        institution_id,
        course_id,
        date_of_birth,
        nationality,
        gender,
        address,
        email,
        phone_number,
        personal_statement,
        previous_education,
        requirements,
        status,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW())`,
      [
        id,
        name,
        surname,
        institutionId,
        courseId,
        dateOfBirth,
        nationality,
        gender,
        address,
        email,
        phoneNumber,
        personalStatement,
        previousEducation,
        requirements
      ]
    );

    await connection.commit();

    return res.status(201).json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: id
    });

  } catch (error) {
    await connection.rollback();
    console.error('Error submitting application:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit application'
    });
  } finally {
    await connection.end();
  }
} 