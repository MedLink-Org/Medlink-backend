const test = require('node:test');
const assert = require('node:assert/strict');

process.env.JWT_SECRET = 'test-secret-that-is-long-enough-for-auth-tests';
process.env.JWT_EXPIRES_IN = '1h';
process.env.BCRYPT_ROUNDS = '10';

const authenticate = require('../middleware/authenticate');
const {
  hashPassword,
  normalizeCredentials,
  verifyPassword,
} = require('../services/passwordService');
const {
  createAccessToken,
  verifyAccessToken,
} = require('../services/tokenService');

const testUser = {
  user_id: 42,
  email: 'user@example.com',
};

test('creates and verifies a Medlink access token', () => {
  const token = createAccessToken(testUser);
  const payload = verifyAccessToken(token);

  assert.equal(payload.sub, '42');
  assert.equal(payload.email, testUser.email);
});

test('normalizes email and requires email plus password', () => {
  assert.deepEqual(
    normalizeCredentials({
      email: ' USER@EXAMPLE.COM ',
      password: 'password123',
    }),
    {
      email: 'user@example.com',
      password: 'password123',
    }
  );

  assert.throws(
    () => normalizeCredentials({ email: 'user@example.com' }),
    /Email and password are required/
  );
});

test('rejects invalid credentials', () => {
  assert.throws(
    () =>
      normalizeCredentials({
        email: 'not-an-email',
        password: 'password123',
      }),
    /valid email/
  );

  assert.throws(
    () =>
      normalizeCredentials({
        email: 'user@example.com',
        password: 'short',
      }),
    /at least 8 characters/
  );
});

test('hashes and verifies passwords', async () => {
  const passwordHash = await hashPassword('password123');

  assert.notEqual(passwordHash, 'password123');
  assert.equal(await verifyPassword('password123', passwordHash), true);
  assert.equal(await verifyPassword('wrong-password', passwordHash), false);
});

test('authentication middleware exposes the signed-in user', () => {
  const token = createAccessToken(testUser);
  const req = {
    get: (header) =>
      header === 'authorization' ? `Bearer ${token}` : undefined,
  };
  const res = {};
  let nextCalled = false;

  authenticate(req, res, () => {
    nextCalled = true;
  });

  assert.equal(nextCalled, true);
  assert.equal(req.user.user_id, '42');
  assert.equal(req.user.email, testUser.email);
});

test('authentication middleware rejects a missing token', () => {
  const req = { get: () => undefined };
  const response = {};
  const res = {
    status(code) {
      response.status = code;
      return this;
    },
    json(body) {
      response.body = body;
      return this;
    },
  };

  authenticate(req, res, () => assert.fail('next should not be called'));

  assert.equal(response.status, 401);
  assert.deepEqual(response.body, { error: 'Authentication required' });
});
