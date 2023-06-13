import express from 'express';
import dotenv from 'dotenv';
import index from './routes/index';

const server = express();
dotenv.config();

server.use(express.json());

server.use('/api', index);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on ${PORT}`));