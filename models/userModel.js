const pool = require('../config/db');

const publicUserFields = `
  user_id,
  email,
  created_at,
  updated_at,
  last_login_at
`;

const createUser = (email, passwordHash) =>
  pool.query(
    `INSERT INTO users (email, password_hash)
     VALUES ($1, $2)
     ON CONFLICT (email)
     DO UPDATE SET
       password_hash = EXCLUDED.password_hash,
       updated_at = NOW()
     WHERE users.password_hash IS NULL
     RETURNING ${publicUserFields}`,
    [email, passwordHash]
  );

const getUserByEmail = (email) =>
  pool.query(
    `SELECT
       ${publicUserFields},
       password_hash
     FROM users
     WHERE email = $1
     LIMIT 1`,
    [email]
  );

const updateLastLogin = (userId) =>
  pool.query(
    `UPDATE users
     SET last_login_at = NOW(),
         updated_at = NOW()
     WHERE user_id = $1
     RETURNING ${publicUserFields}`,
    [userId]
  );

const getUserById = (userId) =>
  pool.query(
    `SELECT ${publicUserFields}
     FROM users
     WHERE user_id = $1`,
    [userId]
  );

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  updateLastLogin,
};
