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
- Environment variables management
  - Using Zod for validation
  - Typesafe environment variables
- Controllers, services, routes, middleware, models, dtos, repositories and config
  - Well-structured codebase
  - graceful shutdown




## How to run

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


