"use client";

import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  Download,
  ArrowUpRight,
} from "lucide-react";
import XIcon from '@mui/icons-material/X'; import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub'; import InstagramIcon from '@mui/icons-material/Instagram';
import { motion } from "framer-motion";
import Experience from "./experience";
import ContactForm from "./contactForm";

const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Redis",
  "Tailwind",
  "Prisma",
  "AWS",
  "Kafka",
  "Kubernetes",
  "Python",
  "FastAPI",
  "Java",
];

const projects = [
  {
    title: "Workflow Automation",
    image: "../assets/flowforge.png",
    live: "https://workflow-automation-black.vercel.app",
    github: "https://github.com/ashwani1122/workflow-automation",
    description:
      "Visual workflow automation platform inspired by Zapier and n8n.",
  },
  {
    title: "Claude Sub Agent",
    image: "../assets/sub-agent.png",
    live: "https://claude-sub-agent.vercel.app",
    github: "https://github.com/ashwani1122/claude-sub-agent",
    description:
      "AI-powered sub-agent orchestration system for autonomous tasks.",
  },
  {
    title: "MemAI",
    image: "../assets/memai.jpg",
    live: "https://github.com/ashwani1122/memeai",
    github: "https://github.com/ashwani1122/memeai",
    description:
      "AI meme generation platform combining creativity with automation.",
  },
];


export default function Portfolio() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveCursor);

    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020617] text-white">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* Cursor Glow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-30 hidden h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl md:block"
        style={{
          left: mouse.x - 150,
          top: mouse.y - 150,
        }}
      />

      {/* Main */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-8 md:px-12">
        {/* Navbar */}
        <nav className="sticky top-6 z-50 mb-16 flex justify-center">
          <div className="flex items-center gap-6 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,0,0,0.3)]">
           {["Home", "Resume", "Projects", "Experience", "Contact"].map(
              (item) =>
                item === "Resume" ? (
                  <a
                    key={item}
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {item}
                  </a>
                ) : (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-slate-400 transition hover:text-white"
                  >
                    {item}
                  </a>
                )
            )}
          </div>
        </nav>

        {/* Hero */}
        <motion.section
          id="home"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.03] p-8 md:p-14 backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 via-transparent to-cyan-500/10" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-1 text-sm text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Available for work
              </div>

              <h1 className="text-5xl font-black tracking-tight md:text-7xl">
                Ashwani Singh
              </h1>

              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400 md:text-xl">
                Full Stack & AI Engineer focused on building scalable systems,
                premium user experiences, and meaningful developer products.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-medium text-black transition hover:scale-[1.03]"
                >
                  View Projects
                  <ArrowUpRight size={18} />
                </a>

                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3 text-white backdrop-blur-xl transition hover:bg-white/[0.08]"
                >
                  Resume
                  <Download size={18} />
                </a>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                {[
                  {
                    icon: <GitHubIcon  />,
                    href: "https://github.com/ashwani1122",
                  },
                  {
                    icon: <LinkedInIcon  />,
                    href: "https://www.linkedin.com/in/ashwani-singh-308081303",
                  },
                  {
                    icon: <XIcon  />,
                    href: "https://x.com/243ashwani",
                  },
                  {
                    icon: <InstagramIcon  />,
                    href: "https://instagram.com",
                  },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.08] hover:text-white"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative mx-auto">
              <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-fuchsia-500 to-cyan-500 blur-2xl opacity-30" />

              <div className="relative rounded-[32px] border border-white/10 bg-white/[0.03] p-2 backdrop-blur-xl">
                <img
                  src="../assets/profile.png"
                  alt="profile"
                  className="h-[400px] w-[320px] rounded-[24px] object-cover"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* About */}
        <motion.section
          id="about"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <h2 className="text-4xl font-bold">About</h2>

          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-slate-400">
           Self-taught developer driven by curiosity, execution, and the ambition to build technology that creates real impact. Passionate about architecting scalable systems, crafting refined user experiences, and exploring the intersection of software and AI. Focused on moving fast, thinking deeply, and turning ambitious ideas into production-ready products.

          </p>
        </motion.section>

        {/* Skills */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <h2 className="text-4xl font-bold">Skills</h2>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-500/10 to-cyan-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="relative z-10 font-medium text-slate-200">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </motion.section>
        <Experience/>
        
        {/* Projects */}
        <motion.section
          id="projects"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <h2 className="text-4xl font-bold">Projects</h2>

          <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] transition-all duration-500 hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_20px_80px_rgba(0,0,0,0.4)]"
              >
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 to-transparent" />

                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-60 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">
                      {project.title}
                    </h3>

                    <a
                      href={project.live}
                      target="_blank"
                      className="rounded-xl border border-white/10 p-2 transition hover:bg-white/10"
                    >
                      <ExternalLink size={18} />
                    </a>
                  </div>

                  <p className="mt-4 leading-relaxed text-slate-400">
                    {project.description}
                  </p>

                  <div className="mt-6 flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-sm transition hover:bg-white/[0.08]"
                    >
                      GitHub
                    </a>

                    <a
                      href={project.live}
                      target="_blank"
                      className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black"
                    >
                      Live
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Experience */}
        {/* <motion.section
          id="experience"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <h2 className="text-4xl font-bold">Experience</h2>

          <div className="mt-12 space-y-8">
            {experience.map((item, i) => (
              <div
                key={i}
                className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                  <div>
                    <h3 className="text-2xl font-semibold">{item.role}</h3>

                    <p className="mt-1 text-slate-400">
                      {item.company}
                    </p>
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-300">
                    {item.duration}
                  </span>
                </div>

                <p className="mt-6 leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section> */}

        {/* Contact */}
        {/* Contact */}
