import { Request, Response, NextFunction } from 'express';
import { categoryService } from './category.service';

export const categoryController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const category = await categoryService.create(req.body);
            res.status(201).json(category);
        } catch (error) {
            next(error);
        }
    },
};
