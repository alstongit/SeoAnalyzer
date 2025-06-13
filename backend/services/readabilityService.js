const textStatistics = require('text-statistics');

/**
 * Calculates the Flesch-Kincaid Grade Level for a given block of text.
 * @param {string} text - The text to be analyzed.
 * @returns {number} The calculated grade level score.
 */
const getFleschKincaidGradeLevel = (text) => {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return 0; // Return 0 if text is invalid or empty
  }
  const stats = textStatistics(text);
  return stats.fleschKincaidReadingEase();
};

module.exports = {
  getFleschKincaidGradeLevel,
};