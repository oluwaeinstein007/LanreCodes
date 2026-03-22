export type Skill = {
  name: string;
  level: 'Expert' | 'Proficient' | 'Familiar';
  icon?: string;
};

export type SkillCategory = {
  category: string;
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages & Frameworks',
    skills: [
      { name: 'PHP / Laravel', level: 'Expert' },
      { name: 'TypeScript', level: 'Expert' },
      { name: 'Node.js / Express', level: 'Expert' },
      { name: 'Next.js', level: 'Expert' },
      { name: 'NestJS', level: 'Proficient' },
      { name: 'React Native', level: 'Proficient' },
      { name: 'Flutter', level: 'Familiar' },
    ],
  },
  {
    category: 'AI & Data',
    skills: [
      { name: 'LLM Integration', level: 'Expert' },
      { name: 'AI Agents', level: 'Expert' },
      { name: 'RAG Pipelines', level: 'Expert' },
      { name: 'Vector DB (Qdrant)', level: 'Expert' },
      { name: 'MCP (Model Context Protocol)', level: 'Expert' },
      { name: 'OpenAI / Gemini', level: 'Expert' },
      { name: 'Embeddings', level: 'Proficient' },
    ],
  },
  {
    category: 'Cloud & DevOps',
    skills: [
      { name: 'AWS (EC2, RDS, S3)', level: 'Expert' },
      { name: 'Docker', level: 'Expert' },
      { name: 'CI/CD Pipelines', level: 'Expert' },
      { name: 'GCP', level: 'Proficient' },
      { name: 'DigitalOcean', level: 'Proficient' },
      { name: 'Redis', level: 'Expert' },
      { name: 'Sentry', level: 'Proficient' },
    ],
  },
  {
    category: 'Databases',
    skills: [
      { name: 'MySQL', level: 'Expert' },
      { name: 'PostgreSQL', level: 'Expert' },
      { name: 'Prisma ORM', level: 'Proficient' },
      { name: 'Eloquent ORM', level: 'Expert' },
      { name: 'BullMQ', level: 'Proficient' },
    ],
  },
  {
    category: 'Leadership & Process',
    skills: [
      { name: 'Strategic Roadmapping', level: 'Expert' },
      { name: 'Agile Methodologies', level: 'Expert' },
      { name: 'Team Mentorship', level: 'Expert' },
      { name: 'Technical Recruitment', level: 'Proficient' },
      { name: 'System Architecture', level: 'Expert' },
    ],
  },
];

export const allSkillNames = skillCategories.flatMap((c) =>
  c.skills.map((s) => s.name)
);
