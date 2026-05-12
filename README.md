# MERN E-Commerce Application

A complete e-commerce web application built with the MERN stack:
- **MongoDB**
- **Express.js**
- **React.js**
- **Node.js**

## Project Structure

```
backend/
  config/db.js
  controllers/
  middleware/
  models/
  routes/
  server.js
  seed.js
  .env
  package.json

frontend/
  src/
    api/
    components/
    context/
    pages/
    App.jsx
    main.jsx
  vite.config.js
  package.json
  .env

README.md
DEPLOYMENT_GUIDE.md
```

## Features

- User authentication with **JWT**
- Role-based access: **user** and **admin**
- Product browsing with search, category filter, pricing, and pagination
- Protected checkout and profile routes
- Admin dashboard for product and order management
- Persistent cart using **localStorage**
- Toast notifications and responsive UI

## Setup

### Backend

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with values for:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `NODE_ENV`
4. Seed demo data:
   ```bash
   npm run seed
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with:
   - `VITE_API_URL`
4. Start the app:
   ```bash
   npm run dev
   ```

## Demo Accounts

- Admin: `admin@test.com` / `password123`
- User: `user@test.com` / `password123`

## Deployment

See `DEPLOYMENT_GUIDE.md` for deployment options and recommended configuration.
