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

    async findAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const allCategory = await categoryService.findAll();
            res.status(200).json(allCategory);
        } catch (error) {
            next(error);
        }
    },

    async findByID(req: Request<CategoryParams>, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const category = await categoryService.findByID(id);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    },

    async upadate(req: Request<CategoryParams>, res: Response, next: NextFunction) {
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
            const category = await categoryService.delete(id);
            res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    },
};
