import { ConflictError } from '../../errors/ConflictError';
import { NotFoundError } from '../../errors/NotFoundError';
import { categoryRepository } from './category.repository';
import { createCategorySchema, updateCategory, updateCategorySchema } from './category.schema';

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


    async updateCategory(data:updateCategorySchema){
        const existingId = await categoryRepository.findByID(data.id)
        if (!existingId) throw new NotFoundError("ID não encontrado")
        /*const existingName = await categoryRepository.findByname(data.name)
        if(existingName) throw new ConflictError("Já existe uma categoria com esse nome")
        */
    }
};
