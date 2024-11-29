export type Role = 'student' | 'teacher' | 'admin';

export interface User {
  role: Role;
  // Add other user properties as needed
} 