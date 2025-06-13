// 1. IMPORT ALL REQUIRED SERVICES
const readabilityService = require('../services/readabilityService');
const textRazorService = require('../services/textRazorService');
const keywordService = require('../services/keywordService');
const { getSimilarityScore } = require('../services/similarityService');
const { paraphraseSentence } = require('../services/paraphraseService');
const { getSentiment } = require('../services/sentimentService');

// The main function for the /analyze endpoint
const analyzeText = async (req, res) => {
  try {
    // 2. GET AND VALIDATE INPUT (No change here)
    const { text } = req.body;
    if (!text || typeof text !== 'string' || text.trim().length < 50) {
      return res.status(400).json({
        error: 'Please provide a block of text with at least 50 characters.',
      });
    }

    // 3. PERFORM INITIAL ANALYSIS IN PARALLEL (No change here)
    const [readabilityScore, topicsFromTextRazor, sentimentResult] = await Promise.all([
      readabilityService.getFleschKincaidGradeLevel(text),
      textRazorService.extractTopics(text),
      getSentiment(text), // Add the new call
    ]);

    const wordCount = text.trim().split(/\s+/).length;

    // 4. "SEED" - PROCESS TEXTRAZOR RESULTS
    // --- CHANGE: We now only need the SINGLE TOP topic ---
    const topTopic = topicsFromTextRazor
      .sort((a, b) => b.score - a.score)[0]?.label;

    if (!topTopic) {
      return res.status(200).json({
        message: "Analysis complete, but no main topics were identified to generate suggestions.",
        wordCount,
        readabilityScore,
        mainTopics: [],
        suggestedKeywords: []
      });
    }

    // --- CHANGE: Get the list of main topics for display (still useful) ---
    const mainTopicsForDisplay = topicsFromTextRazor
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(topic => topic.label);


    // 5. "SPROUT" - GET SUGGESTIONS FROM THE NEW SEO API
    // --- CHANGE: We make ONE call with the top topic, not a loop ---
    const seoSuggestions = await keywordService.getSeoKeywords(topTopic);
    
    // 6. CONSOLIDATE AND CLEAN SUGGESTIONS
    // The logic is simpler now as we get one flat array back.
    // Use a Set to ensure all suggestions are unique.
    const uniqueSuggestions = [...new Set(seoSuggestions)];

    // Filter out any suggestions that are already in the original text.
    const lowerCaseText = text.toLowerCase();
    const finalSuggestions = uniqueSuggestions.filter(
      keyword => !lowerCaseText.includes(keyword.toLowerCase())
    );

    // 7. ASSEMBLE AND SEND THE FINAL RESPONSE
    res.status(200).json({
      wordCount,
      readabilityScore: parseFloat(readabilityScore.toFixed(2)),
      sentiment: sentimentResult.sentiment, // Pass the sentiment string (e.g., "POSITIVE")
      mainTopics: mainTopicsForDisplay,
      suggestedKeywords: finalSuggestions.slice(0, 15),
    });

  } catch (error) {
    console.error('An error occurred in the analysis controller:', error);
    res.status(500).json({
      error: 'An unexpected error occurred on the server. Please try again later.',
    });
  }
};



// --- The new and improved insertKeyword function ---
const insertKeyword = async (req, res) => {
  try {
    const { originalText, keywordToInsert } = req.body;
    if (!originalText || !keywordToInsert) {
      return res.status(400).json({ error: 'originalText and keywordToInsert are required.' });
    }

    // 1. TARGET: Find the best sentence to modify
    // Split text into sentences using a regular expression that handles periods, question marks, and exclamation points.
    const sentences = originalText.match(/[^.!?]+[.!?]+/g) || [];
    if (sentences.length === 0) {
        // Fallback for single-sentence texts
        sentences.push(originalText);
    }

    let bestSentence = '';
    let highestScore = -1;

    // Loop through each sentence to find the most similar one
    for (const sentence of sentences) {
      const score = await getSimilarityScore(sentence, keywordToInsert);
      if (score > highestScore) {
        highestScore = score;
        bestSentence = sentence.trim();
      }
    }
    
    // If no relevant sentence is found (e.g., all scores are 0), fallback to the last sentence.
    if (!bestSentence) {
        bestSentence = sentences[sentences.length - 1].trim();
    }

    console.log('Best sentence found:', bestSentence);
    // 2. INJECT: Create the "clunky" sentence
    const clunkySentence = `${bestSentence} (related to: ${keywordToInsert})`;
    console.log('Clunky sentence created:', clunkySentence);
    // 3. PARAPHRASE: Rewrite the clunky sentence to be natural
    const paraphrasedSentence = await paraphraseSentence(clunkySentence);
    console.log('Paraphrased sentence:', paraphrasedSentence);
    // 4. REPLACE: Swap the original best sentence with the new paraphrased one
    const newText = originalText.replace(bestSentence, paraphrasedSentence);
    console.log('New text after insertion:', newText);
    res.status(200).json({
      newText: newText,
      message: 'Keyword inserted intelligently.',
    });

  } catch (error) {
    console.error('An error occurred in the insertKeyword controller:', error);
    res.status(500).json({
      error: 'An unexpected error occurred while inserting the keyword.',
    });
  }
};


// Make sure your module.exports includes the updated function
module.exports = {
  analyzeText,
  insertKeyword, // This should already be here, just confirming
};