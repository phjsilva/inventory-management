import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';
import { categoryRepository } from './category.repository';
import { createSchema, updateSchema } from './category.schema';

export const categoryService = {
    async create(data: createSchema) {
        const existing = await categoryRepository.findByname(data.name);
        if (existing) throw new ConflictError('Já existe uma categoria com esse nome');
        return categoryRepository.create(data);
    },

    async findAll() {
        const categories = await categoryRepository.findAll();

        return categories.map((category) => ({
            name: category.name,
            description: category.description,
            productCount: category._count.products,
        }));
    },

    async findByID(id: string) {
        const category = await categoryRepository.findByID(id);

        if (!category) {
            throw new NotFoundError('ID não encontrado');
        }

        return {
            name: category.name,
            description: category.description,
            productCount: category._count.products,
        };
    },

    async update(id: string, data: updateSchema) {
        if (data.name) {
            const category = await categoryRepository.findByname(data.name);
            if (category && category.id !== id) {
                throw new ConflictError('Já existe uma categoria com esse nome');
            }
        }
        return categoryRepository.update(id, data);
    },

    async delete(id: string) {
        const existing = await categoryRepository.findByID(id);
        if (!existing) {
            throw new NotFoundError('ID não encontrado');
        }
        const productCount = await categoryRepository.countProductsByCategory(id);
        if (productCount <= 0) {
            throw new ConflictError(
                'Não é possível excluir a categoria porque existem produtos associados',
            );
        }

        return categoryRepository.deleteCategory(id);
    },
};
