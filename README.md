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
└── app.ts
```


## Current Features
- Health check endpoint
  - GET /health/ping
  - Response: { success: true, message: 'pong!' }
- Environment variables management
  - Using Zod for validation
  - Typesafe environment variables
- Controllers, services, routes, middleware, models, dtos, and config
  - Well-structured codebase


## How to run

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production
npm run start
```


