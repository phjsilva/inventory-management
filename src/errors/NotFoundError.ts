import { AppError } from './AppError';

export class NotFoundError extends AppError {
    constructor(message = 'Recurso nâo encontrado') {
        super(message, 404);
    }
}
