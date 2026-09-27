import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

type RequestPart = 'body' | 'params' | 'query';

export function validate(schema: ZodType, origem: RequestPart = 'body') {
    return (req: Request, res: Response, next: NextFunction): void => {
        const result = schema.safeParse(req[origem]);

        if (!result.success) {
            res.status(400).json({
                message: 'Dados inválidos',
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }

        req[origem] = result.data;

        next();
    };
}
