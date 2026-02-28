require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,  // only needed if you're sending cookies
}));

// Parse incoming JSON request bodies
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ success: true, message: 'API is running' });
});

// Centralized error handling — must be registered last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
