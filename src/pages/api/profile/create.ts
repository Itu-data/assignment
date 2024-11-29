import type { NextApiRequest, NextApiResponse } from 'next';
import { profileService } from '@/services/profileService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const profile = await profileService.createProfile(req.body);
    return res.status(201).json(profile);
  } catch (error: any) {
    console.error('Create Profile Error:', error);
    return res.status(500).json({ message: error.message });
  }
} 