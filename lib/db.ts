import { Pool } from 'pg';

// Get database URL from environment variable
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL environment variable is required. Please set it in your .env.local file or environment variables.'
  );
}

// Create a connection pool
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Required for Railway PostgreSQL
  },
});

// Test the connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Initialize database schema
export async function initializeDatabase() {
  const client = await pool.connect();
  try {
    // Create contact_submissions table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company_title VARCHAR(255),
        challenge VARCHAR(100),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    
    // Create index on email for faster lookups
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_contact_submissions_email 
      ON contact_submissions(email);
    `);
    
    // Create index on created_at for sorting
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at 
      ON contact_submissions(created_at DESC);
    `);
    
    console.log('Database schema initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Insert a contact submission
export async function insertContactSubmission(data: {
  name: string;
  email: string;
  companyTitle?: string;
  challenge?: string;
  message: string;
}) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO contact_submissions (name, email, company_title, challenge, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [data.name, data.email, data.companyTitle || null, data.challenge || null, data.message]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error inserting contact submission:', error);
    throw error;
  } finally {
    client.release();
  }
}

// Get all contact submissions (for admin purposes)
export async function getContactSubmissions(limit: number = 100) {
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id, name, email, company_title, challenge, message, created_at
       FROM contact_submissions
       ORDER BY created_at DESC
       LIMIT $1`,
      [limit]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    throw error;
  } finally {
    client.release();
  }
}

export default pool;
