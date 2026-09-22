import { prisma } from '../../config/prisma';
import { createSchema, updateSchema } from './category.schema';

export const categoryRepository = {
    create(data: createSchema) {
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
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
        });
    },

    findByID(id: string) {
        return prisma.category.findUnique({
            select: {
                name: true,
                description: true,
                _count: {
                    select: {
                        products: true,
                    },
                },
            },
            where: { id },
        });
    },

    update(id: string, data: updateSchema) {
        return prisma.category.update({
            where: { id },
            data: {
                name: data.name,
                description: data.description,
            },
        });
    },

    countProductsByCategory(id: string) {
        return prisma.product.count({
            where: {
                categoryId: id,
            },
        });
    },

    deleteCategory(id: string) {
        return prisma.category.delete({
            where: { id },
        });
    },
};
