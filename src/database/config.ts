import { client } from './connection';

export const connectDatabase = async (): Promise<void> => {
    await client.connect();
    console.log('Database connected!');
};