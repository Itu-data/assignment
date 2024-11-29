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
    // Fetch faculty names with institution names
    const [faculties] = await connection.execute(
      `SELECT f.id, f.name, i.name as institution_name 
       FROM faculties f
       JOIN institutions i ON f.institution_id = i.id
       ORDER BY f.name`
    );

    res.status(200).json(faculties);
  } catch (error) {
    console.error('Error fetching faculties:', error);
    res.status(500).json({ message: 'Failed to fetch faculties' });
  } finally {
    await connection.end();
  }
} 