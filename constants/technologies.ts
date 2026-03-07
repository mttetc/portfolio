import { BRAND_COLORS } from './colors';
import {
  SiReact, SiTypescript, SiNextdotjs, SiTailwindcss, SiChakraui, SiMui,
  SiStyledcomponents, SiFramer, SiGreensock, SiReacthookform, SiJest, SiCypress,
  SiAwsamplify, SiAwslambda, SiJquery, SiWordpress, SiSass, SiRedux, SiNodedotjs,
  SiExpress, SiPostgresql, SiPrisma, SiAngular, SiRedis, SiNestjs, SiReactquery,
  SiSupabase, SiMysql, SiVitest, SiStorybook, SiDocker, SiLangchain, SiJsonwebtokens,
  SiZod, SiDrizzle, SiSymphony, SiSvelte, SiAmazonwebservices, SiSqlite, SiClerk,
  SiAmazondynamodb, SiMongodb, SiOpenai, SiVite, SiUpstash, SiRadixui, SiShadcnui,
  SiTelegram, SiReactivex, SiNextui,
} from 'react-icons/si';
import { TbBrandReactNative, TbRobot } from 'react-icons/tb';
import { BiLogoJavascript } from 'react-icons/bi';
import { GiBearFace } from 'react-icons/gi';
import { FiShield, FiFileText, FiServer, FiLayers, FiZap } from 'react-icons/fi';
import { IoGameController } from 'react-icons/io5';

export interface Technology {
  name: string;
  icon: React.ComponentType<{ size?: number; color?: string; className?: string }>;
  color: string;
  url: string;
}

type IconComponent = React.ComponentType<{ size?: number; color?: string; className?: string }>;

const ICONS: Record<string, IconComponent> = {
  Angular: SiAngular, 'Next.js': SiNextdotjs, NextAuth: SiNextdotjs,
  'Nest.js': SiNestjs, 'Express.js': SiExpress, Svelte: SiSvelte,
  SvelteKit: SiSvelte, Vite: SiVite, TypeScript: SiTypescript,
  JavaScript: BiLogoJavascript, React: SiReact, 'React Native': TbBrandReactNative,
  'React Hook Form': SiReacthookform, Redux: SiRedux, Zustand: GiBearFace,
  'Tanstack Query': SiReactquery, Primeng: SiAngular, TailwindCSS: SiTailwindcss,
  SASS: SiSass, 'Styled Components': SiStyledcomponents, 'Material UI': SiMui,
  'Chakra UI': SiChakraui, Shadcn: SiShadcnui, 'Radix UI': SiRadixui,
  'Framer Motion': SiFramer, GSAP: SiGreensock, 'Node.js': SiNodedotjs,
  Prisma: SiPrisma, Drizzle: SiDrizzle, PostgreSQL: SiPostgresql, MySQL: SiMysql,
  SQLite: SiSqlite, DynamoDB: SiAmazondynamodb, MongoDB: SiMongodb,
  Supabase: SiSupabase, Neon: SiPostgresql, Redis: SiRedis, Upstash: SiUpstash,
  AWS: SiAmazonwebservices, 'AWS Lambda': SiAwslambda, 'AWS Amplify': SiAwsamplify,
  'AWS SAM': SiAmazonwebservices, 'AWS API Gateway': SiAmazonwebservices,
  JWT: SiJsonwebtokens, Clerk: SiClerk, OAuth: SiNextdotjs,
  AI: TbRobot, 'AI Agents': TbRobot, OpenAI: SiOpenai, Langchain: SiLangchain,
  Jest: SiJest, Vitest: SiVitest, Storybook: SiStorybook, Cypress: SiCypress,
  Docker: SiDocker, Protobuf: FiZap, Zod: SiZod,
  'Tanstack Router': SiReactquery, 'Tanstack Start': SiReactquery,
  'Telegram Bot': SiTelegram, Apify: TbRobot, SSE: FiServer,
  'Clean Architecture': FiLayers, RxJS: SiReactivex, Motion: SiFramer,
  Phaser: IoGameController, 'pdf-lib': FiFileText, 'React PDF': FiFileText,
  HeroUI: SiNextui, CSRF: FiShield, JQuery: SiJquery, Twig: SiSymphony,
  Wordpress: SiWordpress,
};

const AWS_COLOR = '#FF9900';

