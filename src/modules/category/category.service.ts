import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';
import { categoryRepository } from './category.repository';
import { CreateCategoryInput, UpdateCategoryInput } from './category.schema';

export const categoryService = {
    async create(data: CreateCategoryInput) {
        const existing = await categoryRepository.findByName(data.name);
        if (existing) throw new ConflictError('Já existe uma categoria com esse nome');
        return categoryRepository.create(data);
    },

    async list() {
        const categories = await categoryRepository.findAll();

        return categories.map((category) => ({
            id: category.id,
            name: category.name,
            description: category.description,
            productCount: category._count.products,
        }));
    },

    async getById(id: string) {
        const category = await categoryRepository.findById(id);

        if (!category) {
            throw new NotFoundError('Categoria não encontrada');
        }

        return {
            id: category.id,
            name: category.name,
            description: category.description,
            productCount: category._count.products,
        };
    },

    async update(id: string, data: UpdateCategoryInput) {
        if (data.name) {
            const category = await categoryRepository.findByName(data.name);
            if (category && category.id !== id) {
                throw new ConflictError('Já existe uma categoria com esse nome');
            }
        }
        return categoryRepository.update(id, data);
    },

    async delete(id: string) {
        const category = await categoryRepository.findById(id);
        if (!category) {
            throw new NotFoundError('Categoria não encontrada');
        }
        const productCount = await categoryRepository.countProducts(id);
        if (productCount > 0) {
            throw new ConflictError(
                'Não é possível excluir a categoria porque existem produtos associados',
            );
        }

        return categoryRepository.delete(id);
    },
};
