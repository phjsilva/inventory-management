import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string().optional(),
});

export type createCategorySchema = z.infer<typeof createCategorySchema>;
