# GhostBreach Security Operations Center (SOC)

A cybersecurity-themed SOC dashboard built for a university **Advanced Programming** project.
React frontend, Express.js REST API, MongoDB Atlas database, JWT authentication and full CRUD for
assets, vulnerabilities, scans, reports, remediation tasks and team members.

> **Safety note:** this is a safe educational simulation. Scans are **simulated**: the server only accepts
> the name of an asset already registered in the app, makes no network connection to any target, and writes
> fictional findings to the local database. There is no exploitation, malware, credential theft or real scanning.

## Features
- Public marketing site (Home, About, Services, Platform, Work, Contact)
- Sign up, sign in and sign out with JWT; protected `/soc` routes
- Dashboard with live metrics calculated from database data (security score, protected assets, open and critical findings, charts, activity feed)
- Assets: list, search, filter, create, edit, view, delete
- Vulnerabilities: list, search, filter, create, edit, change status, delete
- Simulated scans: Queued, Running (progress), Completed; findings, asset score and a report are saved
- Reports: list, view, download JSON
- Remediation tasks and Team management (team changes are Admin-only)
- Profile (name and organization saved to the database) and Settings (saved in the browser only)
- Loading and error messages; validation on forms and on the API

## Technology stack
| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, React Router DOM 7, Recharts, lucide-react, Tailwind CSS |
| Backend | Node.js, Express.js, Mongoose, CORS, dotenv |
| Database | MongoDB Atlas (database `ghostbreach_soc`) |
| Auth | bcryptjs (password hashing), jsonwebtoken (JWT) |

## Folder structure
```
ap-project/
├── src/                     React app
│   ├── components/  layouts/  pages/
│   ├── context/             AuthContext, SocDataContext
│   ├── services/            api.js + one service per module
│   └── utils/               validators.js, mappers.js
├── backend/
│   ├── config/db.js         MongoDB connection
│   ├── controllers/  routes/  models/  middleware/
│   ├── utils/               generateToken, scanSimulator, helpers
│   ├── seed.js              demo data
│   └── server.js
├── .env.example             frontend settings (safe values only)
└── backend/.env.example     backend settings (placeholders)
```

## Setup

### 1. MongoDB Atlas
1. Create a free cluster and a database user in Atlas.
2. Under Network Access, allow your IP address.
3. Copy the connection string (Connect, Drivers) and add `/ghostbreach_soc` before the `?`.

### 2. Backend
```
cd backend
npm install
```
Copy `backend/.env.example` to `backend/.env` and fill in your own values:

| Variable | Meaning |
|---|---|
| `PORT` | API port (5000) |
| `MONGO_URI` | Your Atlas connection string (**private**) |
| `JWT_SECRET` | Long random string (**private**, 16+ characters). Generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `JWT_EXPIRES_IN` | Token lifetime, default `7d` |
| `CLIENT_URL` | Frontend origin(s) allowed by CORS, e.g. `http://localhost:5173` |

Never commit `backend/.env` or put these values in the frontend or in documents.

### 3. Seed the database
```
cd backend
npm run seed
```
This clears and refills only the GhostBreach collections (1 user, 7 assets, 9 vulnerabilities, 6 scans, 5 reports, 6 remediation tasks, 4 team members).

### 4. Run the backend
```
cd backend
npm run dev
```
Check: http://localhost:5000/api/health should return `{ "success": true, "message": "GhostBreach SOC API is running" }`.

### 5. Run the frontend
Copy `.env.example` to `.env` (contains only `VITE_API_URL=http://localhost:5000/api`), then:
```
npm install
npm run dev
```
Open http://localhost:5173. Production build: `npm run build`.

## Demo login
- Email: `admin@ghostbreach.com`
- Password: `GhostBreach@2026!`

The password exists only as a bcrypt hash in MongoDB. New accounts created on the Sign Up page get the **Viewer** role (read-only).

## Roles
| Role | Access |
|---|---|
| Admin | Everything, including team and user management |
| Security Analyst, Developer | Create, edit and delete assets, vulnerabilities, scans, reports and remediation tasks |
| Viewer | Read-only |

## API overview
All routes except health, register and login need `Authorization: Bearer <token>`.

| Area | Endpoints |
|---|---|
| Health | `GET /api/health` |
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Assets | `GET/POST /api/assets`, `GET/PUT/DELETE /api/assets/:id` |
| Vulnerabilities | `GET/POST /api/vulnerabilities`, `GET/PUT/DELETE /api/vulnerabilities/:id` |
| Scans | `GET/POST /api/scans`, `GET/PUT/DELETE /api/scans/:id` |
| Reports | `GET/POST /api/reports`, `GET/PUT/DELETE /api/reports/:id` |
| Remediation | `GET/POST /api/remediation`, `GET/PUT/DELETE /api/remediation/:id` |
| Team | `GET/POST /api/team`, `GET/PUT/DELETE /api/team/:id` |
| Users | `GET /api/users`, `GET/PUT/DELETE /api/users/:id` |

Errors return JSON `{ success: false, message }` with status 400 (invalid input), 401 (not signed in), 403 (role not allowed), 404 (not found), 409 (duplicate) or 500 (server error).
Full field and endpoint tables are in `GhostBreach_SOC_Database_Documentation.xlsx`.

## Testing instructions
1. Start backend and frontend as above and sign in with the demo account.
2. Go through each page and create, edit and delete a record; refresh the page and confirm it persists. You can also check the data in MongoDB Compass.
3. Scans: click **Start New Scan**, choose an asset, and watch Queued, Running, Completed. New findings appear on Vulnerabilities and a report on Reports.
4. Sign out and open `/soc`: you should be sent to `/login`.
5. Sign up with a new account: you can view data but writes show "Access denied".
6. Run `npm run build` in the project root.

## Known limitations
- Settings are stored in the browser (no settings collection).
- The activity feed is built from recent findings, completed scans and your current session.
- Forgot Password is a UI-only page (no email service).
- One seeded demo scan intentionally stays at "Running".
