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
  cryptosentry: {
    imageKey: 'cryptosentry',
    stack: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'Supabase', 'Radix UI', 'Upstash', 'Zod'],
  },
  tabs: {
    imageKey: 'tabs',
    stack: ['React', 'TypeScript', 'TailwindCSS', 'Jest', 'Storybook', 'Framer Motion'],
  },
  livethread: { imageKey: 'livethread' },
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
  cryptoguessr: { imageKey: 'cryptoguessr' },
  polygons: { imageKey: 'polygons' },
  TaskFlow: { imageKey: 'taskFlow' },
  bookmark: { imageKey: 'videobookmark' },
};
