import { CreateProductInput } from './product.schema';
import { productRepository } from './product.repository';
import { NotFoundError } from '../../errors/NotFoundError';
import { ConflictError } from '../../errors/ConflictError';
import { categoryRepository } from '../category/category.repository';

export const productService = {
    async create(data: CreateProductInput) {
        const category = await categoryRepository.findById(data.categoryId);
        if (!category) {
            throw new NotFoundError('Categoria não encontrada');
        }
        const existingSku = await productRepository.findBySku(data.sku);

        if (existingSku) {
            throw new ConflictError('Sku já existe ');
        }

        return productRepository.create(data);
    },
};
