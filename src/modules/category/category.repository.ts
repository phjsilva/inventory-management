import { prisma } from '../../config/prisma';
import { CreateCategoryInput, UpdateCategoryInput } from './category.schema';

export const categoryRepository = {
    create(data: CreateCategoryInput) {
        return prisma.category.create({ data });
    },

    findByName(name: string) {
        return prisma.category.findUnique({ where: { name } });
    },

    findAll() {
        return prisma.category.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                _count: { select: { products: true } },
            },
        });
    },

    findById(id: string) {
        return prisma.category.findUnique({
            select: {
                id: true,
                name: true,
                description: true,
                _count: { select: { products: true } },
            },
            where: { id },
        });
    },

    update(id: string, data: UpdateCategoryInput) {
        return prisma.category.update({
            where: { id },
            data: { name: data.name, description: data.description },
            select: {
                name: true,
                description: true,
                _count: { select: { products: true } },
            },
        });
    },

    countProducts(id: string) {
        return prisma.product.count({ where: { categoryId: id } });
    },

    delete(id: string) {
        return prisma.category.delete({
            select: { id: true, name: true, description: true },
            where: { id },
        });
    },
};
