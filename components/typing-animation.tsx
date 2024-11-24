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
  typingSpeed = 150,
  deletingSpeed = 50,
  pauseTime = 2000,
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
      setIsDeleting(false);
      setWordIndex(prev => (prev + 1) % texts.length);
    } else {
      const target = isDeleting ? text.slice(0, -1) : currentWord.slice(0, text.length + 1);
      timeout = setTimeout(() => setText(target), isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="font-semibold text-[hsl(var(--text-primary))]">
      {text}
      <span className="animate-blink">|</span>
    </span>
  );
}
