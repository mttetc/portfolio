'use client';

import { useState, useEffect, useRef } from 'react';
import { CodeBlock } from './ui/code-block';

interface TypingCodeBlockProps {
  language: string;
  filename: string;
  code: string;
  highlightLines?: number[];
  typingSpeed?: number; // Lower value = faster typing
  startDelay?: number;
}

export const TypingCodeBlock: React.FC<TypingCodeBlockProps> = ({
  language,
  filename,
  code,
  highlightLines = [],
  typingSpeed = 50, // Default typing speed (ms per character)
  startDelay = 300,
}) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullHeight, setFullHeight] = useState<number | null>(null);
  const fullCodeRef = useRef<HTMLDivElement>(null);
  const typingCodeRef = useRef<HTMLDivElement>(null);

  // For batch typing to improve performance
  const charsPerBatch = Math.max(1, Math.floor(1000 / typingSpeed));

  // Store the full code in a hidden element to get its height
  useEffect(() => {
    if (fullCodeRef.current) {
      // Get the height of the full code block
      const height = fullCodeRef.current.offsetHeight;
      setFullHeight(height);
    }
  }, [code]);

  useEffect(() => {
    // Reset if code changes
    const resetId = setTimeout(() => {
      setDisplayedCode('');
      setCurrentIndex(0);
      setIsComplete(false);
    }, 0);

    return () => clearTimeout(resetId);
  }, [code]);

  useEffect(() => {
    if (currentIndex === 0) {
      // Initial delay before starting to type
      const initialTimeout = setTimeout(() => {
        if (code.length > 0) {
          // Start with first batch of characters
          const firstBatch = code.substring(0, charsPerBatch);
          setDisplayedCode(firstBatch);
          setCurrentIndex(charsPerBatch);
        } else {
          setIsComplete(true);
        }
      }, startDelay);

      return () => clearTimeout(initialTimeout);
    }

    if (currentIndex < code.length) {
      const timeout = setTimeout(() => {
        // Add next batch of characters
        const nextIndex = Math.min(currentIndex + charsPerBatch, code.length);
        const nextBatch = code.substring(currentIndex, nextIndex);
        setDisplayedCode(prev => prev + nextBatch);
        setCurrentIndex(nextIndex);
      }, typingSpeed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      const completionId = setTimeout(() => setIsComplete(true), 0);
      return () => clearTimeout(completionId);
    }
  }, [code, currentIndex, typingSpeed, startDelay, isComplete, charsPerBatch]);

  return (
    <div className="relative">
      {/* Hidden full code block to measure height */}
      <div ref={fullCodeRef} className="absolute opacity-0 pointer-events-none" aria-hidden="true">
        <CodeBlock language={language} filename={filename} code={code} highlightLines={[]} />
      </div>

      {/* Visible typing code block */}
      <div ref={typingCodeRef} style={fullHeight ? { minHeight: `${fullHeight}px` } : undefined}>
        <CodeBlock
          language={language}
          filename={filename}
          code={displayedCode}
          highlightLines={isComplete ? highlightLines : []}
        />
      </div>

      {!isComplete && (
        <div className="absolute bottom-4 right-4 text-xs text-zinc-400 animate-pulse">
          Typing...
        </div>
      )}
    </div>
  );
};
