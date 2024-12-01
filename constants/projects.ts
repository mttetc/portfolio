import { Project } from '@/lib/schemas/projects';
import { getProjectImage } from '@/lib/utils/get-project-image';

export const PROJECTS: Project[] = [
  {
    image: getProjectImage('quaestio'),
    name: 'Quaestio',
    github: 'https://github.com/mttetc/quaestio',
    description: 'AI-powered gmail Q&A curator',
    stack: [
      'React',
      'Next.js',
      'TypeScript',
      'TailwindCSS',
      'PostgreSQL',
      'AI',
      'Shadcn',
      'Framer Motion',
    ],
  },
  {
    image: getProjectImage('cryptoguessr'),
    name: 'Cryptoguessr',
    github: 'https://github.com/mttetc/cryptoguessr',
    url: 'https://main.d2xcbwz138rr7q.amplifyapp.com/',
    description: 'Crypto price guessing game with real-time data',
    stack: [
      'React',
      'TypeScript',
      'TailwindCSS',
      'AWS Lambda',
      'AWS Amplify',
      'Jest',
      'Cypress',
      'Tanstack Query',
      'Zustand',
      'Shadcn',
      'Framer Motion',
    ],
  },
  {
    image: getProjectImage('polygons'),
    name: 'Polygons',
    github: 'https://github.com/mttetc/polygons',
    url: 'https://polygons-eta.vercel.app/',
    description: 'Drawing app with save, load and optimized compression',
    stack: [
      'React',
      'TypeScript',
      'Cypress',
      'Jest',
      'Redux',
      'Material UI',
      'Protobuf',
      'Framer Motion',
    ],
  },
  {
    image: getProjectImage('obat'),
    name: 'Obat',
    url: 'https://www.obat.fr/',
    description: 'Construction and finance software as a service with 20K+ users',
    stack: [
      'React',
      'TypeScript',
      'Cypress',
      'Jest',
      'Redux',
      'Zustand',
      'Docker',
      'Tanstack Query',
      'Styled Components',
      'React Hook Form',
      'Framer Motion',
      'JQuery',
    ],
  },
  {
    image: getProjectImage('happywait'),
    name: 'Happywait',
    url: 'https://www.happywait.com/',
    description: 'Real estate project management software as a service with 1K+ promoters',
    stack: [
      'React',
      'React Native',
      'TypeScript',
      'Cypress',
      'Jest',
      'Styled Components',
      'Tanstack Query',
      'Zustand',
      'Chakra UI',
      'React Hook Form',
      'Framer Motion',
    ],
  },
  {
    image: getProjectImage('videobookmark'),
    name: 'Video bookmark',
    github: 'https://github.com/mttetc/bookmark',
    description: 'Small app for video (youtube, vimeo) bookmarking',
    stack: ['React', 'TypeScript', 'Styled Components', 'Jest'],
  },
  {
    image: getProjectImage('adeo'),
    name: 'Adeo',
    url: 'https://www.adeo.com/',
    description: 'Eco-responsible charity website',
    stack: ['JavaScript', 'SASS', 'Jest', 'GSAP', 'Wordpress'],
  },
  {
    image: getProjectImage('maisondesfemmes'),
    name: 'La maison des femmes',
    url: 'https://www.lamaisondesfemmes.fr/',
    description: 'Non-profit woman rights organization website',
    stack: ['JavaScript', 'SASS', 'Jest', 'GSAP', 'Wordpress'],
  },
  {
    image: getProjectImage('gazettedemonaco'),
    name: 'La gazette de monaco',
    url: 'https://lagazettedemonaco.com/',
    description: 'News platform',
    stack: ['React', 'JavaScript', 'Redux', 'Jest', 'SASS', 'Wordpress'],
  },
  {
    image: getProjectImage('alpinecars'),
    name: 'Alpine cars',
    url: 'https://www.alpinecars.fr/',
    description: 'Car manufacturer website',
    stack: ['JavaScript', 'SASS', 'Wordpress'],
  },
  {
    image: getProjectImage('bluesystems'),
    name: 'Bluesystems',
    url: 'https://www.bluesystems.fr/',
    description: 'Corporate website',
    stack: ['JavaScript', 'SASS', 'Wordpress'],
  },
  {
    image: getProjectImage('ouestfrance'),
    name: 'Ouest France',
    url: 'https://www.ouest-france.fr/',
    description: 'News platform',
    stack: ['JavaScript', 'SASS', 'JQuery', 'Twig'],
  },
  {
    image: getProjectImage('pagesjaunes'),
    name: 'Pages Jaunes',
    url: 'https://www.pagesjaunes.fr/',
    description: 'Business directory platform',
    stack: ['JavaScript', 'SASS', 'JQuery', 'Twig'],
  },
];
