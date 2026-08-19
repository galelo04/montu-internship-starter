import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.coerce.number().optional().default(3000),
    MONGODB_URI: z.url(),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string().default("24h"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.error('Invalid environment variables:', z.treeifyError(parsedEnv.error));
    process.exit(1);
}

export const config = {
    env: parsedEnv.data.NODE_ENV,
    port: parsedEnv.data.PORT,
    db: {
        url: parsedEnv.data.MONGODB_URI,
    },
    jwt: {
        secret: parsedEnv.data.JWT_SECRET,
        expiresIn: parsedEnv.data.JWT_EXPIRES_IN,
    }
} as const;