import type { NextApiRequest, NextApiResponse } from 'next';
import { authService } from '@/services/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await authService.login(email, password);
    res.status(200).json({ user });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
} 