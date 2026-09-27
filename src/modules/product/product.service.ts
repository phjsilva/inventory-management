import { createSchema } from './product.schema';
import { productRepository } from './product.repository';
import { NotFoundError } from '../../errors/NotFoundError';
import { ConflictError } from '../../errors/ConflictError';

export const productService = {
    async create(data: createSchema) {
        const existingCategoryId = await productRepository.findByCategoryId(data.categoryId);
        if (!existingCategoryId) {
            throw new NotFoundError('Categoria não encontrada');
        }
        const existingSku = await productRepository.findBySku(data.sku);

        if (existingSku) {
            throw new ConflictError('Sku já existe ');
        }

        return productRepository.create(data);
    },
};
