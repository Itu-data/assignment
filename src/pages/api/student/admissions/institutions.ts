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
    // Fetch institutions from admissions through courses and faculties
    const [institutions] = await connection.execute(
      `SELECT DISTINCT i.id, i.name 
       FROM institutions i
       JOIN faculties f ON f.institution_id = i.id
       JOIN courses c ON c.faculty_id = f.id
       JOIN admissions a ON a.course_id = c.id
       WHERE a.status = 'published'
       ORDER BY i.name`
    );

    res.status(200).json(institutions);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    res.status(500).json({ message: 'Failed to fetch institutions' });
  } finally {
    await connection.end();
  }
} 