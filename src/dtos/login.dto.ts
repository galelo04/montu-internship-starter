import { z } from 'zod';

export const LoginBodySchema = z.object({
    email: z.email().nonempty(),
    password: z.string().nonempty(),
});

export interface LoginResponseDTO {
    accessToken: string;
    refreshToken: string;
}

export type LoginRequestDTO = z.infer<typeof LoginBodySchema>;