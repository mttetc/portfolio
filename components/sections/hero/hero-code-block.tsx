'use client';

import { motion } from 'motion/react';
import { TypingCodeBlock } from '@/components/typing-code-block';

const codeString = `export const stack = {
  frontend: ['React', 'TypeScript', 'TanStack Query', 'Vite', 'Playwright'],
  ai: ['Claude Code', 'MCP', 'Multi-agent review', 'Browser QA agents'],
  backend: ['Node.js', 'Fastify', 'BullMQ', 'Symfony', 'RabbitMQ', 'PostgreSQL', 'Supabase'],
  ops: ['Docker', 'GitLab CI', 'Datadog'],
};`;

const getImageVariants = () => ({
  hidden: {
    opacity: 0,
    scale: 0.9,
    x: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  },
});

export function HeroCodeBlock() {
  return (
    <motion.div
      variants={getImageVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-[800px] justify-self-end"
    >
      <div className="rounded-lg overflow-hidden shadow-xl">
        {/* Window Controls */}
        <div className="flex items-center gap-2 p-3 bg-background-darker">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>

        {/* Code Content */}
        <div className="bg-muted">
          <TypingCodeBlock
            language="typescript"
            filename="Skills"
            code={codeString}
            typingSpeed={60}
            startDelay={100}
          />
        </div>
      </div>
    </motion.div>
  );
}
