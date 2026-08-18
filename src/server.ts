import http from 'http';
import { app } from './app';
import { config } from './config';
import { connectDB, disconnectDB } from './config/database';

const server = http.createServer(app);

async function bootstrap() {
    await connectDB();

    server.listen(config.port, () => {
        console.log(`Server listening on port ${config.port}`);
    });

    const shutdown = async () => {
        console.log('Initiating shutdown...');

        server.close(async (error) => {
            if (error) {
                console.error('Error during server close:', error);
                process.exit(1);
            }

            await disconnectDB();

            console.log('Server shut down cleanly');
            process.exit(0);
        });

        setTimeout(() => {
            console.error('Forcing shutdown after timeout');
            process.exit(1);
        }, 5000);
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);
}

bootstrap().catch((err) => {
    console.error('Fatal error during startup:', err);
    process.exit(1);
});