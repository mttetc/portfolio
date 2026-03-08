export interface GitHubProjectExtra {
  imageKey?: string;
  stack?: string[];
}

export const EXCLUDED_REPOS = ['portfolio', 'cv'];

// Only imageKey for repos with GitHub topics, stack for repos without topics
export const GITHUB_PROJECT_EXTRAS: Record<string, GitHubProjectExtra> = {
  AgentReplay: { imageKey: 'agentreplay' },
  'nestjs-auth-api': {
    imageKey: 'nestjsAuthApi',
    stack: ['Nest.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Neon', 'JWT', 'Redis'],
  },
  CryptoSentry: {
    imageKey: 'cryptosentry',
    stack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Supabase', 'Radix UI', 'Upstash', 'Zod'],
  },
  Tabs: {
    imageKey: 'tabs',
    stack: ['React', 'TypeScript', 'TailwindCSS', 'Jest', 'Storybook', 'Framer Motion'],
  },
  LiveThread: { imageKey: 'livethread' },
  quaestio: {
    imageKey: 'quaestio',
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'PostgreSQL',
      'Langchain',
      'Shadcn',
      'Framer Motion',
      'Supabase',
      'Drizzle',
      'Radix UI',
      'Zod',
    ],
  },
  CryptoGuessr: { imageKey: 'cryptoguessr' },
  DrawPolygons: { imageKey: 'polygons' },
  taskflow: { imageKey: 'taskFlow' },
  bookmark: { imageKey: 'videobookmark' },
};
