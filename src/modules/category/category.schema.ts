import { z } from 'zod';

export const createSchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string().optional(),
});

export const paramsIDSchema = z.object({
    id: z.string().uuid(),
});

export const updateSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
});

export type createSchema = z.infer<typeof createSchema>;
export type updateSchema = z.infer<typeof updateSchema>;
