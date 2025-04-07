const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors

const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api'); // Import the new API router

const app = express();

// --- Middleware Setup ---

// Enable All CORS Requests (for development/testing)
// For production, you might want to configure specific origins
app.use(cors());

// Middleware to parse JSON bodies (needed for POST, PUT, PATCH requests)
app.use(express.json());

// Middleware for parsing URL-encoded data (still needed for HTML forms)
app.use(express.urlencoded({ extended: false }));

// Middleware to serve static files (CSS, client-side JS)
app.use(express.static(path.join(__dirname, 'public')));

// --- Database Connection ---
const mongoDB = process.env.MONGODB_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log("Connected to MongoDB successfully!");
});

// --- Routes ---
app.use('/', indexRouter);         // Mount the HTML routes at the root
app.use('/api', apiRouter);       // Mount the API routes under the /api path

// --- View Engine Setup --- (Can stay here or move above routes)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// --- Error Handling ---

// Catch 404 and forward to error handler (This should come AFTER routes)
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Central Error Handler (MUST have 4 arguments)
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Determine status code
  const status = err.status || 500;
  res.status(status);

  // Respond differently for API requests vs HTML requests
  if (req.originalUrl.startsWith('/api/')) {
    // API request error
    res.json({
      error: {
        message: err.message || 'Internal Server Error',
        status: status
        // Optionally include stack trace in development
        // stack: req.app.get('env') === 'development' ? err.stack : undefined
      }
    });
  } else {
    // HTML request error - render the error page
    res.render('error');
  }
});

module.exports = app; // Export the app for use in server.js or other modules