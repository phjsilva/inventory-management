import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

type RequestPart = 'body' | 'params' | 'query';

export function validate(schema: ZodType, origem: RequestPart = 'body') {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req[origem]);

        if (!result.success) {
            return res.status(400).json({
                message: 'Dados inválidos',
                errors: result.error.flatten().fieldErrors,
            });
        }

        req[origem] = result.data;

        next();
    };
}
