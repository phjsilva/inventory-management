import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(1, 'Nome obrigatório'),
    sku: z.string().min(1, 'sku é obrigatório'),
    price: z.number().positive('preço tem que ser maior que zero'),
    categoryId: z.string().uuid(),
    description: z.string().optional(),
    minStockLevel: z.number().nonnegative().default(0),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
