const axios = require('axios');
/**
 * Analyzes text using the TextRazor API to extract relevant topics.
 * @param {string} text - The text to be analyzed.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of topic objects.
 * Each object has 'label' and 'score' properties. Returns an empty array on failure.
 */
const extractTopics = async (text) => {
  // Retrieve the API key from environment variables
  const apiKey = process.env.TEXTRAZOR_API_KEY;

  if (!apiKey) {
    console.error('TextRazor API key not found in environment variables.');
    // In a real app, you might throw an error or handle this more gracefully.
    return []; 
  }

  // TextRazor API endpoint
  const url = 'https://api.textrazor.com/';

  // Prepare the data for the POST request. URL encoding is required.
  const params = new URLSearchParams();
  params.append('text', text);
  params.append('extractors', 'topics'); // We are specifically asking for topics

  try {
    const response = await axios.post(url, params, {
      headers: {
        'x-textrazor-key': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // Check if the response was successful and contains topics
    if (response.data.ok && response.data.response.topics) {
      // We only care about the topic label and its relevance score
      const topics = response.data.response.topics.map(topic => ({
        label: topic.label,
        score: topic.relevanceScore,
      }));
      return topics;
    } else {
      console.log('TextRazor response was not OK or did not contain topics.');
      return [];
    }
  } catch (error) {
    // Log detailed error information from TextRazor if available
    if (error.response) {
      console.error('Error calling TextRazor API:', error.response.data);
    } else {
      console.error('Error calling TextRazor API:', error.message);
    }
    return []; // Return an empty array to prevent the app from crashing
  }
};

module.exports = {
  extractTopics,
};