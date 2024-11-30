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
}

export const TECHNOLOGIES: Technology[] = [
  { name: 'React', icon: SiReact, color: BRAND_COLORS.react },
  { name: 'Next.js', icon: SiNextdotjs, color: BRAND_COLORS.nextjs },
  { name: 'Node.js', icon: SiNodedotjs, color: BRAND_COLORS.nodejs },
  { name: 'TypeScript', icon: SiTypescript, color: BRAND_COLORS.typescript },
  { name: 'JavaScript', icon: BiLogoJavascript, color: BRAND_COLORS.javascript },
  { name: 'React Native', icon: TbBrandReactNative, color: BRAND_COLORS.react },
  { name: 'Redux', icon: SiRedux, color: BRAND_COLORS.redux },
  { name: 'TailwindCSS', icon: SiTailwindcss, color: BRAND_COLORS.tailwind },
  { name: 'SASS', icon: SiSass, color: BRAND_COLORS.sass },
  { name: 'Styled Components', icon: SiStyledcomponents, color: BRAND_COLORS.styledComponents },
  { name: 'Material UI', icon: SiMui, color: BRAND_COLORS.materialui },
  { name: 'Chakra UI', icon: SiChakraui, color: BRAND_COLORS.chakra },
  { name: 'Framer Motion', icon: SiFramer, color: BRAND_COLORS.framer },
  { name: 'GSAP', icon: SiGreensock, color: BRAND_COLORS.gsap },
  { name: 'React Hook Form', icon: SiReacthookform, color: BRAND_COLORS.reactHookForm },
  { name: 'Jest', icon: SiJest, color: BRAND_COLORS.jest },
  { name: 'Cypress', icon: SiCypress, color: BRAND_COLORS.cypress },
  { name: 'AWS Amplify', icon: SiAwsamplify, color: BRAND_COLORS.awsAmplify },
  { name: 'AWS Lambda', icon: SiAwslambda, color: BRAND_COLORS.awsLambda },
  { name: 'JQuery', icon: SiJquery, color: BRAND_COLORS.jquery },
  { name: 'Wordpress', icon: SiWordpress, color: BRAND_COLORS.wordpress },
];
