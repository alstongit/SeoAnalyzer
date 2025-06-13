const express = require('express');
const router = express.Router();

// Import the controller functions
const { analyzeText, insertKeyword } = require('../controllers/analysisController');

// Define the POST route for text analysis
// When a POST request is made to '/analyze', the analyzeText function will be called.
router.post('/analyze', analyzeText);

// Define the POST route for keyword insertion
// When a POST request is made to '/insert-keyword', the insertKeyword function will be called.
router.post('/insert-keyword', insertKeyword);

// Export the router so it can be used in server.js
module.exports = router;