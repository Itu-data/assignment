import type { NextApiRequest, NextApiResponse } from 'next';
import { authService } from '@/services/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }

    await authService.verifyEmail(token);
    res.status(200).json({ message: 'Email verified successfully' });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
} 