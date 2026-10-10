# Mini SaaS Template Store

A small full-stack app where users can register, log in, browse templates, and save favorites.

## Tech Stack

- **Frontend:** React (Vite), React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **ORM:** Mongoose
- **Auth:** JWT + bcrypt password hashing

## Live Demo

- Frontend: https://fullstackintern.onrender.com
- Backend API: https://backend-rezc.onrender.com/api

> Note: the backend runs on Render's free tier, which sleeps after 15 minutes of
> inactivity. The first request after that can take up to ~60 seconds while it
> wakes up — the app shows a "waking up" message during this instead of looking
> stuck. Browsing again right after is instant.

## Setup Instructions

### 1. Backend (`server/`)

```bash
cd server
npm install
cp .env.example .env
```

Fill in `.env`:
- `MONGODB_URI` — your MongoDB Atlas connection string
- `JWT_SECRET` — any long random string

```bash
npm run seed   # seeds 23 sample templates across 7 categories
npm run dev    # starts the API on http://localhost:5000
```

### 2. Frontend (`client/`)

```bash
cd client
npm install
cp .env.example .env   # defaults already point to http://localhost:5000/api
npm run dev             # starts the app on http://localhost:5173
```

### 3. Try it

1. Open http://localhost:5173
2. Register a new account
3. Browse `/templates`, filter by category, favorite a few
4. Check `/favorites`

## Author

Arunkumar P
arunkumar.palaniselvam.s@gmail.com
