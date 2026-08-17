export class HealthService {
    public ping() {
        return {
            success: true,
            message: 'pong!',
        };
    }
}