const userModel = require('../models/userModel');
const {
  hashPassword,
  normalizeCredentials,
  verifyPassword,
} = require('../services/passwordService');
const { createAccessToken } = require('../services/tokenService');
const { getJwtExpiresIn } = require('../config/auth');

const sendAuthResponse = (res, statusCode, user) =>
  res.status(statusCode).json({
    access_token: createAccessToken(user),
    token_type: 'Bearer',
    expires_in: getJwtExpiresIn(),
    user,
  });

const register = async (req, res) => {
  try {
    const { email, password } = normalizeCredentials(req.body);
    const passwordHash = await hashPassword(password);
    const result = await userModel.createUser(email, passwordHash);

    if (result.rows.length === 0) {
      return res.status(409).json({
        error: 'A user account with this email already exists',
      });
    }

    return sendAuthResponse(res, 201, result.rows[0]);
  } catch (error) {
    if (error.code === 'AUTH_CONFIG_ERROR') {
      console.error(error.message);
      return res.status(500).json({ error: 'Authentication is not configured' });
    }

    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    if (error.code === '23505') {
      return res.status(409).json({
        error: 'A user account with this email already exists',
      });
    }

    console.error('Registration failed:', error);
    return res.status(500).json({ error: 'Registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = normalizeCredentials(req.body);
    const result = await userModel.getUserByEmail(email);
    const account = result.rows[0];
    const passwordMatches = await verifyPassword(
      password,
      account?.password_hash
    );

    if (!account || !passwordMatches) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const updatedUser = await userModel.updateLastLogin(account.user_id);
    return sendAuthResponse(res, 200, updatedUser.rows[0]);
  } catch (error) {
    if (error.code === 'AUTH_CONFIG_ERROR') {
      console.error(error.message);
      return res.status(500).json({ error: 'Authentication is not configured' });
    }

    if (error.statusCode) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.error('Login failed:', error);
    return res.status(500).json({ error: 'Login failed' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const result = await userModel.getUserById(req.user.user_id);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User account not found' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Unable to load current user:', error);
    return res.status(500).json({ error: 'Unable to load current user' });
  }
};

module.exports = {
  getCurrentUser,
  login,
  register,
};
