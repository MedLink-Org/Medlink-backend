const bcrypt = require('bcryptjs');
const { getBcryptRounds } = require('../config/auth');

const DUMMY_PASSWORD_HASH =
  '$2a$12$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';

const badRequest = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

const normalizeCredentials = (body = {}) => {
  const email =
    typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const password = typeof body.password === 'string' ? body.password : '';

  if (!email || !password) {
    throw badRequest('Email and password are required');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw badRequest('Enter a valid email address');
  }

  if (password.length < 8) {
    throw badRequest('Password must be at least 8 characters');
  }

  if (Buffer.byteLength(password, 'utf8') > 72) {
    throw badRequest('Password must not exceed 72 bytes');
  }

  return { email, password };
};

const hashPassword = (password) =>
  bcrypt.hash(password, getBcryptRounds());

const verifyPassword = (password, passwordHash) =>
  bcrypt.compare(password, passwordHash || DUMMY_PASSWORD_HASH);

module.exports = {
  hashPassword,
  normalizeCredentials,
  verifyPassword,
};
