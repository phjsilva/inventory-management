import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { Prisma } from '../generated/prisma/client';
import { ZodError } from 'zod';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: { message: err.message } });
    }
    if (err instanceof ZodError) {
        return res
            .status(400)
            .json({ error: { message: 'Dados inválidos', details: err.flatten().fieldErrors } });
    }
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') {
            return res.status(404).json({ error: { message: 'Recurso não encontrado' } });
        }
        if (err.code === 'P2002') {
            return res.status(409).json({ error: { message: 'Registro duplicado' } });
        }
    }
    console.error(err);
    return res.status(500).json({ error: { message: 'Erro interno do servidor' } });
}
