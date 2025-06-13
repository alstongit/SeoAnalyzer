// src/App.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Import our custom components
import TextInputForm from './components/TextInputForm';
import ResultsDisplay from './components/ResultsDisplay';

const API_URL = import.meta.env.VITE_API_BASE_URL;
console.log('API URL:', API_URL);

function App() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!inputText) return; // Don't copy if there's nothing to copy

    navigator.clipboard.writeText(inputText);
    setIsCopied(true);

    // Reset the "Copied!" message after 2 seconds
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  // --- NEW LOGIC FOR handleAnalyze ---
  const handleAnalyze = async () => {
    setIsLoading(true);
    setError('');
    setResults(null); // Clear previous results

    try {
      const response = await axios.post(`${API_URL}/analyze`, {
        text: inputText,
      });
      setResults(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An unexpected error occurred.';
      setError(errorMessage);
      console.error('Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // --- NEW LOGIC FOR handleInsertKeyword ---
  const handleInsertKeyword = async (keyword) => {
    try {
      const response = await axios.post(`${API_URL}/insert-keyword`, {
        originalText: inputText,
        keywordToInsert: keyword,
      });
      // Update the input text with the new version from the backend
      setInputText(response.data.newText);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to insert keyword.';
      setError(errorMessage); // Display insertion error
      console.error('Keyword insertion error:', err);
    }
  };

  return (
    <main className="container mx-auto p-4 md:p-8 flex flex-col items-center min-h-screen">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Insight SEO</h1>
          <p className="text-muted-foreground mt-2">
            Paste your text below to get AI-powered SEO insights and keyword suggestions.
          </p>
        </header>

        <TextInputForm
          inputText={inputText}
          setInputText={setInputText}
          handleAnalyze={handleAnalyze}
          isLoading={isLoading}
          handleCopy={handleCopy}
          isCopied={isCopied}
        />

        <ResultsDisplay
          results={results}
          isLoading={isLoading}
          error={error}
          handleInsertKeyword={handleInsertKeyword}
        />
      </div>
    </main>
  );
}

export default App;