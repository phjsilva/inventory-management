import { ConflictError } from '../../errors/ConflictError';
import { categoryRepository } from './category.repository';
import { createCategorySchema } from './category.schema';

export const categoryService = {
    async create(data: createCategorySchema) {
        const existing = await categoryRepository.findByname(data.name);
        if (existing) throw new ConflictError('Já existe uma categoria com esse nome');
        return categoryRepository.create(data);
    },
};
