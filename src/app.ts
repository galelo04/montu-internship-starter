import express, { Application } from 'express';
import healthRouter from './routes/health.routes';
import authRouter from './routes/auth.routes';
import { authenticateToken } from './middlewares/auth.middleware';
import { errorHandler } from './middlewares/error.middleware';

const app: Application = express();

app.use(express.json());
app.use('/health', healthRouter);
app.use('/auth', authRouter);

//test a protected route
app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});

app.use(errorHandler);

export { app };