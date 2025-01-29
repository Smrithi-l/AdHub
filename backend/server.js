const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv'); // Make sure to add dotenv for environment variables

// Import Routes
const userRoutes = require('./routes/userRoutes');
const adRoutes = require('./routes/adRoutes');

// Initialize dotenv
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection setup
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/advertisement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

// Use the user and ad routes for handling login/register and ad creation
app.use('/api/users', userRoutes);
app.use('/api/ads', adRoutes); // Added adRoutes here

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
