import express, { Application } from 'express';
import healthRouter from './routes/health.routes';

const app: Application = express();

app.use(express.json());
app.use('/health', healthRouter);

export { app };