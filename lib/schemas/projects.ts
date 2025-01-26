import { z } from 'zod';
import { StaticImageData } from 'next/image';

export const TechStackEnum = z.enum([
  'React',
  'Next.js',
  'Express.js',
  'TypeScript',
  'JavaScript',
  'React Native',
  'Redux',
  'Zustand',
  'Tanstack Query',
  'TailwindCSS',
  'SASS',
  'Styled Components',
  'Material UI',
  'Chakra UI',
  'Shadcn',
  'Framer Motion',
  'GSAP',
  'React Hook Form',
  'Protobuf',
  'Node.js',
  'PostgreSQL',
  'MySQL',
  'Jest',
  'Cypress',
  'Docker',
  'AWS Lambda',
  'AWS Amplify',
  'JQuery',
  'Twig',
  'Wordpress',
  'AI',
  'Prisma',
]);

export const ProjectSchema = z.object({
  image: z.custom<StaticImageData>(),
  name: z.string(),
  description: z.string().optional(),
  github: z.string().url().optional(),
  url: z.string().url().optional(),
  stack: z.array(TechStackEnum),
});

export type TechStack = z.infer<typeof TechStackEnum>;
export type Project = z.infer<typeof ProjectSchema>;
