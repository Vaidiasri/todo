# Full-Stack Todo Application

This is a full-stack Todo Management Application built with the MERN stack (MongoDB, Express, React, Node.js).

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT Typescript(Planned but used JS for speed/simplicity as per prompt "Node js backend").
- **Frontend**: React, TypeScript, Vite, Tailwind CSS.

## Features

- **Authentication**: Signup, Login, Logout (JWT).
- **Role-Based Access Control**: USER and ADMIN roles.
- **User Features**: Manage Profile, Soft Delete Account, CRUD Todos (Paginated).
- **Admin Features**: View all users, Update user roles, Delete users (Soft/Hard).

## Setup Instructions

### Prerequisites

- Node.js installed.
- MongoDB installed and running locally on port 27017.

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - The `.env` file is already created with default values.
   - `MONGO_URI=mongodb://localhost:27017/todo_app`
   - `JWT_SECRET=secret_key_change_me`
4. Start the server:
   ```bash
   npm start
   # or for dev with nodemon
   npx nodemon index.js
   ```
   Server runs on http://localhost:5000.

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   App runs on http://localhost:5173.

## Project Structure

```
/backend
  /src
    /config       # DB Setup
    /controllers  # Route Logic
    /middlewares  # Auth/Role Middleware
    /models       # Mongoose Schemas
    /routes       # API Routes
  index.js        # Entry Point

/frontend
  /src
    /components   # Shared UI
    /context      # Auth State
    /hooks        # Custom Hooks
    /pages        # App Pages
    /services     # API Client
  App.tsx         # Routing
```

## API Endpoints

- **Auth**: `/api/auth/signup`, `/api/auth/login`, `/api/auth/me`
- **User**: `/api/users/profile` (GET, PUT, DELETE)
- **Todo**: `/api/todos` (GET, POST), `/api/todos/:id` (PUT, DELETE)
- **Admin**: `/api/admin/users` (GET), `/api/admin/users/:id` (PUT, DELETE)
