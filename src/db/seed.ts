import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';
import pool from './connection';

async function seed() {
  try {
    // Create admin user
    const adminId = uuidv4();
    const hashedPassword = await hash('admin123', 12);
    
    await pool.execute(
      `INSERT INTO users (id, email, password, role, first_name, last_name)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [adminId, 'admin@example.com', hashedPassword, 'admin', 'Admin', 'User']
    );

    // Create sample institution
    const institutionId = uuidv4();
    await pool.execute(
      `INSERT INTO institutions (id, name, location, contact_email, contact_phone, website, description, admin_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        institutionId,
        'University of Technology',
        'New York',
        'contact@uot.edu',
        '123-456-7890',
        'https://uot.edu',
        'A leading institution in technology education',
        adminId
      ]
    );

    // Create sample faculty
    const facultyId = uuidv4();
    await pool.execute(
      `INSERT INTO faculties (id, institution_id, name, description, head_of_faculty, contact_email)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        facultyId,
        institutionId,
        'Faculty of Engineering',
        'Engineering and Technology Studies',
        'Dr. John Smith',
        'engineering@uot.edu'
      ]
    );

    // Create sample course
    await pool.execute(
      `INSERT INTO courses (id, faculty_id, name, code, description, duration, qualification_required, capacity)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        uuidv4(),
        facultyId,
        'Computer Science',
        'CS101',
        'Bachelor of Science in Computer Science',
        '4 years',
        'High School Diploma',
        100
      ]
    );

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seed(); 