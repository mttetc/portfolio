import * as motion from 'motion/react-client';
import { TypingCodeBlock } from '@/components/typing-code-block';

const codeString = `// Welcome to my Portfolio! 🚀
import { NextJS, NodeJS, React, TypeScript } from '@/tech-stack';
import { TailwindCSS } from '@/ui-tools';

function createAmazingWebsite() {
  const skills = {
    webDev: [React, NextJS, NodeJS, NestJS, ExpressJS, TypeScript, TailwindCSS],
    aiTools: ["Cursor", "Claude", "GitHub Copilot"]
  };

  return {
    message: "Let's work together!",
    services: ["Web Apps", "Problem Solving", "Team Collaboration", "Fast Learning"],
    contact: "etchegaray.matthias@gmail.com"
  };
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
        <div className="flex items-center gap-2 p-3 bg-[#1e1e2e]">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
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
