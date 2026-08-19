import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ZodError } from 'zod';
import { config } from '../config';

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            error: {
                message: err.message,
            },
        });
        return;
    }

    if (err instanceof ZodError) {
        res.status(400).json({
            success: false,
            error: {
                message: 'Validation failed',
                details: err.issues.map((issue) => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                })),
            },
        });
        return;
    }
    console.error('FATAL UNEXPECTED ERROR:', err);

    res.status(500).json({
        success: false,
        error: {
            message: config.env === 'production' ? 'Internal server error' : err.message,
            ...(config.env === 'development' && { stack: err.stack }),
        },
    });
};