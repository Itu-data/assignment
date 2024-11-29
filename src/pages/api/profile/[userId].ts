import type { NextApiRequest, NextApiResponse } from 'next';
import { profileService } from '@/services/profileService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (typeof userId !== 'string') {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    switch (req.method) {
      case 'GET':
        const profile = await profileService.getProfile(userId);
        if (!profile) {
          return res.status(404).json({ message: 'Profile not found' });
        }
        return res.status(200).json(profile);

      case 'PUT':
        const updatedProfile = await profileService.updateProfile(userId, req.body);
        return res.status(200).json(updatedProfile);

      case 'DELETE':
        await profileService.deleteProfile(userId);
        return res.status(204).end();

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
  } catch (error: any) {
    console.error('Profile API Error:', error);
    return res.status(500).json({ message: error.message });
  }
} 