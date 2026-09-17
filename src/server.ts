import { app } from './app';
import { env } from './config/env';

app.listen(env.PORT || 3000, () => {
    console.log(`Rodando em: http://localhost:${env.PORT}`);
});
