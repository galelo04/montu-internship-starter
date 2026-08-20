# Montu Internship Starter

## Project structure

```text
src/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
├── config/
├── dtos/
├── interfaces/
├── repositories/
├── utils/
└── app.ts
```


## Current Features
- Health check endpoint
  - GET /health/ping
  - Response: { success: true, message: 'pong!' }
- Authentication
  - POST /auth/register
  - POST /auth/login
  - JWT authentication middleware
  - Password hashing with bcrypt
- Notes management
  - POST /notes
  - PUT /notes/:noteId
  - DELETE /notes/:noteId
  - GET /notes/:noteId
  - GET /notes (search, status/priority filter, sorting)
- Environment variables management
  - Using Zod for validation
  - Typesafe environment variables
- Request validation middleware
  - DTO validation using Zod
- Controllers, services, routes, middleware, models, dtos, repositories and config
  - Well-structured codebase
  - Graceful shutdown




## How to run locally

```bash
# Create a .env file from .env.example
# Fill the .env file with your environment variables
cp .env.example .env

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production
npm run start
```


## Railway project

- [Deployed Railway project](https://montu-internship-starter-production.up.railway.app/)

## API Documentation

- Postman Collection: [docs/notes-system.postman_collection.json](docs/notes-system.postman_collection.json)

