import { prisma } from '../../config/prisma';
import { CreateProductInput } from './product.schema';

export const productRepository = {
    findById(id: string) {
        return prisma.product.findUnique({ where: { id } });
    },

    findBySku(sku: string) {
        return prisma.product.findUnique({ where: { sku } });
    },

    create(data: CreateProductInput) {
        return prisma.product.create({ data });
    },
};
