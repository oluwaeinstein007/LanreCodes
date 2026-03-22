export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  category: 'ai' | 'web' | 'mobile' | 'open-source' | 'api';
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  date: string;
};

export const projects: Project[] = [
  {
    id: 'permitoai',
    title: 'PermitoAI',
    subtitle: 'AI Safety and Compliance Agent',
    description:
      'AI-powered Electronic Permit-to-Work (ePTW) system for Nigerian oil and gas operations. Features multi-agent risk assessment, compliance checking, SIMOP management, predictive scheduling, hazard suggestion, and intelligent routing for safety-critical workflows.',
    tags: ['TypeScript', 'LLM', 'Multi-Agent', 'RAG Pipeline', 'Vector DB (Qdrant)'],
    category: 'ai',
    image: '/projects/permitoai.svg',
    featured: true,
    date: 'February 2026',
  },
  {
    id: 'pharmassist',
    title: 'PharmAssist',
    subtitle: 'AI Pharmacy Agent',
    description:
      'AI-powered pharmaceutical search agent built for MedPlus. Leverages embeddings and vector search to deliver intelligent drug information retrieval and pharmaceutical query resolution for users and pharmacy staff.',
    tags: ['LLM', 'Embeddings', 'Docker', 'TypeScript', 'RAG Pipeline', 'Qdrant'],
    category: 'ai',
    image: '/projects/pharmassist.svg',
    date: 'December 2025',
  },
  {
    id: 'nvestpadi',
    title: 'nVestPadi',
    subtitle: 'Stock Investment Buddy',
    description:
      'AI-powered investment assistant that provides analysis, updates, and insights on NGX (Nigerian Exchange) and US stock markets, helping users make informed investment decisions.',
    tags: ['LLM', 'AI Agents', 'Financial APIs', 'TypeScript'],
    category: 'ai',
    image: '/projects/nvestpadi.svg',
    date: 'December 2025',
  },
  {
    id: 'socialmcp',
    title: 'SocialMCP',
    subtitle: 'npm MCP Package',
    description:
      'Open-source MCP package published on npm that enables AI agents to post, reply, and manage interactions across WhatsApp, Telegram, and X (Twitter), extending agentic social media capabilities.',
    tags: ['TypeScript', 'MCP', 'WhatsApp API', 'Telegram API', 'X API'],
    category: 'open-source',
    image: '/projects/socialmcp.svg',
    githubUrl: 'https://github.com/oluwaeinstein007',
    date: 'June 2025',
  },
  {
    id: 'travelmind',
    title: 'TravelMind',
    subtitle: 'AI Travel Agent',
    description:
      'Conversational AI travel agent that handles end-to-end itinerary planning and travel recommendations, powered by LLM-based reasoning and real-time information retrieval.',
    tags: ['LLM', 'AI Agents', 'Next.js'],
    category: 'ai',
    image: '/projects/travelmind.svg',
    date: 'November 2024',
  },
  {
    id: 'siteprox',
    title: 'SiteProx GIS API',
    subtitle: 'Personal API Project',
    description:
      'GIS API computing optimal origin-to-destination distances across n×m location matrices using Google Distance Matrix. Applicable for industrial site selection and logistics optimization.',
    tags: ['Laravel', 'PHPUnit', 'Guzzle', 'Google Distance Matrix'],
    category: 'api',
    image: '/projects/siteprox.svg',
    date: 'May 2024',
  },
  {
    id: 'keypal',
    title: 'KeyPal Vault',
    subtitle: 'Open Source Secrets Manager',
    description:
      'Collaborative secrets management API supporting team-based secret sharing across website passwords, environment variables, and file secrets — with role-based Super Admin and Admin controls.',
    tags: ['Laravel', 'MySQL', 'PHPUnit'],
    category: 'open-source',
    image: '/projects/keypal.svg',
    githubUrl: 'https://github.com/oluwaeinstein007',
    date: 'June 2023',
  },
];
