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

      // remove old scanning lines
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
      {/* -- Custom keyframes & scanning line styles -- */}
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

        /* subtle gradient text glow */
        .glow-text { background: linear-gradient(135deg, rgba(192,38,211,0.9), rgba(34,211,238,0.85)); -webkit-background-clip: text; background-clip: text; color: transparent; background-size: 200% 200%; animation: glowPulse 3s ease-in-out infinite; }

        /* small responsive tweak for the moving border (keeps it crisp on mobile) */
        @media (max-width: 640px) { .moving-border { transition: all 0.4s ease; } }
      `}</style>

      <div className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl">
          {/* Nav */}
          <nav className="flex justify-center mb-8">
            <div className="flex items-center gap-6 px-4 py-2 rounded-full border border-slate-600 bg-gradient-to-r from-slate-800/60 via-slate-900/40 to-slate-800/40 backdrop-blur-sm">
              <a href="#home" className="text-sm font-medium hover:text-white">Home</a>
              <a href="#projects" className="text-sm font-medium hover:text-white">Projects</a>
              <a href="#contact" className="text-sm font-medium hover:text-white">Contact</a>
            </div>
          </nav>

          {/* Main profile card + moving border container */}
          <div ref={containerRef} className="relative flex flex-col gap-6" aria-live="polite">
            <div ref={borderRef} className="moving-border absolute pointer-events-none border border-slate-200 shadow-[0_0_40px_rgba(192,38,211,0.15)] rounded-lg overflow-hidden transition-[top_left_width_height] duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]" />

            <section className="mx-auto w-[min(90%,800px)] bg-slate-800/40 border border-slate-600 p-6 rounded-2xl flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Left: profile image + meta */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 w-full">
                <div className="flex-shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center mt-4">
                  {/* image scales responsively */}
                  <img
                    className="content-item  sm:w-32 md:w-40  object-cover rounded-md "
                    src={'../assets/profile.png'}
                    alt="Profile"
                  />
                </div>

                <div className="flex-1 flex flex-col text-left">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h1 className="content-item text-2xl sm:text-3xl md:text-4xl font-bold leading-tight glow-text">
                      Ashwani
                    </h1>
                    <span className="text-xs sm:text-sm text-emerald-400 font-medium">Available</span>
                  </div>

                  <p className="content-item mt-1 text-sm sm:text-base text-slate-300">Software Engineer</p>

                  <div className="content-item mt-3 flex items-center gap-2 text-sm text-slate-300 break-words">
                    <img className="w-5 h-5" src="https://img.icons8.com/color/48/000000/gmail.png" alt="email" />
                    <span className="select-all text-sm">ashwanisingh3846@gmail.com</span>
                  </div>
                </div>
              </div>

              {/* Right: social icons (stacked on small screens, inline on >=sm) */}
              <div className="flex w-full items-center justify-between sm:w-auto  gap-2 sm:gap-3 mt-2 sm:mt-0">
                {/* show as small pill buttons; they will wrap under on small screens */}
                <a
                  href="https://x.com/243ashwani"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-600 hover:bg-slate-700/40 text-sm"
                >
                  <XIcon />
                </a>

                <a
                  href="https://github.com/ashwani1122"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-600 hover:bg-slate-700/40 text-sm"
                >
                  <GitHubIcon />
                  <span className="hidden sm:inline">GitHub</span>
                </a>

              </div>
            </div>

            <p className="content-item text-center text-slate-300">
              Engineering end-to-end solutions with clean code and clear vision.
            </p>
          </section>


            {/* About + Skills */}
            <section className="mx-auto w-[min(90%,800px)] mt-8">
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">About Me</h2>
              <p className="text-slate-300 leading-relaxed text-justify hyphens-auto">Hey, I'm Ashwani, a Computer Science undergrad and full-stack developer who thrives on building and shipping solutions that truly matter. I could be an excellent fit if you seek a developer whose passion is inseparable from their craft. My approach is defined by deep product ownership—I don't just deliver to specification; I relentlessly refine, constantly seeking out opportunities to elevate the quality and user experience. If you’re looking for a developer who builds with heart, technical excellence, and an unwavering commitment to the final outcome, let’s talk.</p>

              <p className="text-slate-300 mt-4">If you've got an idea or want to collaborate on an exciting project, feel free to drop me a DM.</p>

              <div className="mt-8">
                <h3 className="text-xl font-medium mb-3">Skills</h3>
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
                    <div key={skill.name} className="flex items-center gap-2 rounded-lg border border-slate-600 px-3 py-2 bg-slate-800/30">
                      <img src={skill.icon} alt={`${skill.name} icon`} className="w-5 h-5" />
                      <span className="text-sm">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Projects */}
            <section id="projects" className="mx-auto w-[min(90%,800px)] mt-12">
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Projects</h2>

              <div className="flex flex-wrap gap-6 justify-center ">
                <article className="w-full  bg-slate-800/40 border border-slate-600 rounded-xl overflow-hidden">
                  <a href="https://nexo12.vercel.app/" target="_blank" rel="noreferrer">
                    <img src="../assets/nexo.png" alt="Nexo" className="w-full  object-cover" />
                  </a>
                  <div className="p-4 flex justify-center">
                    <a href="https://github.com/ashwani1122/second-life-marketplace" target="_blank" rel="noreferrer" className="w-full text-center py-2 rounded-lg bg-slate-900/60 hover:bg-slate-700">Github</a>
                  </div>
                </article>
                 <article className="w-full  bg-slate-800/40 border border-slate-600 rounded-xl overflow-hidden">
                  <a href="https://order-food-tz78.onrender.com/" target="_blank" rel="noreferrer">
                    <img src="../assets/delfood.png" alt="Delfood" className="w-full  object-cover" />
                  </a>
                  <div className="p-4 flex justify-center">
                    <a href="https://github.com/ashwani1122/Food-order/tree/main" target="_blank" rel="noreferrer" className="w-full text-center py-2 rounded-lg bg-slate-900/60 hover:bg-slate-700">Github</a>
                  </div>
                </article>
                <article className="w-full  bg-slate-800/40 border border-slate-600 rounded-xl overflow-hidden">
                  <img src="../assets/Depin.png" alt="Depin" className="w-full object-cover" />
                  <div className="p-4 flex justify-center">
                    <a href="https://github.com/ashwani1122/depin" target="_blank" rel="noreferrer" className="w-full text-center py-2 rounded-lg bg-slate-900/60 hover:bg-slate-700">Github</a>
                  </div>
                </article>

               

                <article className="w-full  bg-slate-800/40 border border-slate-600 rounded-xl overflow-hidden">
                  <a href="https://pay-online-lijb.vercel.app/" target="_blank" rel="noreferrer">
                    <img src="../assets/paytm.png" alt="Paytm" className="w-full  object-cover" />
                  </a>
                  <div className="p-4 flex justify-center">
                    <a href="https://github.com/ashwani1122/payOnline" target="_blank" rel="noreferrer" className="w-full text-center py-2 rounded-lg bg-slate-900/60 hover:bg-slate-700">Github</a>
                  </div>
                </article>

                <article className="w-full  bg-slate-800/40 border border-slate-600 rounded-xl overflow-hidden">
                  <a href="https://predstock.vercel.app/" target="_blank" rel="noreferrer">
                    <img src="../assets/predstock.png" alt="PredStock" className="w-full  object-cover" />
                  </a>
                  <div className="p-4 flex justify-center">
                    <a href="https://github.com/ashwani1122/stock-pred" target="_blank" rel="noreferrer" className="w-full text-center py-2 rounded-lg bg-slate-900/60 hover:bg-slate-700">Github</a>
                  </div>
                </article>

                
              </div>
            </section>

            {/* Contact */}
            <section id="contact" className="mx-auto w-[min(90%,800px)] mt-12 flex flex-col items-center gap-6">
              <h2 className="text-2xl md:text-3xl font-semibold">Get in touch</h2>

                  <div className="w-full flex flex-col md:flex-row gap-8 md:items-start md:justify-center">

        {/* Contact Form Section */}
        <div className="flex-1">
          <ContactForm />
        </div>

        {/* Sidebar */}
        <aside
          className="
            w-full md:w-80 
            bg-slate-800/50 
            border border-slate-700 
            rounded-2xl 
            p-6 
            flex flex-col 
            gap-5 
            shadow-lg 
            backdrop-blur-md 
            transition 
            duration-300
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
              { href: "https://github.com/ashwani1122", icon: <GitHubIcon />, text: "GitHub" },
              { href: "https://x.com/243ashwani", icon: <XIcon />, text: "Twitter" },
              { href: "https://www.linkedin.com/in/ashwani-singh-308081303/", icon: <LinkedInIcon />, text: "LinkedIn" },
              { href: "https://www.instagram.com/ashwani123950", icon: <InstagramIcon />, text: "Instagram" },
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
                  border border-slate-700 
                  bg-slate-700/20 
                  hover:bg-slate-700/40 
                  hover:border-slate-500 
                  transition-all 
                  duration-200 
                  group
                "
              >
                <span className="text-slate-200 group-hover:text-white transition">
                  {link.icon}
                </span>
                <span className="text-slate-300 group-hover:text-white transition">
                  {link.text}
                </span>
              </a>
            ))}
          </div>

          {/* subtle bottom accent */}
          <div className="pt-4 mt-2 border-t border-slate-700">
            <p className="text-xs text-slate-500">
              Let's connect and build something great.
            </p>
          </div>
        </aside>
                  </div>


              <div className="w-full bg-slate-800/40 border border-slate-600 rounded-xl p-6 mt-8">
                <h3 className="text-xl font-medium">Let's build together</h3>
                <p className="mt-2 text-slate-300">I'm always interested in discussing new opportunities, innovative projects, and potential collaborations in the full stack development space. If you're interested in working together, feel free to reach out to me.</p>

                <ul className="mt-4 list-disc list-inside text-slate-300">
                  <li>Frontend Development</li>
                  <li>Backend Development</li>
                  <li>Full Stack Development</li>
                  <li>Technical Consulting</li>
                </ul>
              </div>
            </section>

            {/* Footer */}
            <footer className="w-full mt-12 border-t border-slate-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
              <p>© 2025 Ashwani Singh. All rights reserved.</p>
              <div className="flex gap-4">
                <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                <span className="hover:text-white cursor-pointer">Terms of Service</span>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovingBorderComplete;
