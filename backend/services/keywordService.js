// services/keywordService.js
const axios = require('axios');

/**
 * Fetches SEO keyword suggestions from the RapidAPI service.
 * @param {string} seedKeyword - The primary keyword to research.
 * @returns {Promise<Array<string>>} A promise that resolves to an array of keyword text strings.
 */
const getSeoKeywords = async (seedKeyword) => {
  const apiKey = process.env.RAPIDAPI_SEO_KEY;

  if (!apiKey) {
    console.error('RapidAPI SEO Key not found in environment variables.');
    return [];
  }
  
  const options = {
    method: 'GET',
    url: 'https://seo-keyword-research.p.rapidapi.com/keynew.php',
    params: {
      keyword: seedKeyword,
      country: 'us' // Using 'us' as a default, can be changed if needed
    },
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'seo-keyword-research.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    // The API returns an array of objects, we only need the 'text' property from each
    if (response.data && Array.isArray(response.data)) {
      return response.data.map(item => item.text);
    }
    return [];
  } catch (error) {
    console.error('Error fetching data from SEO Keyword API:', error.response?.data || error.message);
    return []; // Return empty array on failure to prevent app crash
  }
};

module.exports = {
  getSeoKeywords,
};