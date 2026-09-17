import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { env } from 'process';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN }));

app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

export { app };
