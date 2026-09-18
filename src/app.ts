import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { env } from 'process';
import { errorHandler } from './middleware/errorHandler';
import router from './routes';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));
app.use('/api/v1', router);

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

app.use(errorHandler);

export { app };
