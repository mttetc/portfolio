import * as motion from 'motion/react-client';

interface SectionTitleProps {
  title: string;
  icon: 'projects' | 'about' | 'contact';
}

const emojis: Record<string, string> = {
  projects: '🚀',
  about: '👨‍💻',
  contact: '📬',
};

export function SectionTitle({ title, icon }: SectionTitleProps) {
  const emoji = emojis[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 mb-8"
    >
      <h2 className="text-4xl lg:text-5xl font-semibold">
        {emoji} {title}
      </h2>
    </motion.div>
  );
}
