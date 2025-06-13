// services/paraphraseService.js
const axios = require('axios');

/**
 * Paraphrases a given sentence using the Quillbot Alternative API.
 * @param {string} sentence - The sentence to paraphrase.
 * @returns {Promise<string>} A promise that resolves to the paraphrased sentence, or the original on failure.
 */
const paraphraseSentence = async (sentence) => {
  const apiKey = process.env.QUILLBOT_ALT_API_KEY;
  if (!apiKey) {
    console.error('Quillbot Alternative API key not found.');
    return sentence;
  }

  const options = {
    method: 'POST',
    url: 'https://quillbot-alternative-advanced-paraphrasing.p.rapidapi.com/article/paraphrase/',
    headers: {
      'x-rapidapi-key': apiKey,
      'x-rapidapi-host': 'quillbot-alternative-advanced-paraphrasing.p.rapidapi.com',
      'Content-Type': 'application/json'
    },
    data: {
      text: sentence,
      language: 'English',
      // We'll use 'standard' mode for a balanced and natural rewrite.
      mode: 'standard'
    }
  };

  try {
    const response = await axios.request(options);
    
    // The key for the rewritten text is 'rewritten_text'
    return response.data.rewritten_text || sentence;

  } catch (error) {
    console.error('Error calling Quillbot Alternative API:', error.response?.data || error.message);
    return sentence; // Fallback to the original sentence on error
  }
};

module.exports = { paraphraseSentence };