import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import donorRoutes from './routes/donors.js';
import ngoRoutes from './routes/ngos.js';
import foodRoutes from './routes/foods.js';
import eventRoutes from './routes/events.js';
import historyRoutes from './routes/history.js';
import statsRoutes from './routes/stats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware - Updated CORS Configuration
app.use(cors({
  origin: [
    'https://foodserve-frontend.onrender.com',  // Production frontend
    'http://localhost:5173',                     // Local Vite dev server
    'http://localhost:3000'                      // Alternative local port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/donors', donorRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/stats', statsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
