import { prisma } from '../../config/prisma';
import { createCategorySchema } from './category.schema';

export const categoryRepository = {
    create(data: createCategorySchema) {
        return prisma.category.create({ data });
    },

    findByname(name: string) {
        return prisma.category.findUnique({ where: { name } });
    },
    findAll() {
        return prisma.category.findMany({
            select: {
                name: true,
                description: true,
            },
        });
    },

    findByID(id: string) {
        return prisma.category.findUnique({
            select: {
                name: true,
                description: true,
            },
            where: { id },
        });
    },
};
