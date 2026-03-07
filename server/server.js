require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const conversationRoutes = require('./routes/conversations');
const symptomRoutes = require('./routes/symptoms');
const reportRoutes = require('./routes/report');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Routes
app.use('/api/conversations', conversationRoutes);
app.use('/api/symptoms', symptomRoutes);
app.use('/api/report', reportRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Baymax Backend running on http://localhost:${PORT}`);
});
