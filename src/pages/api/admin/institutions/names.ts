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
    const [rows] = await connection.execute(
      'SELECT id, name FROM institutions ORDER BY name'
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching institutions:', error);
    res.status(500).json({ message: 'Failed to fetch institutions' });
  } finally {
    await connection.end();
  }
} 