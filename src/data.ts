export const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
  "MongoDB", "Docker", "Redis", "Tailwind", "Prisma",
  "AWS", "Kafka", "Kubernetes", "Python", "FastAPI", "Java",
];

export type Project = {
  title: string;
  year: string;
  image: string;
  live?: string;
  github: string;
  demo?: string;
  description: string;
  tags: string[];
};

export const projects: Project[] = [
  {
    title: "Cogent CLI",
    year: "2026",
    image: "../assets/cogent.svg",
    github: "https://github.com/ashwani1122/claude",
    description: "Minimal coding-agent CLI with multi-provider support (Groq, Gemini, Anthropic), built-in file, git and shell tools, session management and a polished Ink terminal UI.",
    tags: ["TypeScript", "Node.js", "Ink", "Groq", "Gemini", "Anthropic"],
  },
  {
    title: "ResumeAI",
    year: "2026",
    image: "../assets/resumeapp.png",
    live: "https://resumeapp.in",
    github: "https://resumeapp.in",
    demo: "https://www.youtube.com/watch?v=IJXd9Jla14U",
    description: "AI-powered resume builder creating ATS-optimized resumes with GPT-4 enhancement and real-time preview.",
    tags: ["Next.js", "TypeScript", "GPT-4", "PDF Export"],
  },
  {
    title: "Workflow Automation",
    year: "2025",
    image: "../assets/flowforge.png",
    live: "https://workflow-automation-black.vercel.app",
    github: "https://github.com/ashwani1122/workflow-automation",
    demo: "https://www.youtube.com/watch?v=8cAox1foGsQ",
    description: "Visual workflow automation platform inspired by Zapier and n8n.",
    tags: ["Next.js", "TypeScript", "Node.js", "React Flow"],
  },
  {
    title: "Claude Sub Agent",
    year: "2025",
    image: "../assets/sub-agent.png",
    live: "https://claude-sub-agent.vercel.app",
    github: "https://github.com/ashwani1122/claude-sub-agent",
    description: "AI-powered sub-agent orchestration system for autonomous tasks.",
    tags: ["React", "TypeScript", "Claude API"],
  },
  {
    title: "MemAI",
    year: "2025",
    image: "../assets/memai.jpg",
    live: "https://github.com/ashwani1122/memeai",
    github: "https://github.com/ashwani1122/memeai",
    description: "AI meme generation platform combining creativity with automation.",
    tags: ["Python", "OpenAI", "PostgreSQL", "Semantic Search", "Vector Database", "RAG", "Graph DB", "PyPI", "Next.js", "TypeScript"],
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string;
  skills: string[];
  link: string;
};

export const experiences: ExperienceItem[] = [
  {
    company: "Hibiscustech",
    role: "Full Stack Product Engineer",
    duration: "May 2026 — Present",
    location: "Remote",
    description:
      "Developing end-to-end web applications using Next.js and Go. Working with PostgreSQL for database design, implementing CI/CD pipelines via GitHub Actions. Built the reward system for psyplay.io gaming platform with AI-driven coin mechanics and optimized sound features.",
    skills: ["Next.js", "TypeScript", "Node.js", "React Query", "Tailwind", "GO", "AWS"],
    link: "https://hibiscustech.org/",
  },
  {
    company: "Nexo",
    role: "Full Stack Developer — Freelance",
    duration: "Aug 2025 — Dec 2025",
    location: "Remote",
    description:
      "Developed full-stack applications with modern architectures, authentication systems, real-time chat, APIs, and reusable UI patterns focused on scalability and performance.",
    skills: ["Node.js", "Supabase", "TypeScript", "React", "Express", "JWT", "PostgreSQL"],
    link: "",
  },
];

export const socialLinks = [
  { href: "https://github.com/ashwani1122", label: "GitHub" },
  { href: "https://www.linkedin.com/in/ashwani-singh-308081303", label: "LinkedIn" },
  { href: "https://x.com/243ashwani", label: "X" },
  { href: "https://www.instagram.com/ashwani123950", label: "Instagram" },
];
