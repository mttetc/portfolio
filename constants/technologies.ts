import { TechStack } from '@/lib/schemas/projects';
import { BRAND_COLORS } from './colors';
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiChakraui,
  SiMui,
  SiStyledcomponents,
  SiFramer,
  SiGreensock,
  SiReacthookform,
  SiJest,
  SiCypress,
  SiAwsamplify,
  SiAwslambda,
  SiJquery,
  SiWordpress,
  SiSass,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiPrisma,
} from 'react-icons/si';
import { TbBrandReactNative } from 'react-icons/tb';
import { BiLogoJavascript } from 'react-icons/bi';

interface Technology {
  name: TechStack;
  icon: React.ComponentType<{
    size?: number;
    color?: string;
    className?: string;
  }>;
  color: string;
  url: string;
}

export const TECHNOLOGIES: Technology[] = [
  { name: 'React', icon: SiReact, color: BRAND_COLORS.react, url: 'https://react.dev' },
  { name: 'Next.js', icon: SiNextdotjs, color: BRAND_COLORS.nextjs, url: 'https://nextjs.org' },
  {
    name: 'TypeScript',
    icon: SiTypescript,
    color: BRAND_COLORS.typescript,
    url: 'https://www.typescriptlang.org',
  },
  {
    name: 'JavaScript',
    icon: BiLogoJavascript,
    color: BRAND_COLORS.javascript,
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
  },
  { name: 'Node.js', icon: SiNodedotjs, color: BRAND_COLORS.nodejs, url: 'https://nodejs.org' },
  {
    name: 'PostgreSQL',
    icon: SiPostgresql,
    color: BRAND_COLORS.postgresql,
    url: 'https://www.postgresql.org',
  },
  { name: 'Prisma', icon: SiPrisma, color: '#2D3748', url: 'https://www.prisma.io' },
  {
    name: 'Express.js',
    icon: SiExpress,
    color: BRAND_COLORS.express,
    url: 'https://expressjs.com',
  },
  {
    name: 'TailwindCSS',
    icon: SiTailwindcss,
    color: BRAND_COLORS.tailwind,
    url: 'https://tailwindcss.com',
  },
  { name: 'Material UI', icon: SiMui, color: BRAND_COLORS.materialui, url: 'https://mui.com' },
  { name: 'Chakra UI', icon: SiChakraui, color: BRAND_COLORS.chakra, url: 'https://chakra-ui.com' },
  {
    name: 'Styled Components',
    icon: SiStyledcomponents,
    color: BRAND_COLORS.styledComponents,
    url: 'https://styled-components.com',
  },
  { name: 'SASS', icon: SiSass, color: BRAND_COLORS.sass, url: 'https://sass-lang.com' },
  { name: 'Redux', icon: SiRedux, color: BRAND_COLORS.redux, url: 'https://redux.js.org' },
  {
    name: 'React Native',
    icon: TbBrandReactNative,
    color: BRAND_COLORS.react,
    url: 'https://reactnative.dev',
  },
  {
    name: 'Framer Motion',
    icon: SiFramer,
    color: BRAND_COLORS.framer,
    url: 'https://www.framer.com',
  },
  { name: 'GSAP', icon: SiGreensock, color: BRAND_COLORS.gsap, url: 'https://greensock.com' },
  {
    name: 'React Hook Form',
    icon: SiReacthookform,
    color: BRAND_COLORS.reactHookForm,
    url: 'https://react-hook-form.com',
  },
  { name: 'Jest', icon: SiJest, color: BRAND_COLORS.jest, url: 'https://jestjs.io' },
  { name: 'Cypress', icon: SiCypress, color: BRAND_COLORS.cypress, url: 'https://www.cypress.io' },
  {
    name: 'AWS Amplify',
    icon: SiAwsamplify,
    color: BRAND_COLORS.awsAmplify,
    url: 'https://aws.amazon.com/amplify',
  },
  {
    name: 'AWS Lambda',
    icon: SiAwslambda,
    color: BRAND_COLORS.awsLambda,
    url: 'https://aws.amazon.com/lambda',
  },
  { name: 'JQuery', icon: SiJquery, color: BRAND_COLORS.jquery, url: 'https://jquery.com' },
  {
    name: 'Wordpress',
    icon: SiWordpress,
    color: BRAND_COLORS.wordpress,
    url: 'https://wordpress.org',
  },
];
