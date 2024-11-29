import type { NextApiRequest, NextApiResponse } from 'next';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  try {
    const [applications] = await connection.execute(
      `SELECT 
        a.id,
        a.name,
        a.surname,
        c.name as course_name,
        i.name as institution_name,
        a.email,
        a.phone_number,
        a.status,
        a.created_at
       FROM applications a
       JOIN courses c ON a.course_id = c.id
       JOIN institutions i ON a.institution_id = i.id
       ORDER BY a.created_at DESC`
    );

    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Failed to fetch applications' });
  } finally {
    await connection.end();
  }
} 