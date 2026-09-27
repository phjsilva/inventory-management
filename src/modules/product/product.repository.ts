import { prisma } from '../../config/prisma';
import { createSchema } from './product.schema';

export const productRepository = {
    findByID(id: string) {
        return prisma.product.findUnique({
            where: { id },
        });
    },

    findBySku(sku: string) {
        return prisma.product.findUnique({
            where: { sku },
        });
    },

    findByCategoryId(id: string) {
        return prisma.category.findUnique({
            where: { id },
        });
    },

    create(data: createSchema) {
        return prisma.product.create({
            data: data,
        });
    },
};
