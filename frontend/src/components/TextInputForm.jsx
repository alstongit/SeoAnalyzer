// src/components/TextInputForm.jsx

import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Loader2, Copy, Check } from 'lucide-react'; // A nice spinner icon

/**
 * TextInputForm Component
 * Renders the text area for user input and the analyze button.
 *
 * @param {object} props
 * @param {string} props.inputText - The current text value from the parent state.
 * @param {function} props.setInputText - Function to update the parent state on text change.
 * @param {function} props.handleAnalyze - Function to call when the analyze button is clicked.
 * @param {boolean} props.isLoading - Flag to know when an analysis is in progress.
 */
const TextInputForm = ({ inputText, setInputText, handleAnalyze, isLoading, handleCopy, isCopied }) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <Textarea
        placeholder="Paste your blog post, newsletter, or social media caption here..."
        className="min-h-[250px] text-base p-4"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        disabled={isLoading} // Disable textarea while loading
      />
      <Button
          onClick={handleCopy}
          variant="outline"
          disabled={!inputText} // Disable if there's no text
      >
          {isCopied ? (
              <Check className="mr-2 h-4 w-4 text-green-500" />
          ) : (
              <Copy className="mr-2 h-4 w-4" />
          )}
          {isCopied ? 'Copied!' : 'Copy Text'}
      </Button>
      <Button
          onClick={handleAnalyze}
          disabled={isLoading || inputText.trim().length < 50}
          size="lg"
          className="w-full md:w-auto" // Simplified class
      >
          {isLoading ? (
              <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
              </>
          ) : (
              'Analyze Text'
          )}
      </Button>
    </div>
  );
};

export default TextInputForm;