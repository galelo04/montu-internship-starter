import { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const validate = (schema: z.ZodSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = await schema.parseAsync(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ errors: error.issues });
                return;
            }
            next(error);
        }
    };
};