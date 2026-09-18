import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string().optional(),
});

export const findIDSchema = z.object({
    id: z.string().uuid(),
});

export type createCategorySchema = z.infer<typeof createCategorySchema>;
