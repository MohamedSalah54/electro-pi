# 📌 Project & Task Management API

A RESTful API for managing projects and tasks with authentication and role-based authorization. Users can register, login, and manage projects and tasks securely using JWT authentication.

Built using Node.js, Express.js, TypeScript, and MongoDB with a layered architecture for scalability and clean code structure.

# 🚀 Getting Started

## Clone repository
git clone https://github.com/MohamedSalah54/electro-pi.git
cd electro-pi

## Install dependencies
npm install

## Create .env file

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## Run project

Development:
npm run dev

Production:
npm run build
npm start


# 🔐 Authentication

All protected routes require:

Authorization: Bearer <token>

# 📌 API Endpoints

## Auth
POST /auth/register
POST /auth/login

## Projects
POST /projects
GET /projects
GET /projects/:id
PUT /projects/:id
DELETE /projects/:id

## Tasks
POST /tasks
GET /tasks/project/:projectId
GET /tasks/:id
PUT /tasks/:id
DELETE /tasks/:id

# ⭐ Author

Built with Node.js + TypeScript + MongoDB


# 🚀 Features

## 🔐 Authentication & Authorization
- User registration (Name, Email, Password)
- User login with JWT token
- Password hashing using bcrypt
- Protected routes using JWT middleware
- Role-based access control (Admin / Member)

## 📁 Projects
- Create project (Title, Description, Status)
- Get all projects for authenticated user
- Get project by ID
- Update project
- Delete project
- Filter projects by status or priority & sorting & pagination

## ✅ Tasks
- Create task under project
- Get tasks for specific project
- Get task by ID
- Update task status (Pending / In Progress / Done)
- Delete task
- Filter tasks by status or priority & sorting & pagination

# 🧰 Tech Stack

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- bcrypt
- express-validator
- jest
- dotenv

# ⚙️ Project Structure

src
│
├── config
│   ├── db.ts
│   └── env.ts
│
├── modules
│   │
│   ├── auth
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.routes.ts
│   │   ├── auth.validation.ts
│   │   └── auth.types.ts
│   │
│   ├── users
│   │   ├── user.model.ts
│   │   └── user.types.ts
│   │
│   ├── projects
│   │   ├── project.model.ts
│   │   ├── project.controller.ts
│   │   ├── project.service.ts
│   │   ├── project.routes.ts
│   │   ├── project.validation.ts
│   │   └── project.types.ts
│   │
│   └── tasks
│       ├── task.model.ts
│       ├── task.controller.ts
│       ├── task.service.ts
│       ├── task.routes.ts
│       ├── task.validation.ts
│       └── task.types.ts
│
├── middlewares
│   ├── auth.middleware.ts
│   ├── error.middleware.ts
│   └── validate.middleware.ts
    └── role.middleware.ts
│
├── utils  
│   ├── jwt.ts
│   ├── hash.ts
│   └── sorting.ts
│   └── pagination.ts

├── test  
│   ├── auth.service.test.ts
│   ├── project.service.test.ts
│   └── task.service.test.ts
│   
│   
│

│
├── seeds
│
├── app.ts
└── server.ts

# 🌱 Database Seeding (Seed Data)

The project includes a seed system to initialize the database with sample data for development and testing.

- Create default admin user
- Generate sample projects
- Generate sample tasks linked to projects

Run seed:

npm run seed

# 🧪 Testing (Unit & Integration)

The project includes automated testing for core modules.

## User Tests
- registration
- login
- password hashing
- JWT generation

## Project Tests
- create project
- get projects
- update project
- delete project
- authorization checks

## Task Tests
- create task
- get tasks by project
- update task status
- delete task
- filtering logic

Testing tools:
- Jest
- Supertest
- MongoDB Memory Server

Run tests:

npm test


# 🐳 Docker Support

The project supports Docker for easy deployment.

- Node.js API container
- MongoDB container
- Environment-based configuration
- Development hot reload
- Production build optimization

Run with Docker:

docker-compose build
docker-compose up
docker-compose down

For Testing API postman Link:
https://go.postman.co/workspace/3b281700-e678-4d55-8b20-aede8075d196
