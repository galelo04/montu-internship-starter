import mongoose from 'mongoose';
import { config } from './index';

export async function connectDB(): Promise<void> {
    try {
        if (config.db.url === '') {
            throw new Error('MongoDB URI is not defined');
        }

        mongoose.connection.on('connected', () => {
            console.log('MongoDB connection established');
        });

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB connection lost. Attempting reconnection...');
        });

        await mongoose.connect(config.db.url);

        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
}

export async function disconnectDB(): Promise<void> {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed cleanly');
    } catch (error) {
        console.error('Error during MongoDB disconnection:', error);
    }
}