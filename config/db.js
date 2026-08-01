const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on('connect', () => {
  console.log('Connected to Database');
});

pool.on('error', (error) => {
  console.error('Error connecting to database', error);
  process.exit(-1);
});

module.exports = pool;
