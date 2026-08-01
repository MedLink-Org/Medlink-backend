const getRequiredEnv = (name) => {
  const value = process.env[name];

  if (!value) {
    const error = new Error(`${name} is not configured`);
    error.code = 'AUTH_CONFIG_ERROR';
    throw error;
  }

  return value;
};

const getJwtSecret = () => getRequiredEnv('JWT_SECRET');
const getJwtExpiresIn = () => process.env.JWT_EXPIRES_IN || '7d';
const getBcryptRounds = () => {
  const rounds = Number.parseInt(process.env.BCRYPT_ROUNDS || '12', 10);

  if (!Number.isInteger(rounds) || rounds < 10 || rounds > 15) {
    const error = new Error('BCRYPT_ROUNDS must be between 10 and 15');
    error.code = 'AUTH_CONFIG_ERROR';
    throw error;
  }

  return rounds;
};

module.exports = {
  getBcryptRounds,
  getJwtExpiresIn,
  getJwtSecret,
};
