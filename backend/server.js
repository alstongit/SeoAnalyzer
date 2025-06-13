// 1. Import Dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// NEW: Import the routes
const analysisRoutes = require('./routes/analysisRoutes');

// 2. Initialize Express App
const app = express();
const PORT = process.env.PORT || 5001;

// 3. Apply Middleware
app.use(cors());
app.use(express.json());

// 4. Define a Basic "Health Check" Route (Keep this for basic testing)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running and healthy!' });
});

// NEW: Use the analysis routes for any requests to /api
app.use('/api', analysisRoutes);

// 5. Start the Server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});