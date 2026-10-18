export interface GitHubProjectExtra {
  imageKey?: string;
  stack?: string[];
}

export interface FeaturedRepo {
  repo: string;
  displayName?: string;
}

// Projects shown on the portfolio, in this order
export const FEATURED_REPOS: FeaturedRepo[] = [
  { repo: 'AgentReplay' },
  { repo: 'Reckoner' },
  { repo: 'PDFAutoFillr' },
  { repo: 'HAHAHAHAHA', displayName: 'HAHAHAHAHA (FFX laughing game)' },
  { repo: 'Tabs' },
];

// Only imageKey for repos with GitHub topics, stack for repos without topics
export const GITHUB_PROJECT_EXTRAS: Record<string, GitHubProjectExtra> = {
  AgentReplay: { imageKey: 'agentreplay' },
  Tabs: {
    imageKey: 'tabs',
    stack: ['React', 'TypeScript', 'TailwindCSS', 'Jest', 'Storybook', 'Framer Motion'],
  },
};
