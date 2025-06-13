// services/sentimentService.js
const axios = require('axios');

/**
 * Analyzes the sentiment of a given text using API-Ninjas.
 * @param {string} text - The text to be analyzed.
 * @returns {Promise<object>} A promise that resolves to the sentiment result object, or a default on failure.
 */
const getSentiment = async (text) => {
  const apiKey = process.env.API_NINJAS_KEY;
  if (!apiKey) {
    console.error('API-Ninjas key not found.');
    return { sentiment: 'NEUTRAL', score: 0 }; // Return a default object
  }

  try {
    const response = await axios.get('https://api.api-ninjas.com/v1/sentiment', {
      params: { text: text },
      headers: { 'X-Api-Key': apiKey },
    });
    // The API returns an object like { text, sentiment, score }. We'll return the whole thing.
    return response.data;
  } catch (error) {
    console.error('Error calling API-Ninjas Sentiment API:', error.response?.data || error.message);
    return { sentiment: 'NEUTRAL', score: 0 }; // Return a default object on error
  }
};

module.exports = { getSentiment };