import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // For now, we'll use a simple session check
  // You can replace this with your actual session check logic later
  const hasSession = req.cookies['auth-token']; // Replace with your actual session cookie name

  if (!hasSession) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  return res.status(200).json({ authenticated: true });
} 