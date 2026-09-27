import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string().optional(),
});

export const updateCategorySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
});

export const paramsIdSchema = z.object({
    id: z.string().uuid(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
