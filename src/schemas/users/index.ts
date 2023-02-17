import { z } from 'zod';

export const userSchema = z.object({
    name: z.string().min(3).max(20),
    email: z.string().email().max(100),
    password: z.string().min(3).max(120),
    admin: z.boolean().optional(),
});

export const userUpdateSchema = z.object({
    name: z.string().min(3).max(20).optional(),
    email: z.string().email().max(100).optional(),
    password: z.string().min(3).max(120).optional(),
})

export const userRequestSchema = z.object({ id: z.number(), ...userSchema.shape, active: z.boolean() });

export const UserWithoutPwdSchema = userRequestSchema.omit({ password: true });
export const UserOnlyWithEmailSchema = userSchema.pick({ email: true });
export const allUsersSchema = z.array(UserWithoutPwdSchema)

export const loginSchema = userSchema.pick({ email: true, password: true });
