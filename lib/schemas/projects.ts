import { z } from 'zod';
import { StaticImageData } from 'next/image';

export const ProjectSchema = z.object({
  image: z.custom<StaticImageData>(),
  name: z.string(),
  description: z.string().optional(),
  github: z.string().url().optional(),
  url: z.string().url().optional(),
  stack: z.array(z.string()),
  stars: z.number().optional(),
  forks: z.number().optional(),
  updatedAt: z.string().optional(),
  source: z.enum(['github', 'manual']).optional(),
});

export type Project = z.infer<typeof ProjectSchema>;
