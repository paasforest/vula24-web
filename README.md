# Vula24 Web

Next.js application for **Vula24** emergency locksmith services: dark, mobile-first marketing pages (Syne + DM Sans, gold accent) plus a PostgreSQL-backed API (Prisma) for customer requests, locksmith applications, and contact messages.

Run `npm run dev` and open [http://localhost:3000](http://localhost:3000) to view the site.

## Prerequisites

- Node.js 18+
- A PostgreSQL database (e.g. [Railway](https://railway.app/))

## Environment variables

Create `.env.local` (never commit it; it is gitignored):

| Variable | Purpose |
| -------- | ------- |
| `DATABASE_URL` | PostgreSQL connection string from Railway |
| `ADMIN_PASSWORD` | Secret used to protect admin API routes |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number for the public site |
| `NEXT_PUBLIC_PHONE_NUMBER` | Display / `tel:` phone |
| `NEXT_PUBLIC_EMAIL` | Public contact email |

Copy from `.env.example` and fill in real values.

## Database (Prisma)

```bash
npm install
npx prisma generate
npx prisma db push
```

`db push` applies the schema in `prisma/schema.prisma` to your Railway database. Run it whenever the schema changes.

**Note:** The Prisma CLI reads `.env` by default, not `.env.local`. For `db push` on your machine, either put `DATABASE_URL` in a root `.env` file (gitignored) or run `DATABASE_URL="postgresql://..." npx prisma db push`.

## API routes (backend)

| Method | Path | Description |
| ------ | ---- | ----------- |
| `POST` | `/api/requests` | Create a `CustomerRequest` (`phone`, `location`, `service`, `urgency`: `ASAP` \| `30 min` \| `Flexible`) |
| `POST` | `/api/applications` | Create a `LocksmithApplication` (`name`, `phone`, `city`, `experience`, `vehicle`) |
| `POST` | `/api/contact` | Create a `ContactMessage` (`name`, `email`, `message`) |
| `GET` | `/api/admin/requests` | List all customer requests (newest first). **Auth:** `Authorization: Bearer <ADMIN_PASSWORD>` or header `X-Admin-Password: <ADMIN_PASSWORD>` |
| `PATCH` | `/api/admin/requests/[id]` | Set request `status` to `assigned`. Same admin auth as above |

Admin endpoints return `401` if the password is missing or incorrect.

## Local development

```bash
npm install
npm run dev
```

## Deploy on Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com/), import the repository.
3. Set **Environment Variables** in the project settings to match `.env.example` (use your production `DATABASE_URL` and secrets).
4. Deploy. The build runs `prisma generate` before `next build` (see `package.json` `build` script).

## Railway database

1. Create a PostgreSQL instance on Railway.
2. Copy the **connection URL** (often includes `sslmode=require`).
3. Set `DATABASE_URL` in Vercel and in local `.env.local`.
4. From your machine (with `DATABASE_URL` set), run `npx prisma db push` to create tables, or use Railway’s shell with the same command.

## License

Private; all rights reserved.
