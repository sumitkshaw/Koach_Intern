import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';  
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();


app.use(cors()); 
app.use(express.json()); 

app.use('/api/users', userRoutes); 
setupSwagger(app);

export default app;