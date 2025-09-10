# AI Secure Authentication System

This project is a full-stack authentication system using React (frontend), Node.js/Express (backend), MongoDB (database), and bcryptjs for secure password hashing.

## Features
- User and admin signup with email, password, and role
- Secure password hashing
- Login with role-based welcome message
- MongoDB for user data storage
- RESTful API with Express
- React frontend with Axios for API requests

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB (local or Atlas)

### Backend Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in `backend`:
   ```
   MONGO_URI=mongodb://localhost:27017/AI-Authentication-DB
   ```
3. Start MongoDB (if local):
   ```bash
   brew services start mongodb-community
   ```
4. Start the backend server:
   ```bash
   npx nodemon server.js
   # or
   node server.js
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the React app:
   ```bash
   npm start
   ```

## API Endpoints
- `POST /api/signup` — Register a new user
- `POST /api/signin` — Login and receive a role-based message

## Folder Structure
```
AI-Secure-Authentication-System/
├── backend/
│   ├── server.js
│   ├── User.js
│   ├── .env
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── Signup.js
│   │   ├── SignIn.js
│   │   └── App.js
│   └── ...
```

## Notes
- Do not commit `node_modules` or `.env` files (see `.gitignore`).
- All code is commented for clarity.

## License
MIT
