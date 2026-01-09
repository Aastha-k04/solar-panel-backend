Solar Panel Installation System - Backend API

A production-ready RESTful API backend for a Solar Panel Installation Management System built with Node.js, Express.js, and MongoDB.

🚀 Tech Stack

Runtime: Node.js
Framework: Express.js
Database: MongoDB with Mongoose ODM
Module System: ES6 Modules (import/export)
Documentation: Swagger/OpenAPI 3.0
Security: Helmet, CORS
Logging: Morgan
Environment: dotenv

✅ Currently Implemented Features

Infrastructure
✅ Express server with ES6 module syntax
✅ MongoDB database connection with Mongoose
✅ Environment-based configuration management
✅ Graceful server startup and shutdown handling
✅ Centralized error handling middleware
✅ 404 Not Found handler
✅ Request/response logging (Morgan)
✅ Security headers (Helmet)
✅ CORS configuration
✅ Process signal handlers (SIGTERM, SIGINT)
✅ Unhandled rejection and exception handling

API Endpoints
✅ Health check endpoint (GET /api/health) with database status
✅ Root endpoint (GET /) with API information
✅ Swagger UI documentation (GET /api-docs)

Database Models
✅ User Model with:
Email validation and unique constraint
Role enforcement (ADMIN, CUSTOMER, TECHNICIAN)
Password field with select: false default
Soft delete support (isActive flag)
Automatic timestamps (createdAt, updatedAt)
Database indexes (email, role, compound)
Virtual properties (fullName)
Instance methods (isAdmin(), isCustomer(), isTechnician())
Static methods (findByEmail(), findActiveByRole(), countByRole())
Pre-save middleware hooks
JSON transform to exclude sensitive data

Testing
✅ Standalone model test scripts
✅ Email uniqueness validation tests
✅ Role enforcement validation tests
✅ Password exclusion verification tests

📁 Project Structure

solar-panel-backend/
├── src/
│ ├── config/
│ │ ├── database.js # MongoDB connection configuration
│ │ └── swagger.js # Swagger/OpenAPI documentation setup
│ ├── models/
│ │ └── User.js # User schema with validations
│ ├── constants/
│ │ └── roles.js # User role constants (ADMIN, CUSTOMER, TECHNICIAN)
│ └── app.js # Express app configuration and middleware
├── scripts/
│ ├── testUserModel.js # User model functionality tests
│ ├── testUniqueEmail.js # Email uniqueness constraint tests
│ ├── testRoleValidation.js # Role validation tests
│ └── testPasswordExclusion.js # Password security tests
├── .env # Environment variables (not tracked)
├── .env.example # Environment variables template
├── .gitignore # Git ignore rules
├── package.json # Dependencies and scripts
├── server.js # Application entry point
└── README.md # Project documentation

Folder Descriptions

Folder/File Purpose

src/config/ Configuration files for database, Swagger, and third-party services
src/models/ Mongoose schemas and data models
src/constants/ Application-wide constants and enums
scripts/ Standalone test and utility scripts
server.js Entry point - initializes database and starts Express server
src/app.js Express application setup with middleware and routes

⚙️ Environment Setup

1. Clone the Repository
   Bash

git clone <repository-url>
cd solar-panel-backend

2. Install Dependencies
   Bash

npm install

3. Configure Environment Variables
   Create a .env file in the root directory (use .env.example as template):

env

# Server Configuration

NODE_ENV=development
PORT=5000
API_VERSION=v1

# Application

APP_NAME=Solar Panel Installation System

# Database Configuration

MONGODB_URI=mongodb://localhost:27017/solar_panel_db
DB_NAME=solar_panel_db
For MongoDB Atlas (Cloud):

env

MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/solar_panel_db?retryWrites=true&w=majority 4. Ensure MongoDB is Running
Local MongoDB:

Bash

# macOS (Homebrew)

brew services start mongodb-community

# Ubuntu/Linux

sudo systemctl start mongod

# Windows

# Start MongoDB service from Services

MongoDB Atlas:

Ensure cluster is active
Whitelist your IP address
Use the connection string in .env

▶️ Running the Project

Development Mode (with auto-restart)
Bash

npm run dev

Production Mode
Bash

npm start

Expected Console Output

═══════════════════════════════════════════════════════
✅ MongoDB Connection Successful
📦 Database: solar_panel_db
🔗 Host: localhost
📡 Port: 27017
═══════════════════════════════════════════════════════
📡 Mongoose connected to MongoDB
═══════════════════════════════════════════════════════
🚀 Solar Panel Installation System is running
📡 Environment: development
🔗 URL: http://localhost:5000
✅ Health Check: http://localhost:5000/api/health
📚 API Docs: http://localhost:5000/api-docs
═══════════════════════════════════════════════════════

🧪 Running Model Tests
Test scripts are available in the scripts/ directory:

Bash

# Test User model functionality

npm run test:user

# Test email uniqueness constraint

npm run test:unique

# Test role validation

npm run test:roles

# Test password field exclusion

npm run test:password

🧪 API Testing
Swagger UI Documentation
Access interactive API documentation:

text

http://localhost:5000/api-docs

Features:

Complete API schema definitions
Bearer JWT authentication placeholder
User model schema (password excluded)
Try-it-out functionality for endpoints

Health Check Endpoint
Request:

http

GET http://localhost:5000/api/health
Response:

JSON

{
"success": true,
"message": "Server is running smoothly",
"data": {
"service": "Solar Panel Installation System",
"environment": "development",
"timestamp": "2024-01-20T10:30:00.000Z",
"uptime": 123.456,
"database": {
"status": "connected",
"name": "solar_panel_db",
"host": "localhost",
"port": 27017
}
}
}

Root Endpoint
Request:

http

GET http://localhost:5000/
Response:

JSON

{
"success": true,
"message": "Welcome to Solar Panel Installation System API",
"version": "v1",
"endpoints": {
"health": "/api/health"
}
}

🛡️ Code Quality & Standards

Architecture Principles
Clean Architecture: Separation of concerns with distinct layers
ES6 Modules: Modern import/export syntax throughout
Scalability: Modular structure for easy feature addition
Security: Helmet for HTTP headers, password exclusion, CORS configuration
Error Handling: Centralized error middleware with environment-aware responses
Database Design: Proper indexing, validation, and schema organization

Code Conventions
ES6+ syntax (async/await, arrow functions, destructuring)
Consistent error handling patterns
Descriptive variable and function names
Schema-level data validation
Environment-based configuration

📦 Available NPM Scripts

Script Command Description
start npm start Run server in production mode
dev npm run dev Run server in development mode with auto-restart
test:user npm run test:user Test User model CRUD operations
test:unique npm run test:unique Test email uniqueness constraint
test:roles npm run test:roles Test role validation logic
test:password npm run test:password Test password field exclusion

📌 Notes

This repository contains backend infrastructure only
Authentication and authorization logic not yet implemented
Business logic APIs (solar panels, orders, payments, installations) will be added incrementally
Password hashing is prepared but not implemented (ready for bcrypt integration)
JWT security scheme is documented in Swagger but not functional yet

📄 License
This project is licensed under the ISC License.

👤 Author
Solar Panel Installation System - Backend Team

🔗 API Base URL
Development: http://localhost:5000
Production: TBD

Status: 🟢 Active Development - Core Infrastructure Complete
