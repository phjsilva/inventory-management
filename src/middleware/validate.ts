import { ZodType } from 'zod';
import { Request, Response, NextFunction } from 'express';

type RequestPart = 'body' | 'params' | 'query';

export function validar(schema: ZodType, origem: RequestPart = 'body') {
    return (req: Request, res: Response, next: NextFunction) => {
        const resultado = schema.safeParse(req[origem]);

        if (!resultado.success) {
            return res.status(400).json({
                message: 'Dados inválidos',
                errors: resultado.error.flatten().fieldErrors,
            });
        }

        req[origem] = resultado.data;

        next();
    };
}
