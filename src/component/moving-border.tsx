import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { ArrowUpRight, Download, ExternalLink, Sun, Moon, Play } from "lucide-react";
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import Experience from "./experience";
import ContactForm from "./contactForm";
import { Contributions } from "./contribution";
import LiveAge from "./dob";
import { projects, skills } from "../data";
import IntroSequence from "./intro";

const socials = [
  { icon: <GitHubIcon fontSize="small" />, href: "https://github.com/ashwani1122", label: "GitHub" },
  { icon: <LinkedInIcon fontSize="small" />, href: "https://www.linkedin.com/in/ashwani-singh-308081303", label: "LinkedIn" },
  { icon: <XIcon fontSize="small" />, href: "https://x.com/243ashwani", label: "X" },
  { icon: <InstagramIcon fontSize="small" />, href: "https://www.instagram.com/ashwani123950", label: "Instagram" },
];

function SectionLabel({ index, children, dataIntro }: { index: string; children: React.ReactNode; dataIntro?: string }) {
  return (
    <div data-intro={dataIntro} className="flex items-center gap-3 mb-8">
      <span className="rounded-none border-2 border-black dark:border-white bg-[#ffe600] px-2 py-1 text-xs font-bold text-black">
        {index}
      </span>
      <span className="text-xs font-bold uppercase tracking-widest">{children}</span>
      <span className="flex-1 h-[2px] bg-black dark:bg-white" />
    </div>
  );
}

const INTRO_SESSION_KEY = "portfolio:intro-played";

function shouldPlayIntro() {
  if (typeof window === "undefined") return false;
  try {
    const intro = new URLSearchParams(window.location.search).get("intro");
    if (intro === "0" || intro === "false") return false;
    if (intro === "1" || intro === "true") return true;
    if (sessionStorage.getItem(INTRO_SESSION_KEY) === "1") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    return true;
  } catch {
    return true;
  }
}

export default function Portfolio() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return true;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [showIntro, setShowIntro] = useState(shouldPlayIntro);
  const [introRun, setIntroRun] = useState(0);

  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, "1");
    } catch {
      /* ignore */
    }
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    delete document.documentElement.dataset.introPlaying;
    setShowIntro(false);
  }, []);

  // Safety net: never leave the document scroll-locked once the intro is gone.
  useEffect(() => {
    if (showIntro) return;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    delete document.documentElement.dataset.introPlaying;
  }, [showIntro]);

  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    try {
      history.pushState(null, "", `#${id}`);
    } catch {
      /* ignore */
    }
  }, []);

  const replayIntro = useCallback(() => {
    window.scrollTo(0, 0);
    setIntroRun((run) => run + 1);
    setShowIntro(true);
  }, []);

  return (
    <>
      <div
        data-portfolio-page
        inert={showIntro ? true : undefined}
        aria-hidden={showIntro ? true : undefined}
        className={`min-h-screen bg-[#f4f1ea] dark:bg-black bg-grid text-black dark:text-white font-mono ${
          showIntro ? "" : "page-reveal"
        }`}
      >
      {/* Nav */}
      <header data-intro="header" className="sticky top-0 z-50 border-b-2 border-black dark:border-white bg-[#f4f1ea] dark:bg-black">
        <div className="mx-auto max-w-2xl px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-sm uppercase tracking-tight bg-black dark:bg-white text-white dark:text-black px-2 py-1">
            ASHWANI_SINGH<span className="animate-blink">_</span>
          </span>
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-4 text-sm font-bold uppercase">
              {["About", "Projects", "Contact"].map((item) => {
                const id = item.toLowerCase();
                return (
                  <a
                    key={item}
                    href={`#${id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      scrollToSection(id);
                    }}
                    className="hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-1"
                  >
                    {item}
                  </a>
                );
              })}
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
          <div data-intro="live-age" className="inline-flex items-center gap-2 mb-6  bg-white dark:bg-black">
            <span className="text-xs font-bold uppercase "><LiveAge /></span>
          </div>

          <p className="text-xs font-bold uppercase tracking-widest mb-3">
          </p>

          <h1 data-intro="hero-headline" className="text-2xl  md:text-5xl font-bold uppercase tracking-tight mb-5 leading-tight">
            HI,ASHWANI<span className=" text-black dark:text-white px-1"> HERE.</span>
            <span className="animate-blink">█</span>
          </h1>

          <p data-intro="hero-copy" className="text-base leading-relaxed mb-8 max-w-xl border-l-4 border-black dark:border-white pl-4">
            Full Stack & AI Engineer building Agentic products, premium user experiences,
            and meaningful developer products.
          </p>

          <div data-intro="hero-actions" className="flex sm:flex items-center gap-4 mb-10 flex-wrap">
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

          <div data-intro="hero-socials" className="flex items-center gap-3 flex-wrap">
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
          <SectionLabel index="001" dataIntro="about-label">About</SectionLabel>
          <div data-intro="about-card" className="border-2 border-black dark:border-white bg-white dark:bg-black p-5 shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff]">
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
          <SectionLabel index="002" dataIntro="skills-label">Skills</SectionLabel>
          {/* Ticker tape — duplicated list scrolls -50% for a seamless loop */}
          <div data-intro="skills-ticker" className="border-2 border-black dark:border-white bg-white dark:bg-black shadow-[4px_4px_0px_0px_#000] dark:shadow-[4px_4px_0px_0px_#fff] overflow-hidden mb-4">
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
          <SectionLabel index="004" dataIntro="projects-label">Projects</SectionLabel>
          <div className="flex flex-col gap-8">
            {projects.map((project, i) => (
              <div
                key={project.title}
                data-intro={`project-card-${i + 1}`}
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
                    className="block h-auto w-full grayscale group-hover:grayscale-0"
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
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-bold uppercase border-2 border-black dark:border-white px-3 py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:translate-x-[2px] active:translate-y-[2px]"
                      >
                        Website <ExternalLink size={11} />
                      </a>
                    )}
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
          <SectionLabel index="006" dataIntro="contact-label">Contact</SectionLabel>
          <p data-intro="contact-copy" className="text-sm mb-8 max-w-md leading-relaxed border-l-4 border-black dark:border-white pl-4">
            Whether you have a startup idea, want to collaborate, or need help building
            Agentic products — my inbox is always open.
          </p>

          <div data-intro="contact-form" className="rounded-none border-2 border-black dark:border-white bg-white dark:bg-black p-6 mb-8 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff]">
            <ContactForm />
          </div>

          <div data-intro="contact-socials" className="flex items-center gap-3 flex-wrap">
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
        <footer data-intro="footer" className="border-t-2 border-black dark:border-white pt-8 pb-4 flex items-center justify-between gap-4 flex-wrap">
          <p className="text-xs font-bold uppercase tracking-widest">
            <span className="bg-black dark:bg-white text-white dark:text-black px-1.5 py-0.5 mr-2">[EOF]</span>
            © 2026 ASHWANI_SINGH
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <p className="text-xs font-bold uppercase tracking-widest">BUILT_WITH: REACT + TAILWIND</p>
            <button
              type="button"
              onClick={replayIntro}
              className="text-xs font-bold uppercase tracking-widest underline decoration-2 underline-offset-4 hover:bg-[#ffe600] hover:text-black px-1"
            >
              ↻ REPLAY_INTRO
            </button>
          </div>
        </footer>
      </main>
      </div>
      {showIntro && (
        <IntroSequence key={introRun} onComplete={finishIntro} />
      )}
    </>
  );
}
