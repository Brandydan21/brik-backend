// server.js
import express from 'express';
import dotenv from 'dotenv';
import registerRoutes from './routes/index.js';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use('/user-images', express.static('user-images')); // serve image files

// mounts our routes
registerRoutes(app); 

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));