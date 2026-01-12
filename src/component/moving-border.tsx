import { useEffect, useRef, useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import ContactForm from './contactForm';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

interface BorderPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

const MovingBorderComplete: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const borderRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [elements, setElements] = useState<HTMLElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const contentElements = Array.from(
      containerRef.current.querySelectorAll('.content-item')
    ) as HTMLElement[];
    setElements(contentElements);
  }, []);

  useEffect(() => {
    if (elements.length === 0 || !borderRef.current || !containerRef.current) return;

    const updateBorderPosition = () => {
      const element = elements[currentIndex];
      const containerRect = containerRef.current!.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      const position: BorderPosition = {
        top: elementRect.top - containerRect.top - 8,
        left: elementRect.left - containerRect.left - 8,
        width: elementRect.width + 16,
        height: elementRect.height + 16,
      };

      const border = borderRef.current!;
      border.style.top = `${position.top}px`;
      border.style.left = `${position.left}px`;
      border.style.width = `${position.width}px`;
      border.style.height = `${position.height}px`;

      const existingLines = border.querySelectorAll('.scanning-line-vertical, .scanning-line-horizontal');
      existingLines.forEach(line => line.remove());

      const verticalLine = document.createElement('div');
      verticalLine.className = 'scanning-line-vertical';
      border.appendChild(verticalLine);

      const horizontalLine = document.createElement('div');
      horizontalLine.className = 'scanning-line-horizontal';
      border.appendChild(horizontalLine);
    };

    updateBorderPosition();
    window.addEventListener('resize', updateBorderPosition);

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % elements.length);
    }, 3000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', updateBorderPosition);
    };
  }, [currentIndex, elements]);

  return (
    <>
      <style>{`
        @keyframes glowPulse { 0%,100%{background-position:0% 50%}50%{background-position:100% 50%} }
        @keyframes scanHorizontal { 0%{left:-10px;opacity:0}10%{opacity:1}90%{opacity:1}100%{left:100%;opacity:0} }
        @keyframes scanVertical { 0%{top:-10px;opacity:0}10%{opacity:1}90%{opacity:1}100%{top:100%;opacity:0} }

        .scanning-line-vertical {
          position: absolute; top: 0; bottom: 0; width: 2px;
          background: linear-gradient(to bottom, transparent 0%, rgba(192,38,211,0.9) 50%, transparent 100%);
          box-shadow: 0 0 20px rgba(192,38,211,0.35);
          animation: scanHorizontal 2s ease-in-out;
          z-index: 11;
        }

        .scanning-line-horizontal {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(to right, transparent 0%, rgba(34,211,238,0.9) 50%, transparent 100%);
          box-shadow: 0 0 20px rgba(34,211,238,0.35);
          animation: scanVertical 2s ease-in-out 0.25s;
          z-index: 11;
        }

        .glow-text { background: linear-gradient(135deg, rgba(192,38,211,0.9), rgba(34,211,238,0.85)); -webkit-background-clip: text; background-clip: text; color: transparent; background-size: 200% 200%; animation: glowPulse 3s ease-in-out infinite; }

        @media (max-width: 640px) { .moving-border { transition: all 0.4s ease; } }
      `}</style>

      {/* Main Wrapper */}
      <div className="min-h-screen w-full bg-slate-950 text-slate-100 relative selection:bg-fuchsia-500/30">
        
        {/* --- FIXED BACKGROUND LAYER START --- */}
        {/* Changed from 'absolute' to 'fixed' and added 'z-0' */}
        <div className="fixed inset-0 z-0 pointer-events-none">
            {/* 1. The Grid Pattern */}
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            {/* 2. The Glow Orb (Top Center) */}
            <div className="absolute left-0 right-0 top-[-10%] m-auto h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[100px]"></div>
            
            {/* 3. The Radial Mask (Vignette) */}
            <div className="absolute inset-0 bg-slate-950 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,black)]"></div>
        </div>
        {/* --- FIXED BACKGROUND LAYER END --- */}

        {/* --- SCROLLABLE CONTENT START --- */}
        {/* Added 'relative z-10' to ensure content scrolls OVER the fixed background */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center p-6">
          <div className="w-full max-w-6xl">
            {/* Nav */}
            <nav className="flex justify-center mb-8 sticky top-4 z-50">
              <div className="flex items-center gap-6 px-4 py-2 rounded-full border border-slate-700/50 bg-slate-900/80 backdrop-blur-md shadow-xl">
                <a href="#home" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Home</a>
                <a href="#projects" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Projects</a>
                <a href="#contact" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Contact</a>
              </div>
            </nav>

            {/* Main profile card + moving border container */}
            <div ref={containerRef} className="relative flex flex-col gap-6" aria-live="polite">
              <div ref={borderRef} className="moving-border absolute pointer-events-none border border-slate-200/20 shadow-[0_0_40px_rgba(192,38,211,0.1)] rounded-lg overflow-hidden transition-[top_left_width_height] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" />

              <section id="home" className="mx-auto w-[min(90%,800px)] bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex flex-col gap-6 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Left: profile image + meta */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full">
                  <div className="flex-shrink-0 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 flex items-center justify-center mt-4">
                    <img
                      className="content-item sm:w-32 md:w-40 object-cover rounded-md "
                      src={'../assets/profile.png'}
                      alt="Profile"
                    />
                  </div>

                  <div className="flex-1 flex flex-col text-left">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h1 className="content-item text-2xl sm:text-3xl md:text-4xl font-bold leading-tight glow-text">
                        Ashwani
                      </h1>
                      <span className="inline-flex items-center rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-400/20">Available</span>
                    </div>

                    <p className="content-item mt-1 text-sm sm:text-base text-slate-400">Software Engineer</p>

                    <div className="content-item mt-3 flex items-center gap-2 text-sm text-slate-400 break-words">
                      <img className="w-5 h-5 opacity-80" src="https://img.icons8.com/color/48/000000/gmail.png" alt="email" />
                      <span className="select-all text-sm hover:text-slate-200 transition-colors">ashwanisingh3846@gmail.com</span>
                    </div>
                  </div>
                </div>

                {/* Right: social icons */}
                <div className="flex w-full items-center justify-between sm:w-auto gap-2 sm:gap-3 mt-2 sm:mt-0">
                  <a
                    href="https://x.com/243ashwani"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:text-white text-slate-400 transition-all text-sm"
                  >
                    <XIcon sx={{ fontSize: 20 }} />
                  </a>

                  <a
                    href="https://github.com/ashwani1122"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-700 hover:text-white text-slate-400 transition-all text-sm"
                  >
                    <GitHubIcon sx={{ fontSize: 20 }} />
                    <span className="hidden sm:inline">GitHub</span>
                  </a>

                </div>
              </div>

              <p className="content-item text-center text-slate-400 border-t border-slate-800/50 pt-4 mt-2">
                Engineering end-to-end solutions with clean code and clear vision.
              </p>
            </section>


              {/* About + Skills */}
              <section className="mx-auto w-[min(90%,800px)] mt-8">
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-slate-100">About Me</h2>
                <div className="text-slate-400 leading-relaxed text-justify hyphens-auto space-y-4">
                  <p>Hey, I'm Ashwani, a Computer Science undergrad and full-stack developer who thrives on building and shipping solutions that truly matter. I could be an excellent fit if you seek a developer whose passion is inseparable from their craft.</p>
                  <p>My approach is defined by deep product ownership—I don't just deliver to specification; I relentlessly refine, constantly seeking out opportunities to elevate the quality and user experience. If you’re looking for a developer who builds with heart, technical excellence, and an unwavering commitment to the final outcome, let’s talk.</p>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-medium mb-3 text-slate-200">Skills</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {[
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', name: 'React.js' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', name: 'Next.js' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', name: 'Node.js' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', name: 'TypeScript' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', name: 'CSS3' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', name: 'HTML5' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', name: 'Git' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', name: 'GitHub' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', name: 'JavaScript' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', name: 'Express.js' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', name: 'MongoDB' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', name: 'MySQL' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', name: 'PostgreSQL' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', name: 'Redis' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-original.svg', name: 'Heroku' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg', name: 'Firebase' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg', name: 'Prisma' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', name: 'Tailwind' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', name: 'Docker' },
                      { icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bun/bun-original.svg', name: 'Bun' },
                    ].map((skill) => (
                      <div key={skill.name} className="flex items-center gap-2 rounded-lg border border-slate-700/50 px-3 py-2 bg-slate-800/30 hover:bg-slate-800/50 transition-colors">
                        <img src={skill.icon} alt={`${skill.name} icon`} className="w-5 h-5" />
                        <span className="text-sm text-slate-300">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Projects */}
              <section id="projects" className="mx-auto w-[min(90%,800px)] mt-12">
                <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-slate-100">Projects</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { img: '../assets/safedep.png', title: 'SafeDep', link: 'https://safedep2.vercel.app/', github: 'https://github.com/ashwani1122/safedep2' },
                    { img: '../assets/nexo.png', title: 'Nexo', link: 'https://nexo12.vercel.app/', github: 'https://github.com/ashwani1122/second-life-marketplace' },
                    { img: '../assets/delfood.png', title: 'Delfood', link: 'https://order-food-tz78.onrender.com/', github: 'https://github.com/ashwani1122/Food-order/tree/main' },
                    { img: '../assets/Depin.png', title: 'Depin', link: '', github: 'https://github.com/ashwani1122/depin' },
                    { img: '../assets/predstock.png', title: 'PredStock', link: 'https://predstock.vercel.app/', github: 'https://github.com/ashwani1122/stock-pred' }
                  ].map((project, idx) => (
                    <article key={idx} className="group relative bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-600 transition-colors">
                       {/* Hover Glow Effect */}
                      <div className="absolute -inset-px bg-gradient-to-r from-teal-500 to-fuchsia-500 rounded-xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
                      
                      <div className="relative">
                        {project.link ? (
                           <a href={project.link} target="_blank" rel="noreferrer" className="block overflow-hidden">
                             <img src={project.img} alt={project.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                           </a>
                        ) : (
                          <div className="block overflow-hidden">
                             <img src={project.img} alt={project.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
                          </div>
                        )}
                        
                        <div className="p-4 flex items-center justify-between bg-slate-900/90 backdrop-blur-sm border-t border-slate-800">
                          <span className="font-medium text-slate-200">{project.title}</span>
                          <a href={project.github} target="_blank" rel="noreferrer" className="px-4 py-1.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors">
                            Github
                          </a>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Contact */}
              <section id="contact" className="mx-auto w-[min(90%,800px)] mt-12 mb-12 flex flex-col items-center gap-6">
                <h2 className="text-2xl md:text-3xl font-semibold text-slate-100">Get in touch</h2>

                  <div className="w-full flex flex-col md:flex-row gap-8 md:items-start md:justify-center">

          {/* Contact Form Section */}
          <div className="flex-1">
            <ContactForm />
          </div>

          {/* Sidebar */}
          <aside
            className="
              w-full md:w-80 
              bg-slate-900/50 
              border border-slate-700/50 
              rounded-2xl 
              p-6 
              flex flex-col 
              gap-5 
              backdrop-blur-md 
            "
          >
            <h3 className="text-xl font-semibold text-slate-100 mb-1">
              Connect with me
            </h3>

            <p className="text-sm text-slate-400">
              I'm active on the following platforms — feel free to reach out!
            </p>

            <div className="flex flex-col gap-3 mt-2">
              {[
                { href: "https://github.com/ashwani1122", icon: <GitHubIcon fontSize="small" />, text: "GitHub" },
                { href: "https://x.com/243ashwani", icon: <XIcon fontSize="small" />, text: "Twitter" },
                { href: "https://www.linkedin.com/in/ashwani-singh-308081303/", icon: <LinkedInIcon fontSize="small" />, text: "LinkedIn" },
                { href: "https://www.instagram.com/ashwani123950", icon: <InstagramIcon fontSize="small" />, text: "Instagram" },
              ].map((link) => (
                <a
                  key={link.text}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    flex items-center gap-3 
                    px-4 py-3 
                    rounded-xl 
                    border border-slate-800 
                    bg-slate-800/20 
                    hover:bg-slate-800/60 
                    hover:border-slate-600 
                    transition-all 
                    duration-200 
                    group
                  "
                >
                  <span className="text-slate-400 group-hover:text-white transition">
                    {link.icon}
                  </span>
                  <span className="text-slate-300 group-hover:text-white transition text-sm">
                    {link.text}
                  </span>
                </a>
              ))}
            </div>

            {/* subtle bottom accent */}
            <div className="pt-4 mt-2 border-t border-slate-800/50">
              <p className="text-xs text-slate-500">
                Let's connect and build something great.
              </p>
            </div>
          </aside>
                    </div>


                <div
    className="
      w-full 
      bg-slate-900/50 
      border border-slate-800 
      rounded-2xl 
      p-8 
      mt-8 
      shadow-2xl 
      backdrop-blur-md 
      relative 
      overflow-hidden 
      group
    "
  >
    {/* subtle gradient highlight on hover */}
    <div 
      className="
        absolute inset-0 
        bg-gradient-to-br from-indigo-500/5 to-purple-500/5 
        opacity-0 
        group-hover:opacity-100 
        transition-opacity duration-500 
        pointer-events-none
      "
    />

    <h3 className="text-2xl font-semibold text-slate-100">
      Let’s build together
    </h3>

    <p className="mt-3 text-slate-400 leading-relaxed">
      I'm always excited to collaborate on meaningful projects — whether you're 
      exploring new ideas, need help bringing a product to life, or want a partner 
      for full-stack development. Let’s team up and create something impactful.
    </p>

    <ul className="mt-6 space-y-3">
      {[
        "Frontend Development",
        "Backend Development",
        "Full Stack Development",
        "Technical Consulting",
      ].map((item) => (
        <li 
          key={item}
          className="
            flex items-center gap-3 
            text-slate-300 
            bg-slate-800/20 
            px-4 py-2 
            rounded-xl 
            border border-slate-800/50 
            hover:bg-slate-800/40 
            hover:border-slate-600 
            transition-all 
            duration-200
          "
        >
          <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
          <span className="text-sm">{item}</span>
        </li>
      ))}
    </ul>

    <p className="mt-6 text-sm text-slate-500">
      Ready to start? My inbox is always open.
    </p>
  </div>

              </section>

              {/* Footer */}
              <footer className="w-full mt-4 border-t border-slate-800/50 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500 mb-8">
                <p>© 2025 Ashwani Singh. All rights reserved.</p>
                <div className="flex gap-4">
                  <span className="hover:text-slate-300 cursor-pointer transition-colors">Privacy Policy</span>
                  <span className="hover:text-slate-300 cursor-pointer transition-colors">Terms of Service</span>
                </div>
              </footer>
            </div>
          </div>
        </div>
        {/* --- SCROLLABLE CONTENT END --- */}
      </div>
    </>
  );
};

export default MovingBorderComplete;