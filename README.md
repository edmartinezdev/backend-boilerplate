# Node.js Express MongoDB Backend Boilerplate

A boilerplate for backend development using **Node.js**, **Express**, and **MongoDB**, with Docker support for consistent environments and persistent data storage.

---

## Features

- **Pre-built CRUD APIs**: Start quickly with Create, Read, Update, and Delete operations.
- **MongoDB Integration**: Simplified database setup using Docker.
- **Dockerized Setup**: Fully containerized backend and database setup with data persistence.
- **Scalable Architecture**: Modular code structure for better maintainability.

---

## Prerequisites

- **Node.js** (v16+)
- **MongoDB** (Dockerized or Local)
- **Docker** (For containerized deployment)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/backend-boilerplate.git
cd backend
```

2. Install Dependencies
   bash
   npm install
3. MongoDB Credentials
   The MongoDB user, password, and database name are already defined in server.js:

javascript

const DB_USER = "issuesUser";
const DB_PASSWORD = "securePassword123";
const DB_NAME = "issues";

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@mongodb:27017/${DB_NAME}?authSource=issues`; 4. Start MongoDB and Backend (Dockerized)
Run the following command to start the MongoDB and backend containers:

bash

docker-compose up --build
The backend will be available at http://localhost:5000.

API Endpoints
Base URL: http://localhost:5000
GET /items
Retrieve all items.

POST /items
Create a new item.

Body:
json

{
"name": "Sample Item",
"description": "This is a sample item."
}
PUT /items/:id
Update an existing item by ID.

DELETE /items/:id
Delete an item by ID.

Folder Structure
perl

backend/
│
├── mongo-init/ # MongoDB initialization script
│ └── init-mongo.js # User and database setup for MongoDB
├── node_modules/ # Dependencies
├── .dockerignore # Docker ignore file
├── docker-compose.yml # Docker configuration for backend and MongoDB
├── Dockerfile # Backend container configuration
├── package.json # Node.js dependencies
├── package-lock.json # Dependency lock file
├── README.md # Documentation (this file)
└── server.js # Main backend server file
Docker Support
Build and start containers:
bash

docker-compose up --build
To stop containers:
bash

docker-compose down
MongoDB data will persist in the mongodb_data volume.
