# Email and Password Authentication

The backend registers and authenticates users with only an email address and
password. Passwords are hashed before storage, and successful registration or
login returns a Medlink access token.

## Backend setup

1. Copy the values from `.env.example` into `.env`.
2. Set `JWT_SECRET` to a long random secret.
3. For a new database, apply `config/migrations/001_add_users.sql`.
4. If the previous Google users migration was already applied, apply
   `config/migrations/002_replace_google_auth_with_password.sql` instead.
5. Restart the backend.

Existing Google-only rows are preserved by the replacement migration. Those
users can establish a password by registering with the same email address.

## Register

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure-password"
}
```

## Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secure-password"
}
```

Both endpoints return:

```json
{
  "access_token": "<medlink-jwt>",
  "token_type": "Bearer",
  "expires_in": "7d",
  "user": {
    "user_id": "1",
    "email": "user@example.com"
  }
}
```

Send the token on every protected API request:

```http
Authorization: Bearer <medlink-jwt>
```

All patient, appointment, doctor, nurse, staff, medical-record, and billing
routes require this header. `GET /api/auth/me` returns the signed-in user's
current profile.
