# Expense Tracker

A full-stack expense management application that helps users track income, expenses, and overall financial health. The project includes a React frontend for the user interface and a Node.js/Express backend with MongoDB for persistence.

## Overview

This repository contains a complete personal finance dashboard with:

- User authentication and profile management
- Income tracking and category-based reporting
- Expense tracking with categories and icons
- Dashboard summaries and recent transaction views
- Excel export for income and expense data
- Profile image upload support
- JWT-based protected routes

## Tech Stack

Frontend
- React 19
- Vite
- React Router
- Tailwind CSS
- Recharts
- Axios
- React Hot Toast

Backend
- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- Multer for image uploads
- XLSX for spreadsheet export

## Repository Structure

```text
Expense-Tracker/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   └── testMongoConnection.js
├── frontend/
│   └── expense-tracker/
│       ├── public/
│       ├── src/
│       ├── package.json
│       ├── vite.config.js
│       ├── index.html
│       └── eslint.config.js
├── README.md
└── .vscode/
```

## Features

### Authentication
- Register a new user account
- Log in with email and password
- Store JWT token in local storage
- Fetch authenticated user profile
- Protect private routes using middleware

### Income Management
- Add income entries with source, amount, date, and icon
- View all income records
- Delete income records
- Download income data as an Excel file

### Expense Management
- Add expense entries with category, amount, date, and icon
- View all expense records
- Delete expense records
- Download expense data as an Excel file

### Dashboard
- View total balance
- View total income
- View total expense
- Review recent transactions
- See last 30/60 day trends and summaries
- Navigate quickly to income and expense screens

### Media Uploads
- Upload a profile image during registration
- Store uploaded images under the backend uploads directory
- Expose uploads via the `/uploads` static route

## Prerequisites

Before running the project, make sure you have:

- Node.js (18 or newer recommended)
- npm or yarn
- MongoDB instance running locally or remotely
- A valid MongoDB connection URI

## Environment Variables

Create a `.env` file in the `backend/` directory.

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/expense-tracker
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_super_secret_key
```

Notes:
- `MONGO_URI` is required for MongoDB connection
- `CLIENT_URL` is used for CORS configuration
- `JWT_SECRET` should be a strong secret for token signing

## API Endpoints

The backend exposes REST endpoints under `/api/v1`.

### Authentication
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/getUser`
- `POST /api/v1/auth/upload-image`

### Income
- `POST /api/v1/income/add`
- `GET /api/v1/income/get`
- `GET /api/v1/income/downloadexcel`
- `DELETE /api/v1/income/:id`

### Expense
- `POST /api/v1/expense/add`
- `GET /api/v1/expense/get`
- `GET /api/v1/expense/downloadexcel`
- `DELETE /api/v1/expense/:id`

### Dashboard
- `GET /api/v1/dashboard/get-data`

## Backend Architecture

The backend is organized into the following main layers:

- `config/` — database connection setup
- `controllers/` — request handlers and business logic
- `middleware/` — auth protection, uploads, and request handling
- `models/` — Mongoose schemas for User, Income, and Expense
- `routes/` — API route definitions
- `uploads/` — uploaded media files

## Frontend Architecture

The frontend uses a component-based structure under `src/`:

- `pages/` — login, signup, dashboard, income, and expense pages
- `components/` — reusable UI elements and dashboard widgets
- `context/` — global user state
- `hooks/` — custom hooks for auth logic
- `utils/` — API config, formatting helpers, and upload utilities

## Usage Flow

1. Create an account or log in
2. Navigate to the dashboard
3. Add income or expense entries
4. Review totals and trend information
5. Download reports in Excel format when needed

## Notes

- The project stores uploaded profile images in the backend `uploads` folder and exposes them publicly through `/uploads`.
- The frontend uses protected routes and checks for an auth token before redirecting to the dashboard.
- MongoDB must be reachable from the backend environment.

## Common Troubleshooting

### MongoDB connection issues
- Check that your MongoDB server is running
- Verify the `MONGO_URI` in `backend/.env`
- Confirm the database name and host are correct

### Frontend cannot connect to backend
- Make sure the backend is running on port 5000
- Verify the frontend API base URL in the axios configuration
- Ensure `CLIENT_URL` matches the frontend origin

### JWT errors
- Confirm `JWT_SECRET` is defined in the backend `.env`
- Ensure the token is being sent in the `Authorization` header

## Project Status

This is a functional personal finance tracking application with a dashboard, authentication, CRUD operations for income/expense entries, and report export support.
