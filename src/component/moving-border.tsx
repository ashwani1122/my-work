import { useState, useEffect } from "react";
import { ArrowUpRight, Download, ExternalLink, Sun, Moon, Play } from "lucide-react";
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import Experience from "./experience";
import ContactForm from "./contactForm";
import { Contributions } from "./contribution";
import LiveAge from "./dob";

const skills = [
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
  "MongoDB", "Docker", "Redis", "Tailwind", "Prisma",
  "AWS", "Kafka", "Kubernetes", "Python", "FastAPI", "Java",
];

const projects = [
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
    title: "Agency Auditor",
    year: "2026",
    image: "../assets/agency-auditor.png",
    live: "https://agency-auditor.vercel.app",
    github: "https://agency-auditor.vercel.app",
    description: "AI tool that audits marketing agency reports and delivers blunt verdicts on real performance vs. vanity metrics.",
    tags: ["Next.js", "TypeScript", "AI", "Dodo Payments"],
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

const socials = [
  { icon: <GitHubIcon fontSize="small" />, href: "https://github.com/ashwani1122", label: "GitHub" },
  { icon: <LinkedInIcon fontSize="small" />, href: "https://www.linkedin.com/in/ashwani-singh-308081303", label: "LinkedIn" },
  { icon: <XIcon fontSize="small" />, href: "https://x.com/243ashwani", label: "X" },
  { icon: <InstagramIcon fontSize="small" />, href: "https://www.instagram.com/ashwani123950", label: "Instagram" },
];

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="rounded-none border-2 border-black dark:border-white bg-[#ffe600] px-2 py-1 text-xs font-bold text-black">
        {index}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest">{children}</span>
      <span className="flex-1 h-[2px] bg-black dark:bg-white" />
    </div>
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
    <div className="min-h-screen bg-[#f4f1ea] dark:bg-black bg-grid text-black dark:text-white font-mono">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b-2 border-black dark:border-white bg-[#f4f1ea] dark:bg-black">
        <div className="mx-auto max-w-2xl px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-sm uppercase tracking-tight bg-black dark:bg-white text-white dark:text-black px-2 py-1">
            ASHWANI_SINGH<span className="animate-blink">_</span>
          </span>
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-4 text-sm font-bold uppercase">
              {["About", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-1"
                >
                  {item}
                </a>
              ))}
              <a
                href="/Myresume.pdf"
                target="_blank"
                className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-1"
              >
                Resume
              </a>
            </nav>

            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle theme"
              className="rounded-none border-2 border-black dark:border-white p-2 bg-white dark:bg-black shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-[#ffe600] dark:hover:bg-[#ffe600] dark:hover:text-black"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16">
        {/* Hero */}
        <section id="home" className="mb-24">
          <div className="inline-flex items-center gap-2 mb-6  bg-white dark:bg-black">
            <span className="text-xs font-bold uppercase "><LiveAge /></span>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest mb-3">
          </p>

          <h1 className="text-2xl  md:text-5xl font-bold uppercase tracking-tight mb-5 leading-tight">
            HI,ASHWANI<span className=" text-black dark:text-white px-1"> HERE.</span>
            <span className="animate-blink">█</span>
          </h1>

          <p className="text-base leading-relaxed mb-8 max-w-xl border-l-4 border-black dark:border-white pl-4">
            Full Stack & AI Engineer building Agentic products, premium user experiences,
            and meaningful developer products.
          </p>

          <div className="flex sm:flex items-center gap-4 mb-10 flex-wrap">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-none border-2 border-black dark:border-white bg-black dark:bg-white px-5 py-2.5 text-sm font-bold uppercase text-white dark:text-black shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#ffe600] hover:text-black dark:hover:bg-[#ffe600] dark:hover:text-black"
            >
              
              View_Projects <ArrowUpRight size={14} />
            </a>
            <a
              href="/Myresume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-none border-2 border-black dark:border-white bg-white dark:bg-black px-5 py-2.5 text-sm font-bold uppercase shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none hover:bg-[#ffe600] dark:hover:bg-[#ffe600] dark:hover:text-black"
            >
              Resume <Download size={14} />
            </a>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="rounded-none border-2 border-black dark:border-white bg-white dark:bg-black p-2.5 shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </section>

        {/* About */}
        <section id="about" className="mb-24">
          <SectionLabel index="001">About</SectionLabel>
          <div className="border-2 border-black dark:border-white bg-white dark:bg-black p-5 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff]">
            <p className="leading-relaxed text-sm">
              Self-taught developer driven by curiosity, execution, and the ambition to build
              technology that creates real impact. Passionate about architecting Agentic products,
              crafting refined user experiences, and exploring the intersection of software and AI.
              Focused on moving fast, thinking deeply, and turning ambitious ideas into
              production-ready products.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-24">
          <SectionLabel index="002">Skills</SectionLabel>
          {/* Ticker tape — duplicated list scrolls -50% for a seamless loop */}
          <div className="border-2 border-black dark:border-white bg-white dark:bg-black shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] overflow-hidden mb-4">
            <div className="flex w-max animate-marquee">
              {[...skills, ...skills].map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="border-r-2 border-black dark:border-white px-4 py-2.5 text-xs font-bold uppercase whitespace-nowrap hover:bg-[#ffe600] hover:text-black"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {/* <div className="flex flex-wrap gap-0 border-2 border-black dark:border-white bg-white dark:bg-black">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-none border border-black dark:border-white px-3 py-1.5 text-xs font-bold uppercase -m-px hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                {skill}
              </span>
            ))}
          </div> */}
        </section>

        {/* Experience */}
        <Experience />

        {/* Projects */}
        <section id="projects" className="mb-24">
          <SectionLabel index="004">Projects</SectionLabel>
          <div className="flex flex-col gap-8">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="group rounded-none border-2 border-black dark:border-white bg-white dark:bg-black shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] hover:shadow-[2px_2px_0px_0px_#000] dark:hover:shadow-[2px_2px_0px_0px_#fff] hover:translate-x-[4px] hover:translate-y-[4px]"
              >
                {/* Window chrome title bar */}
                <div className="flex items-center justify-between border-b-2 border-black dark:border-white bg-[#ffe600] px-3 py-1.5">
                  <span className="text-xs font-bold uppercase text-black">
                    {String(i + 1).padStart(2, "0")}_{project.title.replace(/\s+/g, "_").toLowerCase()}.exe
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 border-2 border-black bg-white" />
                    <span className="h-3 w-3 border-2 border-black bg-white" />
                    <span className="h-3 w-3 border-2 border-black bg-black" />
                  </div>
                </div>
                <div className="border-b-2 border-black dark:border-white">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-48 w-full object-cover grayscale group-hover:grayscale-0"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold uppercase text-base">
                      {project.title}
                    </h3>
                    <span className="text-xs font-bold border-2 border-black dark:border-white px-2 py-0.5">{project.year}</span>
                  </div>
                  <p className="text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-none bg-[#ffe600] border border-black px-2 py-1 text-xs font-bold uppercase text-black"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase border-2 border-black dark:border-white px-3 py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:translate-x-[2px] active:translate-y-[2px]"
                    >
                      Source <ExternalLink size={11} />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold uppercase border-2 border-black dark:border-white px-3 py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:translate-x-[2px] active:translate-y-[2px]"
                    >
                      Website <ExternalLink size={11} />
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase border-2 border-black dark:border-white px-3 py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:translate-x-[2px] active:translate-y-[2px]"
                      >
                        View_Demo <Play size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* GitHub Contributions */}
        <Contributions isDark={isDark} />

        {/* Contact */}
        <section id="contact" className="mb-24">
          <SectionLabel index="006">Contact</SectionLabel>
          <p className="text-sm mb-8 max-w-md leading-relaxed border-l-4 border-black dark:border-white pl-4">
            Whether you have a startup idea, want to collaborate, or need help building
            Agentic products — my inbox is always open.
          </p>

          <div className="rounded-none border-2 border-black dark:border-white bg-white dark:bg-black p-6 mb-8 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff]">
            <ContactForm />
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-none border-2 border-black dark:border-white bg-white dark:bg-black px-4 py-2.5 text-xs font-bold uppercase shadow-[3px_3px_0px_0px_#000] dark:shadow-[3px_3px_0px_0px_#fff] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
              >
                {s.icon}
                <span>{s.label}</span>
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t-2 border-black dark:border-white pt-8 pb-4 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs font-bold uppercase tracking-widest">
            <span className="bg-black dark:bg-white text-white dark:text-black px-1.5 py-0.5 mr-2">[EOF]</span>
            © 2026 ASHWANI_SINGH
          </p>
          <p className="text-xs font-bold uppercase tracking-widest">BUILT_WITH: REACT + TAILWIND</p>
        </footer>
      </main>
    </div>
  );
}
