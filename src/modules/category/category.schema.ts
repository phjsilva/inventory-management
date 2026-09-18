import { z } from 'zod';

export const createCategorySchema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    description: z.string().optional(),
});

export const findIDSchema = z.object({
    id: z.string().uuid(),
});


export const updateSchema = z.object({
    id: z.string().uuid().min(1, "ID é obrigatório"),
    name: z.string().optional(),
    description: z.string().optional()
})

export type createCategorySchema = z.infer<typeof createCategorySchema>;
export type updateCategorySchema = z.infer<typeof updateSchema>
