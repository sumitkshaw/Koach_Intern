import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';  // We'll create this in the next step

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());  // Allow CORS for all requests
app.use(express.json());  // Parse JSON bodies

// Routes
app.use('/api/users', userRoutes);  // We'll define these routes next

export default app;