<motion.section
  id="contact"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  className="
    relative 
    mt-28 
    overflow-hidden 
    rounded-[40px] 
    border 
    border-white/10 
    bg-gradient-to-br 
    from-fuchsia-500/10 
    via-transparent 
    to-cyan-500/10 
    p-6 
    md:p-12
    backdrop-blur-2xl
  "
>
  {/* Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_35%)]" />

  <div className="relative z-10">
    {/* Heading */}
    <div className="max-w-3xl">
      <span
        className="
          inline-flex 
          items-center 
          rounded-full 
          border 
          border-fuchsia-500/20 
          bg-fuchsia-500/10 
          px-4 
          py-1 
          text-sm 
          text-fuchsia-300
        "
      >
        Contact
      </span>

      <h2 className="mt-5 text-4xl md:text-5xl font-black tracking-tight">
        Let’s Build Something Amazing
      </h2>

      <p className="mt-5 text-lg leading-relaxed text-slate-300">
        Whether you have a startup idea, want to collaborate on
        something ambitious, or need help building scalable systems —
        my inbox is always open.
      </p>
    </div>

    {/* Content */}
    <div className="mt-12 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
      {/* Contact Form */}
      <div
        className="
          rounded-[32px]
          border 
          border-white/10 
          bg-white/[0.04] 
          p-6 
          md:p-8
          backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.3)]
        "
      >
        <ContactForm />
      </div>

      {/* Sidebar */}
      <aside
        className="
          flex 
          flex-col 
          justify-between 
          rounded-[32px] 
          border 
          border-white/10 
          bg-white/[0.04] 
          p-6 
          backdrop-blur-xl
          shadow-[0_10px_40px_rgba(0,0,0,0.3)]
        "
      >
        <div>
          <h3 className="text-2xl font-semibold text-white">
            Connect with me
          </h3>

          <p className="mt-3 text-slate-400 leading-relaxed">
            I’m active across multiple platforms. Feel free to reach
            out, collaborate, or just say hi.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {[
              {
                href: "https://github.com/ashwani1122",
                icon: <GitHubIcon  />,
                text: "GitHub",
              },
              {
                href: "https://x.com/243ashwani",
                icon: <XIcon  />,
                text: "Twitter / X",
              },
              {
                href: "https://www.linkedin.com/in/ashwani-singh-308081303/",
                icon: <LinkedInIcon  />,
                text: "LinkedIn",
              },
              {
                href: "https://www.instagram.com/ashwani123950",
                icon: <InstagramIcon  />,
                text: "Instagram",
              },
            ].map((link) => (
              <a
                key={link.text}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group
                  flex 
                  items-center 
                  justify-between
                  rounded-2xl 
                  border 
                  border-white/10 
                  bg-white/[0.03] 
                  px-5 
                  py-4 
                  transition-all 
                  duration-300 
                  hover:-translate-y-1
                  hover:bg-white/[0.08]
                "
              >
                <div className="flex items-center gap-4">
                  <div
                    className="
                      rounded-xl 
                      border 
                      border-white/10 
                      bg-black/20 
                      p-3
                      text-slate-300
                    "
                  >
                    {link.icon}
                  </div>

                  <span className="text-slate-200">
                    {link.text}
                  </span>
                </div>

                <ArrowUpRight
                  size={18}
                  className="
                    text-slate-500 
                    transition-transform 
                    duration-300 
                    group-hover:translate-x-1 
                    group-hover:-translate-y-1
                  "
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div
          className="
            mt-10 
            rounded-2xl 
            border 
            border-white/10 
            bg-black/20 
            p-5
          "
        >
          <p className="text-sm text-slate-400 leading-relaxed">
            Currently focused on:
          </p>

          <div className="mt-4 flex gap-4 flex-wrap items-center p-1">
            {[
              "Full Stack",
              "AI Systems",
              "DevOps",
              "System Design",
            ].map((item) => (
              <span
                key={item}
                className="
                  rounded-full 
                  border 
                  border-white/10 
                  bg-white/[0.03] 
                  px-3 
                  py-1.5 
                  text-xs 
                  text-slate-300
                "
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </aside>
    </div>
  </div>
</motion.section>

        {/* Footer */}
        <footer className="mt-20 border-t border-white/10 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm tracking-wide text-slate-500">
              © 2026 Ashwani Singh. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

