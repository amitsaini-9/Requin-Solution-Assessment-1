import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import protectedRoutes from './routes/protected';

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

const MONGODB_URI = process.env.MONGODB_URI as string;
const PORT = process.env.PORT || 3001;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});