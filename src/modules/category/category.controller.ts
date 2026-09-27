import { Request, Response, NextFunction } from 'express';
import { categoryService } from './category.service';
import { CategoryParams } from './category.type';

export const categoryController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await categoryService.create(req.body);
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    },

    async list(_req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await categoryService.list();
            res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    },

    async getById(req: Request<CategoryParams>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const category = await categoryService.getById(id);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    },

    async update(req: Request<CategoryParams>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const category = await categoryService.update(id, req.body);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    },

    async delete(req: Request<CategoryParams>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await categoryService.delete(id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    },
};
