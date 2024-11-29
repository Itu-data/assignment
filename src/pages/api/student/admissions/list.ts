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
    const [admissions] = await connection.execute(
      `SELECT 
        a.id,
        c.name as course_name,
        f.name as faculty_name,
        a.start_date,
        a.end_date,
        a.capacity,
        a.requirements,
        a.description,
        a.status
       FROM admissions a
       JOIN courses c ON a.course_id = c.id
       JOIN faculties f ON c.faculty_id = f.id
       WHERE a.status = 'published'
       AND a.end_date >= CURDATE()
       ORDER BY a.start_date ASC`
    );

    res.status(200).json(admissions);
  } catch (error) {
    console.error('Error fetching admissions:', error);
    res.status(500).json({ message: 'Failed to fetch admissions' });
  } finally {
    await connection.end();
  }
} 