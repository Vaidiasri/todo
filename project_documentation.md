# Full-Stack Todo Management Application Documentation

## 1. Project Overview

**Title:** Full-Stack Todo Management Application
**Objective:** To build a secure, role-based Todo application where users can manage their tasks and admins can manage users. The application enforces strict data isolation and role-based access control (RBAC).

## 2. Technology Stack

- **Frontend library:** React (TypeScript) + Vite
- **Styling:** Tailwind CSS
- **Backend Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)

## 3. Features Implemented

### ✅ User Features

- **Authentication:** Secure Signup and Login.
- **Profile Management:** View and update profile details (Name, Email, Password).
- **Soft Delete:** Users can delete their account. Data is retained but the user is marked as inactive and cannot log in.
- **Todo Management:**
  - Create new todos.
  - View own todos with pagination.
  - Update todo status (Pending/Completed).
  - Delete todos.
  - **Privacy:** Users can ONLY see and manage their own data.

### ✅ Admin Features

- **User Management:** View a list of all registered users.
- **Role Management:** Admin privilege to update user details or roles.
- **Delete Users:** Hard delete users permanently or manage their status.

## 4. Database Schema

### User Schema

| Field       | Type    | Description                           |
| :---------- | :------ | :------------------------------------ |
| `name`      | String  | User's full name.                     |
| `email`     | String  | Unique email address.                 |
| `password`  | String  | Hashed password (Bcrypt).             |
| `role`      | Enum    | 'USER' or 'ADMIN'. Default is 'USER'. |
| `isDeleted` | Boolean | Soft delete flag. Default is `false`. |

### Todo Schema

| Field         | Type     | Description                              |
| :------------ | :------- | :--------------------------------------- |
| `title`       | String   | Task title.                              |
| `description` | String   | Task details.                            |
| `status`      | Enum     | 'pending' or 'completed'.                |
| `user`        | ObjectId | Reference to the User who owns the todo. |
| `createdAt`   | Date     | Timestamp of creation.                   |

## 5. API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user.
- `POST /api/auth/login` - Authenticate user and return JWT.
- `GET /api/auth/me` - Get current logged-in user info.

### User Operations

- `GET /api/users/profile` - Get user profile.
- `PUT /api/users/profile` - Update user profile.
- `DELETE /api/users/profile` - Soft delete user account.

### Todo Operations

- `GET /api/todos?page=1&limit=10` - Get paginated todos.
- `POST /api/todos` - Create a new todo.
- `PUT /api/todos/:id` - Update a todo.
- `DELETE /api/todos/:id` - Delete a todo.

### Admin Operations

- `GET /api/admin/users` - Get all users.
- `PUT /api/admin/users/:id` - Update a specific user.
- `DELETE /api/admin/users/:id` - Delete a specific user.

## 6. Project Structure

```
task/
├── backend/                # Node.js + Express Backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route logic handlers
│   │   ├── middlewares/    # Auth, Role, & Error handling
│   │   ├── models/         # Mongoose schemas
│   │   └── routes/         # API Route definitions
│   └── index.js            # Server entry point
│
└── frontend/               # React + TypeScript Frontend
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── context/        # Global State (Auth)
    │   ├── hooks/          # Custom hooks (e.g., useTodos)
    │   ├── pages/          # Application pages (Dashboard, Login, etc.)
    │   └── services/       # API configuration
    └── App.tsx             # Routing configuration
```

## 7. Setup Instructions

1.  **Clone the repository.**
2.  **Backend Setup:**
    - `cd backend`
    - `npm install`
    - Create `.env` file with `MONGO_URI` and `JWT_SECRET`.
    - `npm start`
3.  **Frontend Setup:**
    - `cd frontend`
    - `npm install`
    - `npm run dev`
4.  **Access:** Open browser at local URL (usually `http://localhost:5173`).
