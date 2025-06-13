// services/similarityService.js
const axios = require('axios');

/**
 * Calculates the semantic similarity between two texts using API-Ninjas.
 * @param {string} text1 - The first text.
 * @param {string} text2 - The second text.
 * @returns {Promise<number>} A promise that resolves to a similarity score (0 to 1), or 0 on failure.
 */
const getSimilarityScore = async (text1, text2) => {
  const apiKey = process.env.API_NINJAS_KEY;
  if (!apiKey) {
    console.error('API-Ninjas key not found.');
    return 0;
  }

  try {
    const response = await axios.post(
      'https://api.api-ninjas.com/v1/textsimilarity',
      { text_1: text1, text_2: text2 },
      { headers: { 'X-Api-Key': apiKey } }
    );
    return response.data.similarity || 0;
  } catch (error) {
    console.error('Error calling API-Ninjas Similarity API:', error.response?.data || error.message);
    return 0;
  }
};

module.exports = { getSimilarityScore };