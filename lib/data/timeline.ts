export type TimelineEntry = {
  role: string;
  company: string;
  location: string;
  period: string;
  industry: string;
  stack: string[];
  bullets: string[];
  current?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    role: 'Founder & CEO',
    company: 'Anthyx',
    location: 'Lagos, Nigeria',
    period: 'April 2026 – Present',
    industry: 'AI / Marketing Technology',
    current: true,
    stack: ['Next.js', 'Express', 'PostgreSQL', 'Gemini', 'Claude', 'Qdrant', 'BullMQ'],
    bullets: [
      'Founded Anthyx, the AI-powered workspace where brands get operated — unifying strategy, execution, and intelligence for teams managing one or more brands.',
      'Architected a multi-agent AI pipeline (Strategist → Copywriter → Reviewer → Publisher) using Gemini and Claude to enforce consistent brand voice and adapt content natively across 18+ platforms.',
      'Replaced fragmented marketing stacks (Buffer, HubSpot, Mailchimp, Notion) with one workspace covering brand memory, campaign orchestration, competitive intelligence, and analytics — driving product, engineering, and go-to-market as a solo full-stack founder.',
    ],
  },
  {
    role: 'Chief Technology Officer',
    company: 'Travel Avatar',
    location: 'California, US',
    period: 'September 2023 – Present',
    industry: 'Travel & Leisure',
    current: true,
    stack: ['Laravel', 'PHPUnit', 'Eloquent', 'PostgreSQL', 'Sentry', 'AWS'],
    bullets: [
      'Implemented industry-standard engineering practices improving development velocity and code quality.',
      'Crafted project roadmaps and aligned development cycles with business goals to ensure streamlined delivery.',
      'Fostered cross-functional team collaboration, driving innovation and on-time product releases.',
    ],
  },
  {
    role: 'Chief Technology Officer',
    company: 'Collo Africa',
    location: 'Lagos, Nigeria',
    period: 'April 2025 – August 2026',
    industry: 'FinTech',
    stack: ['Laravel', 'Next.js', 'Flutter', 'AWS', 'MySQL', 'Redis', 'Sentry'],
    bullets: [
      'Architected the 2025 Private MGR product stabilization and the 2026 Engineering Strategic Plan, overseeing development of Public MGR, Savings Plan, and Loan modules.',
      'Directed the engineering team in building high-concurrency fintech solutions using Next.js, Laravel, and AWS.',
      'Architected cloud infrastructure scaling from 2K to 40K+ users with Redis caching and EC2 auto-scaling.',
    ],
  },
  {
    role: 'AI Engineer (Backend)',
    company: 'IQAICom',
    location: 'US (Remote)',
    period: 'January 2025 – July 2025',
    industry: 'Web3 AI',
    stack: ['TypeScript', 'NestJS', 'LLM', 'FastMCP', 'Docker', 'GCP', 'VectorDB', 'CI/CD'],
    bullets: [
      'Deployed and managed AI Agents with Docker and CI/CD, migrating from DigitalOcean to GCP.',
      'Published multiple MCP packages to npm — MCP-Fraxlend, MCP-Odos, MCP-ABI, and MCP-Near.',
      'Built AI Agents using the IQAI TypeScript ADK with MCP integrations and handled LLM migration from OpenAI to Gemini.',
    ],
  },
  {
    role: 'Backend Engineer',
    company: 'Maldorini',
    location: 'Lagos, Nigeria',
    period: 'July 2024 – October 2024',
    industry: 'Crypto FinTech',
    stack: ['Laravel', 'PostgreSQL', 'Redis', 'React Native', 'AWS'],
    bullets: [
      'Built the Maldorini Community Server enabling post sharing, ad views, and crypto token (MDX) earning via interactions.',
      'Designed an advanced personalized timeline ranking algorithm for tailored content delivery.',
    ],
  },
  {
    role: 'Engineering Team Lead',
    company: 'Centiiv Technologies',
    location: 'Lagos, Nigeria',
    period: 'June 2023 – November 2023',
    industry: 'FinTech',
    stack: ['Node.js', 'Express.js', 'Prisma', 'PostgreSQL', 'Redis', 'BullMQ'],
    bullets: [
      'Streamlined project roadmap, enforced industry standards, codebase refactoring, and coordinated feature delivery.',
      'Integrated APIs for cryptocurrency on-ramping/off-ramping and expanded fiat currency options.',
    ],
  },
  {
    role: 'Backend Engineer',
    company: 'Tramango Limited',
    location: 'Lagos, Nigeria',
    period: 'March 2022 – June 2023',
    industry: 'Travel & Leisure',
    stack: ['Laravel', 'MySQL', 'PostgreSQL'],
    bullets: [
      'Built 5 major travel products and integrated third-party APIs like Amadeus and Alliance.',
      'Developed a multi-currency (5) wallet system with vendor cashout and admin-managed conversion rates.',
      'Integrated barcode generation API with event booking for streamlined attendance validation.',
    ],
  },
  {
    role: 'Software Developer',
    company: 'Balaga Int. Limited',
    location: 'Lagos, Nigeria',
    period: 'December 2021 – August 2023',
    industry: 'Dating / Social Media / E-Commerce',
    stack: ['React Native', 'Laravel'],
    bullets: [
      'Led the Software Development Team across all stages of application development.',
      'Engineered birthday email cron scheduler, secure dating matching, chat app, and shopping app for Android and iOS.',
    ],
  },
  {
    role: 'Freelance Fullstack Developer',
    company: 'Go Ahead Homes',
    location: 'London, UK',
    period: 'July 2021 – August 2021',
    industry: 'Social Services',
    stack: ['Laravel', 'HTML5', 'SCSS', 'Bootstrap', 'PostgreSQL'],
    bullets: [
      'Built a RESTful website with a Blog using Laravel, Bootstrap, SCSS, and PostgreSQL.',
      'Integrated user authentication, CRUD operations for multimedia blog posts, and deployed on Heroku.',
    ],
  },
];
