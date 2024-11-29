import type { NextApiRequest, NextApiResponse } from 'next';
import { authService } from '@/services/authService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { email, password, firstName, lastName, role } = req.body;

    if (!email || !password || !firstName || !lastName || !role) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (role !== 'student' && role !== 'institute') {
      return res.status(400).json({ message: 'Invalid role' });
    }

    const user = await authService.register({
      email,
      password,
      firstName,
      lastName,
      role
    });

    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
      user
    });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
} 