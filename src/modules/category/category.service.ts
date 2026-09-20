import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';
import { categoryRepository } from './category.repository';
import { createCategorySchema, updateCategorySchema } from './category.schema';

export const categoryService = {
    async create(data: createCategorySchema) {
        const existing = await categoryRepository.findByname(data.name);
        if (existing) throw new ConflictError('Já existe uma categoria com esse nome');
        return categoryRepository.create(data);
    },

    findAll() {
        return categoryRepository.findAll();
    },

    async findByID(id: string) {
        const category = await categoryRepository.findByID(id);

        if (!category) {
            throw new NotFoundError('ID não encontrado');
        }

        return category;
    },

    async updateCategory(id: string, data: updateCategorySchema) {
        if (data.name) {
            const category = await categoryRepository.findByname(data.name);
            if (category && category.id !== id) {
                throw new ConflictError('Já existe uma categoria com esse nome');
            }
        }
        return categoryRepository.updateCategory(id, data);
    },
};
