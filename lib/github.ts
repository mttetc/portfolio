import { FEATURED_REPOS, GITHUB_PROJECT_EXTRAS, type FeaturedRepo } from '@/config/github-projects';
import { NICKNAME } from '@/constants/names';
import { Project } from '@/lib/schemas/projects';
import { getProjectImage, hasProjectImage, placeholder } from '@/lib/utils/get-project-image';

interface GitHubRepoResponse {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  language: string | null;
  topics: string[];
  archived: boolean;
}

// Map GitHub topic slugs to display names
const TOPIC_MAP: Record<string, string> = {
  angular: 'Angular',
  aws: 'AWS',
  'aws-amplify': 'AWS Amplify',
  'aws-lambda': 'AWS Lambda',
  'aws-sam': 'AWS SAM',
  'aws-api-gateway': 'AWS API Gateway',
  'better-sqlite3': 'SQLite',
  'chakra-ui': 'Chakra UI',
  clerk: 'Clerk',
  cypress: 'Cypress',
  docker: 'Docker',
  drizzle: 'Drizzle',
  dynamodb: 'DynamoDB',
  express: 'Express.js',
  'framer-motion': 'Framer Motion',
  gsap: 'GSAP',
  jest: 'Jest',
  jquery: 'JQuery',
  jwt: 'JWT',
  langchain: 'Langchain',
  mongodb: 'MongoDB',
  mysql: 'MySQL',
  nest: 'Nest.js',
  nestjs: 'Nest.js',
  next: 'Next.js',
  'next-auth': 'NextAuth',
  nextjs: 'Next.js',
  node: 'Node.js',
  nodejs: 'Node.js',
  openai: 'OpenAI',
  postgresql: 'PostgreSQL',
  primeng: 'Primeng',
  prisma: 'Prisma',
  protobuf: 'Protobuf',
  'radix-ui': 'Radix UI',
  react: 'React',
  'react-hook-form': 'React Hook Form',
  'react-native': 'React Native',
  'react-query': 'Tanstack Query',
  redis: 'Redis',
  redux: 'Redux',
  'redux-toolkit': 'Redux',
  sass: 'SASS',
  shadcn: 'Shadcn',
  'shadcn-ui': 'Shadcn',
  storybook: 'Storybook',
  'styled-components': 'Styled Components',
  supabase: 'Supabase',
  svelte: 'Svelte',
  sveltekit: 'SvelteKit',
  tailwind: 'TailwindCSS',
  'tailwind-css': 'TailwindCSS',
  tailwindcss: 'TailwindCSS',
  'tanstack-query': 'Tanstack Query',
  twig: 'Twig',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  upstash: 'Upstash',
  vite: 'Vite',
  vitest: 'Vitest',
  wordpress: 'Wordpress',
  zod: 'Zod',
  zustand: 'Zustand',
  ai: 'AI',
  'ai-agents': 'AI Agents',
  neon: 'Neon',
  'telegram-bot': 'Telegram Bot',
  apify: 'Apify',
  sse: 'SSE',
  'clean-architecture': 'Clean Architecture',
  rxjs: 'RxJS',
  motion: 'Motion',
  phaser: 'Phaser',
  'tanstack-router': 'Tanstack Router',
  'tanstack-start': 'Tanstack Start',
  'pdf-lib': 'pdf-lib',
  heroui: 'HeroUI',
  csrf: 'CSRF',
  'react-pdf': 'React PDF',
};

function topicToDisplayName(topic: string): string {
  return TOPIC_MAP[topic] ?? topic.charAt(0).toUpperCase() + topic.slice(1);
}

function buildStack(repo: GitHubRepoResponse): string[] {
  const extra = GITHUB_PROJECT_EXTRAS[repo.name];

  // Map topics to display names and deduplicate
  const fromTopics = repo.topics.map(topicToDisplayName);
  const fromExtras = extra?.stack ?? [];
  const fromLanguage = repo.language ? [repo.language] : [];

  const seen = new Set<string>();
  const stack: string[] = [];

  for (const item of [...fromTopics, ...fromExtras, ...fromLanguage]) {
    if (!seen.has(item)) {
      seen.add(item);
      stack.push(item);
    }
  }

  return stack;
}

function toProject(repo: GitHubRepoResponse, displayName?: string): Project {
  const extra = GITHUB_PROJECT_EXTRAS[repo.name];
  const imageKey = extra?.imageKey ?? repo.name;
  const image = hasProjectImage(imageKey) ? getProjectImage(imageKey) : placeholder;

  return {
    image,
    name: displayName ?? repo.name,
    description: repo.description ?? '',
    github: repo.html_url,
    url: repo.homepage || undefined,
    stack: buildStack(repo),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: repo.updated_at,
    source: 'github' as const,
  };
}

async function fetchFeaturedRepo({ repo, displayName }: FeaturedRepo): Promise<Project | null> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${NICKNAME}/${repo}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) return null;

    const data: GitHubRepoResponse = await res.json();
    return toProject(data, displayName);
  } catch {
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  const projects = await Promise.all(FEATURED_REPOS.map(fetchFeaturedRepo));
  return projects.filter((project): project is Project => project !== null);
}
