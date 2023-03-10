import { app as server } from './app';
import { connectDatabase } from './database/connection';

server.listen(3000, async () => {
    await connectDatabase();
    console.log('Server is running on http://localhost:3000/ 🚀');
});