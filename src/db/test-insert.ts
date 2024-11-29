import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';
import pool from './connection';

async function testInsert() {
  try {
    // 1. Create a test user
    const userId = uuidv4();
    const hashedPassword = await hash('test123', 10);
    
    console.log('Creating test user...');
    await pool.execute(
      `INSERT INTO users (id, email, password, role, first_name, last_name)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, 'test@example.com', hashedPassword, 'admin', 'Test', 'User']
    );

    // 2. Create a test institution
    const institutionId = uuidv4();
    console.log('Creating test institution...');
    await pool.execute(
      `INSERT INTO institutions (id, name, location, contact_email, admin_id)
       VALUES (?, ?, ?, ?, ?)`,
      [institutionId, 'Test University', 'Test Location', 'test@uni.com', userId]
    );

    // 3. Create a test faculty
    const facultyId = uuidv4();
    console.log('Creating test faculty...');
    await pool.execute(
      `INSERT INTO faculties (id, institution_id, name, contact_email)
       VALUES (?, ?, ?, ?)`,
      [facultyId, institutionId, 'Test Faculty', 'faculty@test.com']
    );

    // 4. Create a test course
    const courseId = uuidv4();
    console.log('Creating test course...');
    await pool.execute(
      `INSERT INTO courses (id, faculty_id, name, code, capacity)
       VALUES (?, ?, ?, ?, ?)`,
      [courseId, facultyId, 'Test Course', 'TEST101', 50]
    );

    // 5. Verify the data was inserted
    console.log('\nVerifying inserted data...');
    
    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', ['test@example.com']);
    console.log('\nUsers:', users);

    const [institutions] = await pool.execute('SELECT * FROM institutions WHERE name = ?', ['Test University']);
    console.log('\nInstitutions:', institutions);

    const [faculties] = await pool.execute('SELECT * FROM faculties WHERE name = ?', ['Test Faculty']);
    console.log('\nFaculties:', faculties);

    const [courses] = await pool.execute('SELECT * FROM courses WHERE code = ?', ['TEST101']);
    console.log('\nCourses:', courses);

    console.log('\nAll test data inserted successfully!');

  } catch (error) {
    console.error('Error inserting test data:', error);
  } finally {
    await pool.end();
  }
}

// Run the test
testInsert(); 