// src/components/ResultsDisplay.jsx

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Loader2, AlertCircle, BarChart2, List, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { Smile, Frown, Meh } from 'lucide-react';

const ResultsDisplay = ({ results, isLoading, error, handleInsertKeyword }) => {
  // 1. Render Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg font-semibold">Analyzing your text...</p>
        <p className="text-muted-foreground">This may take a moment.</p>
      </div>
    );
  }

  // 2. Render Error State
  if (error) {
    return (
      <Card className="w-full bg-destructive/10 border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle />
            An Error Occurred
          </CardTitle>
          <CardDescription className="text-destructive">
            {error}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  // 3. Render nothing if there are no results yet (initial state)
  if (!results) {
    return null;
  }

  const renderSentiment = () => {
      const sentiment = results.sentiment?.toUpperCase();
      let icon = <Meh className="mx-auto h-6 w-6 text-yellow-500" />;
      let textColor = 'text-yellow-500';

      if (sentiment === 'POSITIVE') {
          icon = <Smile className="mx-auto h-6 w-6 text-green-500" />;
          textColor = 'text-green-500';
      } else if (sentiment === 'NEGATIVE') {
          icon = <Frown className="mx-auto h-6 w-6 text-red-500" />;
          textColor = 'text-red-500';
      }

      return (
          <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">Sentiment</p>
              <div className="flex items-center justify-center gap-2 mt-1">
                  {icon}
                  <p className={`text-2xl font-bold ${textColor}`}>{results.sentiment}</p>
              </div>
          </div>
      );
  };

  // 4. Render the full results
  return (
    <motion.div
      className="w-full space-y-6"
      initial={{ opacity: 0, y: 20 }} // Start invisible and slightly down
      animate={{ opacity: 1, y: 0 }}   // Animate to visible and its original position
      transition={{ duration: 0.5 }}   // Animation takes 0.5 seconds
    >
      {/* Metrics Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart2 />
            Content Metrics
          </CardTitle>
          <CardDescription>Key statistics about your text.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Word Count</p>
            <p className="text-2xl font-bold">{results.wordCount}</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">Readability</p>
            <p className="text-2xl font-bold">Grade {results.readabilityScore}</p>
          </div>
          {results.sentiment && renderSentiment()}
        </CardContent>
      </Card>

      {/* Main Topics Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List />
            Main Topics Detected
          </CardTitle>
          <CardDescription>The primary subjects identified in your text by TextRazor.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {results.mainTopics.map((topic) => (
            <Badge key={topic} variant="secondary">{topic}</Badge>
          ))}
        </CardContent>
      </Card>
      
      {/* Suggested Keywords Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles />
            Suggested Keywords
          </CardTitle>
          <CardDescription>Click a keyword to intelligently insert it into your text.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {results.suggestedKeywords.map((keyword) => (
            <Button
              key={keyword}
              variant="outline"
              size="sm"
              onClick={() => handleInsertKeyword(keyword)}
            >
              {keyword}
            </Button>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ResultsDisplay;