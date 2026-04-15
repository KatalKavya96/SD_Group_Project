#  EV Charging System

A full-stack EV (Electric Vehicle) charging station management system for booking, managing, and monitoring EV charging stations.

---

##  Overview

The **EV Charging System** is a comprehensive, full-stack platform designed to streamline the management of electric vehicle charging infrastructure. It bridges the gap between station owners and EV users by providing a centralized dashboard for real-time station monitoring, slot booking, and secure payment processing.

The system is built with a scalable modular architecture, ensuring high availability and a seamless user experience for customers, station managers, and administrators alike.

---

## 🚀 Core Features

### 👤 User Personas & Management
- **Role-Based Access**: Specialized interfaces for Customers, Station Owners, Managers, and Superadmins.
- **Secure Auth**: JWT-based authentication with access and refresh token rotation.
- **Profile Tracking**: Management of user credentials, contact info, and verification documents.

### 🔋 Station & Machine Control
- **Dynamic Station Registration**: Owners can register new charging stations with location data (Geo-coordinates) and helpline details.
- **Machine Granularity**: Track individual charging machines, their types, licensing info, and hourly charging fees.
- **Operational Status**: Real-time tracking of station availability (Active, Maintenance, Closed).

### 📅 Booking & Schedules
- **Flexible Booking Modes**: Support for Pre-booking, Walk-in customers, and Internal Maintenance slots.
- **Status Lifecycle**: End-to-end tracking from Pending to In-progress, Completed, or Cancelled.
- **Conflict Prevention**: Intelligent slot management to prevent overbooking on specific machines.

### 💳 Payments & Notifications
- **Multi-Mode Payments**: Integrated tracking for UPI, Credit/Debit Cards, Net Banking, and Cash.
- **Automated Alerts**: Real-time notifications via Push, Email, or SMS for booking confirmations and system updates.

---

## 🏗️ Architecture Breakdown

The project follows a **Clean Architecture** pattern, separating concerns into distinct layers:

### Backend Structure
- **Core (Domain)**: Business entities and domain models (Machine, Booking, User).
- **Application**: Use-cases and business logic implementation.
- **Infrastructure**: Database clients (Prisma), external service integrations (Cloudinary).
- **Presentation**: REST Controllers, Express routes, and request validation middleware.

### Frontend Structure
- **Presentation Layer**: React components and pages styled with Tailwind CSS v4.
- **Domain Layer**: Client-side models and specialized business logic.
- **Application Layer**: State management and API interaction hooks.

---

## Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Frontend   | React 19 · TypeScript · Vite · Tailwind CSS v4 · Zod    |
| Backend    | Node.js · Express 5 · TypeScript · Prisma ORM           |
| Database   | MySQL                                                    |
| Auth       | JWT (access + refresh tokens) · bcrypt                   |
| Storage    | Cloudinary (document / image uploads)                    |
| Testing    | Vitest                                                   |

---

## Project Structure

```
SD_Group_Project/
├── backend/              # Express API server
│   ├── prisma/           #   Prisma schema & migrations
│   └── src/
│       ├── application/  #   Use-cases / business logic
│       ├── config/       #   Environment & app config
│       ├── core/         #   Domain models / interfaces
│       ├── infrastructure/ # DB clients, external services
│       ├── presentation/ #   Routes, controllers, middleware
│       ├── shared/       #   Shared utilities & response helpers
│       ├── app.ts        #   Express app setup
│       └── server.ts     #   Server entry point
├── frontend/             # React + Vite SPA
│   └── src/
├── tests/                # Test suites
├── docs/                 # Documentation
└── diagrams/             # UML & use-case diagrams
```

---
## 📚 Documentation

- Environment Configuration (dotenv setup & validation) → [Link to Env Config Doc](/docs/backend/env-config.md)
- Database Client (Prisma Singleton Pattern) → [Link to Database Client Doc](/docs/backend/database-client.md)
  
---

## Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- **MySQL** 8.x (local install or a managed instance)
- A **Cloudinary** account ([sign up free](https://cloudinary.com/users/register/free))

---

## Environment Variables

The backend requires a `.env` file at `backend/.env`.

### Required Variables

| Variable                | Description                                  | Example Value                                                      |
| ----------------------- | -------------------------------------------- | ------------------------------------------------------------------ |
| `DATABASE_URL`          | MySQL connection string used by Prisma       | `mysql://root:password@localhost:3306/ev_charging`                  |
| `JWT_SECRET`            | Secret key for signing JWT tokens            | `my-super-secret-jwt-key-change-me`                                |
| `ACCESS_TOKEN_EXPIRY`   | Lifespan of access tokens                    | `15m`                                                              |
| `REFRESH_TOKEN_EXPIRY`  | Lifespan of refresh tokens                   | `7d`                                                               |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name                   | `my-cloud`                                                         |
| `CLOUDINARY_API_KEY`    | Your Cloudinary API key                      | `123456789012345`                                                  |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret                   | `abcDEF_ghiJKL-123`                                               |

### Optional Variables

| Variable        | Description                          | Default Value            |
| --------------- | ------------------------------------ | ------------------------ |
| `PORT`          | Port the backend server listens on   | `8000`                   |
| `NODE_ENV`      | Runtime environment                  | `development`            |
| `FRONTEND_URL`  | Allowed CORS origin for the frontend | `http://localhost:5173`  |

### Example `.env` file

Create `backend/.env` and paste the following, replacing placeholder values with your own:

```env
# ── Server ──────────────────────────────────────
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# ── Database ────────────────────────────────────
DATABASE_URL="mysql://root:yourpassword@localhost:3306/ev_charging"

# ── JWT ─────────────────────────────────────────
JWT_SECRET="change-me-to-a-long-random-string"
ACCESS_TOKEN_EXPIRY="15m"
REFRESH_TOKEN_EXPIRY="7d"

# ── Cloudinary ──────────────────────────────────
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

> **Note:** The `.env` file is git-ignored. Never commit real secrets to the repository.

---

## Local Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd SD_Group_Project
```

### 2. Set up the database

Make sure MySQL is running, then create the database:

```sql
CREATE DATABASE ev_charging;
```

### 3. Set up the Backend

```bash
# Install dependencies
cd backend
npm install

# Create your .env file (see the Environment Variables section above)
cp .env.example .env   # or create manually

# Generate the Prisma client
npx prisma generate

# Run database migrations (push the schema to MySQL)
npx prisma db push

# Start the dev server
npm run dev
```

The backend will start at **http://localhost:8000** (or your custom `PORT`).
Verify it's working by visiting the health check endpoint:

```
GET http://localhost:8000/api/health
```

### 4. Set up the Frontend

```bash
# From the project root
cd frontend
npm install

# Start the Vite dev server
npm run dev
```

The frontend will start at **http://localhost:5173** by default.

---

## Available Scripts

### Backend (`backend/`)

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start dev server with hot reload   |
| `npm run build`   | Compile TypeScript to `dist/`      |
| `npm start`       | Run the production build           |
| `npm test`        | Run tests with Vitest              |
| `npm run test:watch` | Run tests in watch mode         |
| `npm run test:ui` | Open Vitest UI                     |
| `npm run type-check` | Type-check without emitting     |

### Frontend (`frontend/`)

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start Vite dev server              |
| `npm run build`   | Type-check & build for production  |
| `npm run lint`    | Run ESLint                         |
| `npm run preview` | Preview the production build       |

### Prisma (run from `backend/`)

| Command                  | Description                              |
| ------------------------ | ---------------------------------------- |
| `npx prisma generate`   | Regenerate the Prisma client             |
| `npx prisma db push`    | Push schema changes to the database      |
| `npx prisma studio`     | Open Prisma Studio (visual DB browser)   |
| `npx prisma migrate dev`| Create & apply a new migration           |

---

## Team Members

| Team Member            |
| ---------------------- |
| **Kavya Katal**        |
| **Ankit Kumar Pandey** |
| **Yashi Agrawal**      |
| **Kavya Mukhija**      |
| **Khushi Batra**       |