const COLORS: Record<string, string> = {
  Angular: '#DD0031', 'Next.js': BRAND_COLORS.nextjs, NextAuth: BRAND_COLORS.nextjs,
  'Nest.js': BRAND_COLORS.nestjs, 'Express.js': BRAND_COLORS.express,
  Svelte: '#FF3E00', SvelteKit: '#FF3E00', Vite: '#646CFF',
  TypeScript: BRAND_COLORS.typescript, JavaScript: BRAND_COLORS.javascript,
  React: BRAND_COLORS.react, 'React Native': BRAND_COLORS.react,
  'React Hook Form': BRAND_COLORS.reactHookForm, Redux: BRAND_COLORS.redux,
  Zustand: '#443E38', 'Tanstack Query': '#FF4154', Primeng: '#DD0031',
  TailwindCSS: BRAND_COLORS.tailwind, SASS: BRAND_COLORS.sass,
  'Styled Components': BRAND_COLORS.styledComponents, 'Material UI': BRAND_COLORS.materialui,
  'Chakra UI': BRAND_COLORS.chakra, Shadcn: '#000000', 'Radix UI': '#AB4ABA',
  'Framer Motion': BRAND_COLORS.framer, GSAP: BRAND_COLORS.gsap,
  'Node.js': BRAND_COLORS.nodejs, Prisma: '#2D3748', Drizzle: '#A3BF46',
  PostgreSQL: BRAND_COLORS.postgresql, MySQL: '#4479A1', SQLite: '#003B57',
  DynamoDB: AWS_COLOR, MongoDB: '#47A248', Supabase: '#3ECF8E',
  Neon: BRAND_COLORS.postgresql, Redis: '#DC382D', Upstash: '#00E9A3',
  AWS: AWS_COLOR, 'AWS Lambda': AWS_COLOR, 'AWS Amplify': AWS_COLOR,
  'AWS SAM': AWS_COLOR, 'AWS API Gateway': AWS_COLOR,
  JWT: '#000000', Clerk: '#6C47FF', OAuth: BRAND_COLORS.nextjs,
  AI: '#8B5CF6', 'AI Agents': '#8B5CF6', OpenAI: '#412991', Langchain: '#1C3C3C',
  Jest: BRAND_COLORS.jest, Vitest: '#6E9F18', Storybook: '#FF4785',
  Cypress: BRAND_COLORS.cypress, Docker: BRAND_COLORS.docker, Protobuf: '#4285F4',
  Zod: '#3E6F9E', 'Tanstack Router': '#FF4154', 'Tanstack Start': '#FF4154',
  'Telegram Bot': '#26A5E4', Apify: '#97D700', SSE: '#FF6B6B',
  'Clean Architecture': '#4FC3F7', RxJS: '#B7178C', Motion: BRAND_COLORS.framer,
  Phaser: '#F5DB53', 'pdf-lib': '#E44D26', 'React PDF': '#E44D26',
  HeroUI: '#000000', CSRF: '#4CAF50', JQuery: BRAND_COLORS.jquery,
  Twig: BRAND_COLORS.twig, Wordpress: BRAND_COLORS.wordpress,
};

const URLS: Record<string, string> = {
  Angular: 'https://angular.io', 'Next.js': 'https://nextjs.org',
  NextAuth: 'https://next-auth.js.org', 'Nest.js': 'https://nestjs.com',
  'Express.js': 'https://expressjs.com', Svelte: 'https://svelte.dev',
  SvelteKit: 'https://svelte.dev/docs/kit', Vite: 'https://vite.dev',
  TypeScript: 'https://www.typescriptlang.org',
  JavaScript: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  React: 'https://react.dev', 'React Native': 'https://reactnative.dev',
  'React Hook Form': 'https://react-hook-form.com', Redux: 'https://redux.js.org',
  Zustand: 'https://zustand-demo.pmnd.rs/', 'Tanstack Query': 'https://tanstack.com/query/latest',
  Primeng: 'https://primeng.org/', TailwindCSS: 'https://tailwindcss.com',
  SASS: 'https://sass-lang.com', 'Styled Components': 'https://styled-components.com',
  'Material UI': 'https://mui.com', 'Chakra UI': 'https://chakra-ui.com',
  Shadcn: 'https://ui.shadcn.com/', 'Radix UI': 'https://www.radix-ui.com/',
  'Framer Motion': 'https://www.framer.com/motion/', GSAP: 'https://greensock.com/gsap/',
  'Node.js': 'https://nodejs.org', Prisma: 'https://www.prisma.io',
  Drizzle: 'https://orm.drizzle.team', PostgreSQL: 'https://www.postgresql.org',
  MySQL: 'https://www.mysql.com', SQLite: 'https://www.sqlite.org',
  DynamoDB: 'https://aws.amazon.com/dynamodb', MongoDB: 'https://www.mongodb.com',
  Supabase: 'https://supabase.io', Neon: 'https://neon.tech', Redis: 'https://redis.io',
  Upstash: 'https://upstash.com', AWS: 'https://aws.amazon.com',
  'AWS Lambda': 'https://aws.amazon.com/lambda', 'AWS Amplify': 'https://aws.amazon.com/amplify',
  'AWS SAM': 'https://aws.amazon.com/serverless/sam',
  'AWS API Gateway': 'https://aws.amazon.com/api-gateway',
  JWT: 'https://jwt.io', Clerk: 'https://clerk.com', OAuth: 'https://oauth.net',
  AI: '#', 'AI Agents': '#', OpenAI: 'https://openai.com',
  Langchain: 'https://www.langchain.com/', Jest: 'https://jestjs.io',
  Vitest: 'https://vitest.dev', Storybook: 'https://storybook.js.org',
  Cypress: 'https://www.cypress.io', Docker: 'https://www.docker.com',
  Protobuf: 'https://developers.google.com/protocol-buffers', Zod: 'https://zod.dev',
  'Tanstack Router': 'https://tanstack.com/router/latest',
  'Tanstack Start': 'https://tanstack.com/start/latest',
  'Telegram Bot': 'https://core.telegram.org/bots/api', Apify: 'https://apify.com',
  SSE: 'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events',
  'Clean Architecture': '#', RxJS: 'https://rxjs.dev', Motion: 'https://motion.dev',
  Phaser: 'https://phaser.io', 'pdf-lib': 'https://pdf-lib.js.org',
  'React PDF': 'https://react-pdf.org', HeroUI: 'https://heroui.com', CSRF: '#',
  JQuery: 'https://jquery.com', Twig: 'https://twig.symfony.com',
  Wordpress: 'https://wordpress.org',
};

const DEFAULT_ICON = SiReact;
const DEFAULT_COLOR = '#6B7280';
const DEFAULT_URL = '#';

export function getTechnology(name: string): Technology {
  return {
    name,
    icon: ICONS[name] ?? DEFAULT_ICON,
    color: COLORS[name] ?? DEFAULT_COLOR,
    url: URLS[name] ?? DEFAULT_URL,
  };
}
