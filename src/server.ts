import { app } from './app';
import { config } from './config';

async function bootstrap() {
    app.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`);
    });
}

bootstrap().catch((err) => {
    console.error('Fatal error during startup:', err);
    process.exit(1);
});