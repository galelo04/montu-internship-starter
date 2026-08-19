import { z } from 'zod';

export const RegisterBodySchema = z.object({
    name: z.string().min(2).nonempty(),
    email: z.email().nonempty(),
    password: z.string().min(8).nonempty(),
});

export interface RegisterResponseDTO {
    id: string;
    name: string;
    email: string;
    role: string;
}

export type RegisterRequestDTO = z.infer<typeof RegisterBodySchema>;