import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email().max(100),
    password: z.string().min(3).max(120),
    admin: z.boolean(),
    active: z.boolean()
});

export const userRequestSchema = userSchema.extend({ id: z.number() });