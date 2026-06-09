import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, ExternalLink, Sun, Moon } from "lucide-react";
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import Experience from "./experience";
import ContactForm from "./contactForm";

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
  "MongoDB", "Docker", "Redis", "Tailwind", "Prisma",
  "AWS", "Kafka", "Kubernetes", "Python", "FastAPI", "Java",
];

const projects = [
  {
    title: "Workflow Automation",
    year: "2025",
    image: "../assets/flowforge.png",
    live: "https://workflow-automation-black.vercel.app",
    github: "https://github.com/ashwani1122/workflow-automation",
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
    tags: ["Python", "FastAPI", "React"],
  },
];

const socials = [
  { icon: <GitHubIcon fontSize="small" />, href: "https://github.com/ashwani1122", label: "GitHub" },
  { icon: <LinkedInIcon fontSize="small" />, href: "https://www.linkedin.com/in/ashwani-singh-308081303", label: "LinkedIn" },
  { icon: <XIcon fontSize="small" />, href: "https://x.com/243ashwani", label: "X" },
  { icon: <InstagramIcon fontSize="small" />, href: "https://www.instagram.com/ashwani123950", label: "Instagram" },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-widest text-[#bbb] dark:text-[#555] mb-8">
      {children}
    </p>
  );
}

export default function Portfolio() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-[#111] dark:text-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-[#e8e8e8] dark:border-[#1a1a1a] bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-6 h-16 flex items-center justify-between">
          <span className="font-semibold text-sm tracking-tight text-[#111] dark:text-white">
            Ashwani Singh
          </span>
          <div className="flex items-center gap-5">
            <nav className="hidden sm:flex items-center gap-5 text-sm text-[#666] dark:text-[#666]">
              {["About", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-[#111] dark:hover:text-white transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
              <a
                href="/Myresume.pdf"
                target="_blank"
                className="hover:text-[#111] dark:hover:text-white transition-colors duration-200"
              >
                Resume
              </a>
            </nav>

            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
              className="rounded-lg border border-[#e5e5e5] dark:border-[#1f1f1f] p-2 text-[#666] dark:text-[#777] hover:border-[#ccc] dark:hover:border-[#333] hover:text-[#111] dark:hover:text-white transition-all duration-200"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16">
        {/* Hero */}
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-[#666] dark:text-[#666]">Available for work</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight text-[#111] dark:text-white">
            hi, ashwani here.
          </h1>

          <p className="text-[#555] dark:text-[#888] text-lg leading-relaxed mb-8 max-w-xl">
            Full Stack & AI Engineer building scalable systems, premium user experiences,
            and meaningful developer products.
          </p>

          <div className="flex items-center gap-3 mb-10 flex-wrap">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-[#111] dark:bg-white px-5 py-2.5 text-sm font-medium text-white dark:text-black hover:bg-[#333] dark:hover:bg-[#e5e5e5] transition-colors"
            >
              View Projects <ArrowUpRight size={14} />
            </a>
            <a
              href="/Myresume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg border border-[#d4d4d4] dark:border-[#2a2a2a] px-5 py-2.5 text-sm text-[#555] dark:text-[#bbb] hover:border-[#aaa] dark:hover:border-[#444] hover:text-[#111] dark:hover:text-white transition-colors"
            >
              Resume <Download size={14} />
            </a>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-lg border border-[#e5e5e5] dark:border-[#1f1f1f] p-2.5 text-[#888] dark:text-[#777] hover:border-[#ccc] dark:hover:border-[#333] hover:text-[#111] dark:hover:text-white transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </motion.section>

        {/* About */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <SectionLabel>About</SectionLabel>
          <p className="text-[#444] dark:text-[#aaa] leading-relaxed text-base">
            Self-taught developer driven by curiosity, execution, and the ambition to build
            technology that creates real impact. Passionate about architecting scalable systems,
            crafting refined user experiences, and exploring the intersection of software and AI.
            Focused on moving fast, thinking deeply, and turning ambitious ideas into
            production-ready products.
          </p>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <SectionLabel>Skills</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-[#e5e5e5] dark:border-[#1f1f1f] bg-[#f5f5f5] dark:bg-[#111] px-3 py-1.5 text-sm text-[#555] dark:text-[#bbb]"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        <Experience />

        {/* Projects */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <SectionLabel>Projects</SectionLabel>
          <div className="flex flex-col gap-5">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group rounded-xl border border-[#e5e5e5] dark:border-[#1f1f1f] bg-[#fafafa] dark:bg-[#0f0f0f] overflow-hidden hover:border-[#ccc] dark:hover:border-[#2e2e2e] transition-colors duration-300"
              >
                <div className="overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[#111] dark:text-white text-base">
                      {project.title}
                    </h3>
                    <span className="text-xs text-[#aaa] dark:text-[#555]">{project.year}</span>
                  </div>
                  <p className="text-sm text-[#666] dark:text-[#888] leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-[#ebebeb] dark:bg-[#161616] border border-[#e0e0e0] dark:border-[#1f1f1f] px-2 py-1 text-xs text-[#777] dark:text-[#777]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#888] dark:text-[#777] hover:text-[#111] dark:hover:text-white transition-colors"
                    >
                      Source <ExternalLink size={11} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#888] dark:text-[#777] hover:text-[#111] dark:hover:text-white transition-colors"
                    >
                      Website <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Contact */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-24"
        >
          <SectionLabel>Contact</SectionLabel>
          <p className="text-[#555] dark:text-[#888] text-base mb-8 max-w-md leading-relaxed">
            Whether you have a startup idea, want to collaborate, or need help building
            scalable systems — my inbox is always open.
          </p>

          <div className="rounded-xl border border-[#e5e5e5] dark:border-[#1f1f1f] bg-[#fafafa] dark:bg-[#0f0f0f] p-6 mb-6">
            <ContactForm />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-[#e5e5e5] dark:border-[#1f1f1f] px-4 py-2.5 text-sm text-[#777] dark:text-[#777] hover:border-[#ccc] dark:hover:border-[#333] hover:text-[#111] dark:hover:text-white transition-all duration-200"
              >
                {s.icon}
                <span>{s.label}</span>
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-[#e8e8e8] dark:border-[#1a1a1a] pt-8 pb-4">
          <p className="text-sm text-[#ccc] dark:text-[#3a3a3a]">© 2026 Ashwani Singh</p>
        </footer>
      </main>
    </div>
  );
}
