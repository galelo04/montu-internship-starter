import express, { Application } from 'express';
import healthRouter from './routes/health.routes';
import authRouter from './routes/auth.routes';
import noteRouter from './routes/note.routes';
import { authenticateToken } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

app.use(express.json());
app.use('/health', healthRouter);
app.use('/auth', authRouter);
app.use('/notes', noteRouter);


app.use(errorHandler);

export { app };