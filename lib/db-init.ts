// Database initialization script
// Run this once to set up the database schema
import { initializeDatabase } from './db';

async function main() {
  try {
    await initializeDatabase();
    console.log('Database initialization complete!');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

main();
