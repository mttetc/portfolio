'use client';

import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export default function TypingAnimation({
  texts,
  typingSpeed = 100,
  deletingSpeed = 20,
  pauseTime = 1800,
}: TypingAnimationProps) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentWord = texts[wordIndex];

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex(prev => (prev + 1) % texts.length);
      }, 0);
    } else {
      const target = isDeleting ? text.slice(0, -1) : currentWord.slice(0, text.length + 1);
      timeout = setTimeout(() => setText(target), isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="font-semibold">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
}
