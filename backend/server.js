const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const User = require('./models/User'); // Ensure this is correct

// Import the routes
const userRoutes = require('./routes/userRoutes'); // Add the correct path for userRoutes

const app = express();
const PORT = 5000;

// Middleware setup
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON data from requests

// MongoDB connection setup
mongoose
  .connect('mongodb://localhost:27017/advertisement', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Use the user routes for handling login and register
app.use('/api/users', userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
