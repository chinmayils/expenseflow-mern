# ExpenseFlow — MERN Stack Expense Tracker

A full-stack personal finance application. The existing React/Vite interface is retained and connected to an Express REST API backed by MongoDB.

## Stack
- Frontend: React 18, Vite, React Router, Recharts, Axios, Tailwind CSS
- Backend: Node.js, Express
- Database: MongoDB + Mongoose
- Authentication: JWT (7-day expiry) + bcrypt password hashing

## Requirements
- Node.js 18.18+ (Node 20 LTS recommended)
- npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## Run the application

Open **two terminals** in the `expense-tracker-frontend` project folder.

### 1. Start MongoDB
For a local MongoDB installation, start the MongoDB service. The default connection is:
`mongodb://127.0.0.1:27017/expenseflow`

Alternatively, create a MongoDB Atlas database and use its connection string in `backend/.env`.

### 2. Configure and start the backend
```bash
cd backend
npm install
```
Copy `backend/.env.example` to `backend/.env` and set a long random `JWT_SECRET`. Example:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/expenseflow
JWT_SECRET=put_a_long_random_secret_here
CLIENT_URL=http://localhost:5173
```
Then run:
```bash
npm run dev
```
The API runs at `http://localhost:5000`. Check `http://localhost:5000/api/health`.

### 3. Configure and start the frontend
In a second terminal, return to the project root (`expense-tracker-frontend`):
```bash
npm install
```
Copy `.env.example` to `.env` (the default API URL is already correct), then:
```bash
npm run dev
```
Open the Vite URL, normally `http://localhost:5173`.

## First use
1. Open the app and choose **Create one**.
2. Register with your name, email, and a password of at least 8 characters.
3. Add income and expense transactions.
4. Review the dashboard, reports, categories and monthly budget.
5. Log out and log in again to verify the records persist in MongoDB.

Each account only accesses its own transactions, categories and budgets.

## Project structure
```text
expense-tracker-frontend/
├── backend/
│   ├── src/
│   │   ├── middleware/auth.js
│   │   ├── models/           User, Transaction, Category, Budget
│   │   ├── routes/           auth, transactions, categories, budgets, reports
│   │   └── server.js
│   ├── .env.example
│   └── package.json
├── src/
│   ├── components/
│   ├── context/              AuthContext and ExpenseContext
│   ├── layouts/
│   ├── pages/
│   ├── services/             Axios API service modules
│   └── utils/
├── .env.example
└── package.json
```

## API endpoints

All endpoints are prefixed with `/api`. Except for registration, login and health, endpoints require:
`Authorization: Bearer <JWT>`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | API health check |
| POST | `/auth/register` | Create account |
| POST | `/auth/login` | Sign in |
| GET | `/auth/me` | Get current user |
| PATCH | `/auth/me` | Update name/currency |
| GET, POST | `/transactions` | List/create transactions |
| PUT, DELETE | `/transactions/:id` | Update/delete transaction |
| DELETE | `/transactions` | Delete all own transactions |
| GET, POST | `/categories` | List/create categories |
| DELETE | `/categories/:id` | Delete category |
| GET, POST | `/budgets` | List or upsert monthly budget |
| DELETE | `/budgets/:id` | Delete budget |
| GET | `/reports` | Aggregated income, expenses and category/month summaries |

## Data model overview
- **User**: name, unique email, bcrypt password hash, currency
- **Transaction**: owner, title, amount, type, category, date, payment method, description
- **Category**: owner, name, type
- **Budget**: owner, month (`YYYY-MM`), amount

## Important notes
- Never commit `.env` files or share your JWT secret.
- The JWT is stored in browser localStorage in this learning project. For production, consider secure, httpOnly cookies, CSRF protections, stronger validation, audit logging, and deployment-specific CORS settings.
- Receipt selection in the current UI is still a visual placeholder; file upload/storage is not connected.
- Password reset and password change are not implemented yet.
- The dashboard and reports calculate their summaries from the authenticated user's transaction records.
