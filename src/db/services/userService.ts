import { v4 as uuidv4 } from 'uuid';
import pool from '../connection';

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'admin' | 'institute' | 'student';
  first_name?: string;
  last_name?: string;
  is_active: boolean;
}

export const userService = {
  async createUser(userData: Omit<User, 'id' | 'is_active'>): Promise<User> {
    const id = uuidv4();
    const [result] = await pool.execute(
      `INSERT INTO users (id, email, password, role, first_name, last_name)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, userData.email, userData.password, userData.role, userData.first_name, userData.last_name]
    );
    
    return { ...userData, id, is_active: true } as User;
  },

  async getUserByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    return (rows as User[])[0] || null;
  },

  async getUserById(id: string): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    
    return (rows as User[])[0] || null;
  }
}; 