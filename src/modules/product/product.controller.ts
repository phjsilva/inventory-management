import { Request, Response, NextFunction } from 'express';
import { productService } from './product.service';

export const productController = {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const product = await productService.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            next(error);
        }
    },
};
