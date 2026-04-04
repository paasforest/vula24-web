# vula24-api

Standalone Express API for the Vula24 platform. Handles customer lead capture and locksmith registration, backed by a PostgreSQL database on Railway.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check — returns `{ ok: true }` |
| `POST` | `/api/jobs/website/request` | Submit a customer service lead |
| `POST` | `/api/auth/locksmith/register` | Register a new locksmith account |

### POST /api/jobs/website/request

**Body (JSON):**

```json
{
  "name": "Jane Smith",
  "phone": "0821234567",
  "city": "Cape Town",
  "serviceType": "Car lockout",
  "urgency": "ASAP",
  "notes": "Locked keys inside"
}
```

- `phone` — required, 9–15 digits
- `city` — required
- `serviceType` — required
- `urgency` — required, one of `ASAP` | `30 min` | `Flexible`
- `name`, `notes` — optional

**Response:** `201 { ok: true, id: <bigint> }`

---

### POST /api/auth/locksmith/register

**Body (JSON):**

```json
{
  "name": "John Doe",
  "phone": "0831234567",
  "email": "john@example.com",
  "password": "securepassword",
  "accountType": "individual",
  "businessName": "Doe Locksmiths"
}
```

- `name`, `phone`, `email`, `password` — required
- `password` — minimum 8 characters (stored as bcrypt hash)
- `accountType` — optional, defaults to `individual`
- `businessName` — optional

**Response:** `201 { ok: true, id: <bigint> }`  
**Conflict:** `409 { error: "An account with this email already exists." }`

---

## Database

Tables are created automatically on startup if they don't exist:

- **`customer_leads`** — stores service requests from the website
- **`locksmiths`** — stores registered locksmith accounts (passwords hashed with bcrypt)

## Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```
DATABASE_URL=postgresql://user:password@host:5432/dbname
PORT=3000
NODE_ENV=development
JWT_SECRET=change-me-to-a-long-random-string
CORS_ORIGIN=*
```

On Railway, `DATABASE_URL` and `PORT` are injected automatically.

## Running Locally

```bash
npm install
cp .env.example .env
# Edit .env with your local Postgres credentials
npm run dev
```

## Deploying to Railway

1. Connect this repo to a new Railway service.
2. Add a PostgreSQL plugin (or link the existing one).
3. Set `NODE_ENV=production` and `JWT_SECRET` in Railway environment variables.
4. Railway will detect the `Dockerfile` and build/deploy automatically.
5. The `/health` endpoint is used for Railway health checks.

## Architecture

```
Vercel (Next.js frontend)
        │
        │  proxies via Next.js API routes
        ▼
Railway (this service — vula24-api)
        │
        │  pg client
        ▼
Railway PostgreSQL
```

The Next.js frontend proxies requests through its own API routes to avoid browser CORS issues. The two proxy routes in vula24-web point to this service:

- `JOBS_WEBSITE_REQUEST_URL` → `POST /api/jobs/website/request`
- `LOCKSMITH_REGISTER_URL` → `POST /api/auth/locksmith/register`

## License

Private; all rights reserved.
