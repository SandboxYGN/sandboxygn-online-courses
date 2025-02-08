const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const courseRoutes = require('./routes/courseRoutes');
require('dotenv').config();

// Hello 
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/courses', courseRoutes);

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

