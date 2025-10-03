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

const MovingBorderComplete = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
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
        top: elementRect.top - containerRect.top - 4,
        left: elementRect.left - containerRect.left - 4,
        width: elementRect.width + 8,
        height: elementRect.height + 8,
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

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'hsl(220, 15%, 5%)',
      color: 'hsl(220, 5%, 95%)',
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
    },
    navBar: {
      display: 'flex',
      width: '100%',
      paddingTop: '1rem',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'hsl(220, 15%, 5%)',
    },
    wrapper: {
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
    },
    contentContainer: {
      position: 'relative' as const,
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem',
    },
    movingBorder: {
      position: 'absolute' as const,
      pointerEvents: 'none' as const,
      border: '1px solid hsla(0, 0%, 100%, 1.00)',
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: '0 0 40px hsl(280, 100%, 70% / 0.3)',
      zIndex: 10,
      overflow: 'hidden' as const,
    },
    contentItem: {
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      borderRadius: '0.75rem',
      cursor: 'pointer',
    },
    title: {
      background: 'linear-gradient(135deg, hsl(280, 100%, 70% / 0.8), hsl(190, 100%, 60% / 0.6))',
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      backgroundSize: '200% 200%',
      animation: 'glowPulse 3s ease-in-out infinite',
      fontSize: 'clamp(1.5rem, 5vw, 2rem)',
      fontWeight: 'bold',
      marginBottom: '1rem',
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 'clamp(150px, 30vw, 200px)',
    },
    infoSection: {
      marginTop: '3rem',
      textAlign: 'center' as const,
    },
    infoTitle: {
      fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
      fontWeight: '600',
      marginBottom: '1rem',
      color: 'hsla(280, 19%, 22%, 1.00)',
    },
    infoText: {
      color: 'hsl(220, 5%, 65%)',
      maxWidth: 'clamp(300px, 80vw, 512px)',
      margin: '0 auto',
      lineHeight: '1.6',
      fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
    },
  };

  return (
    <>
      <style>
        {`
          @keyframes glowPulse {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes scanHorizontal {
            0% { left: -10px; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { left: 100%; opacity: 0; }
          }

          @keyframes scanVertical {
            0% { top: -10px; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
          }
          .grid-background {
            background-color: #b30a0aff;
            background-image: 
              linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 50px 50px;
            background-attachment: fixed;
          }
          .scanning-line-vertical {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 2px;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              hsl(280, 100%, 70% / 0.8) 50%,
              transparent 100%
            );
            box-shadow: 0 0 20px hsl(280, 100%, 70% / 0.6);
            animation: scanHorizontal 2s ease-in-out;
            z-index: 11;
          }

          .scanning-line-horizontal {
            position: absolute;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(
              to right,
              transparent 0%,
              hsl(190, 100%, 60% / 0.8) 50%,
              transparent 100%
            );
            box-shadow: 0 0 20px hsl(190, 100%, 60% / 0.6);
            animation: scanVertical 2s ease-in-out 0.3s;
            z-index: 11;
          }

          .content-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 0 40px hsl(280, 100%, 70% / 0.3);
          }

          button:hover {
            background: hsla(0, 0%, 100%, 1.00) !important;
            transform: translateY(-1px);
            box-shadow: 0 0 30px hsl(280, 100%, 70% / 0.4);
          }

          /* Responsive Styles */
          @media (max-width: 768px) {
            .nav-bar > div {
              width: 60%;
              flex-direction: column;
              gap: 0.5rem;
              padding: 0.5rem;
            }

            .content-container > div {
              width: 90%;
              flex-direction: column;
              alignItems: center;
            }

            .content-container > div > div:first-child {
              flex-direction: column;
              alignItems: center;
              text-align: center;
            }

            .content-container > div > div:last-child {
              margin-top: 1rem;
            }

            .skills-grid {
              grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
              gap: 0.5rem;
            }

            .projects-grid {
              flex-direction: column;
              gap: 1rem;
            }
              .depin{
                background-color:"red"
              }

            .contact-section > div {
              display: flex;
              flex-direction: column;
              align-items: center;
              flex-wrap: wrap;
            }

            .contact-section > div > div:last-child {
              width: 100%;
              max-width: 400px;
            }
          }

          @media (max-width: 480px) {
            .card {
              width: 100px !important;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            }

            .title {
              font-size: 1.2rem !important;
            }

            .info-text {
              font-size: 0.8rem !important;
            }

            .skills-grid > span {
              height: 25px;
              padding-inline: 0.3rem;
            }

            .skills-grid > span > img {
              width: 16px;
            }

            .skills-grid > span > p {
              font-size: 0.8rem;
            }
          }
        `}
      </style>
      <span className="nav-bar" style={styles.navBar}>
        <div style={{
          marginTop: 'clamp(2rem, 10vw, 8rem)',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          width: 'clamp(200px, 50%, 400px)',
          border: '1px solid gray',
          borderRadius: '40px',
          padding: '0.4rem',
          color: 'white',
          backgroundColor: "oklch(39.8% 0.195 277.366)"
        }}>
          <span style={{ cursor: 'pointer' }}><a href="#home">Home</a></span>
          <span><a href="#projects">Projects</a></span>
          <span><a href="#contact">Contact</a></span>
        </div>
      </span>
      <div id="home" style={styles.container} className="grid-background">
        <div style={styles.wrapper}>
          <div ref={containerRef} style={styles.contentContainer} className="content-container">
            <div ref={borderRef} style={styles.movingBorder} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: 'min(90%, 800px)',
              margin: '0 auto',
              border: '1px solid white',
              padding: 'clamp(10px, 3vw, 20px)',
              borderRadius: '10px',
              flexDirection: 'column' as const,
              gap: '1.5rem',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' as const }}>
                <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center', gap: '1rem', flexWrap: 'wrap' as const }}>
                  <div style={styles.card} className="card">
                    <img
                      className="content-item"
                      style={{ width: '70%', height: 'auto', borderRadius: '5px' }}
                      src={'../assets/profile.png'}
                      alt="Profile"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'start', gap: '0.2rem', lineHeight: '1.2' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <h1 className="content-item" style={{ margin: 0, fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontFamily: "'Poppins', sans-serif", padding: '0.5rem' }}>
                        Ashwani
                      </h1>
                      <p style={{ margin: 0, fontSize: 'clamp(0.7rem, 2vw, 0.9rem)', color: 'lightgreen' }}>
                        Available
                      </p>
                    </div>
                    <p className="content-item" style={{ margin: 0, fontSize: 'clamp(0.8rem, 2.5vw, 1rem)', padding: '0.5rem' }}>
                      Software Engineer
                    </p>
                    <div className="content-item" style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                      <img style={{ width: '18px', height: '18px' }} src="https://img.icons8.com/color/48/000000/gmail.png" alt="email icon" />
                      <p style={{ margin: 0, fontSize: 'clamp(0.8rem, 2.5vw, 1rem)' }}>
                        ashwanisingh3846@gmail.com
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content-item" style={{ display: 'flex', gap: '0.8rem', width: '80px', height: '30px', padding: '0.3rem', alignItems: 'center', justifyContent: 'center' }}>
                  <a href="https://x.com/243ashwani"><XIcon /></a>
                  <a href="https://github.com/ashwani1122"><GitHubIcon /></a>
                </div>
              </div>
              <p className="content-item" style={{ marginTop: '1rem', fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', textAlign: 'center', color: 'lightgray', fontFamily: 'sans-serif', padding: '0.5rem' }}>
                Engineering end-to-end solutions with clean code and clear vision.
              </p>
            </div>
          </div>
          <div style={{ width: 'min(90%, 800px)', margin: '0 auto', padding: '1rem' }}>
            <div>
              <h1 style={{ fontFamily: 'sans-serif', fontSize: 'clamp(1.5rem, 5vw, 2rem)', marginTop: '4rem' }}>
                About Me
              </h1>
              <p style={{ fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', lineHeight: '1.5', fontFamily: 'sans-serif' }}>
                Hey, I'm Ashwani, a Computer Science undergrad and full-stack developer who thrives on building and shipping solutions that truly matter. I work primarily with React.js, Next.js, and Node.js, using TypeScript to craft robust applications on both the frontend and backend.
              </p>
              <p style={{ fontSize: 'clamp(0.9rem, 3vw, 1.2rem)', lineHeight: '1.5', fontFamily: 'sans-serif' }}>
                If you've got an idea or want to collaborate on an exciting project, feel free to drop me a DM.
              </p>
            </div>
            <div style={{ marginTop: '4rem' }}>
              <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>Skills</h1>
              <div className="skills-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '1rem',
                marginTop: '1rem',
              }}>
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
                ].map(skill => (
                  <span key={skill.name} style={{
                    display: 'flex',
                    gap: '0.3rem',
                    alignItems: 'center',
                    fontFamily: 'sans-serif',
                    border: '1px solid white',
                    height: '30px',
                    paddingInline: '0.5rem',
                    borderRadius: '10px',
                  }}>
                    <img src={skill.icon} width="20" alt={`${skill.name} icon`} />
                    <p>{skill.name}</p>
                  </span>
                ))}
              </div>
            </div>
            <div id="projects" style={{ marginTop: '10rem', gap: "1rem" }}>
              <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>Projects</h1>
              <div className="projects-grid" style={{display:"flex" ,gap:"1rem",flexWrap:"wrap",justifyContent:"center",flex:"1 1 clamp(250px, 45%, 400px)"}}>
                <div className='depin' style={{ border: '1px solid white', borderRadius: '10px', padding: '5px', flex: '1 1 clamp(250px, 45%, 400px)' }}>
                 
                  <img style={{ borderRadius: '10px', width: '100%', height: 'auto' }} src="../assets/Depin.png" alt="Depin" />
                  <a href="https://github.com/ashwani1122/depin" target="_blank">
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexDirection: "row" ,backgroundColor:'#0f172a',padding: '1rem',borderRadius: '10px',width: 'min(100%, 500px)',marginTop:'1rem'}}>
                     Github
                  </div>
                  </a>
                </div>
                <div style={{ border: '1px solid white', borderRadius: '10px', padding: '5px', flex: '1 1 clamp(250px, 45%, 400px)' }}>
                  <a href="https://order-food-tz78.onrender.com/" target="_blank">
                  <img style={{ borderRadius: '10px', width: '100%', height: 'auto' }} src="../assets/delfood.png" alt="Delfood" />
                  </a>
                  <a href="https://github.com/ashwani1122/Food-order/tree/main" target="_blank">
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexDirection: "row" ,backgroundColor:'#0f172a',padding: '1rem',borderRadius: '10px',width: 'min(100%, 500px)'}}>
                    Github
                  </div>
                  </a>
                </div>
                <div style={{display:"flex" ,gap:"1rem",flexWrap:"wrap",justifyContent:"center",flex:"1 1 clamp(250px, 45%, 400px)"}}>
                <div style={{ border: '1px solid white', borderRadius: '10px', padding: '5px',display:'flex',flexDirection:'column',gap:'1rem'}}>
                  <a href="https://pay-online-lijb.vercel.app/" target="_blank">
                  <img style={{ borderRadius: '10px', width: '100%', height: 'auto' }} src="../assets/paytm.png" alt="Paytm" />
                  
                  </a>
                   <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' ,backgroundColor:'#0f172a',padding: '1rem',borderRadius: '10px'}}>
                    <a href="https://github.com/ashwani1122/payOnline" target="_blank">Github</a>
                  </div>
                </div>
                <a href="https://predstock.vercel.app/" target="_blank">
                <div style={{ border: '1px solid white', borderRadius: '10px', padding: '5px',display:'flex',flexDirection:'column',gap:'1rem'}}>
                  <img style={{ borderRadius: '10px', width: '100%', height: 'auto' }} src="../assets/predstock.png" alt="Paytm" />
                  
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexDirection: "row" ,backgroundColor:'#0f172a',padding: '1rem',borderRadius: '10px'}}>
                    <a href="https://github.com/ashwani1122/stock-pred" target="_blank">Github</a>
                  </div>
                </div>
                </a>
                
              </div>
              </div>
            </div>
            <div id="contact" className="contact-section" style={{
              marginTop: '10rem',
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column' as const,
              gap: '1rem',
              fontFamily: 'sans-serif',
            }}>
              <h1 style={{ marginTop: '1rem', fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>Get in touch</h1>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexDirection: "row" }}>
                <div><ContactForm /></div>
                <div style={{
                  backgroundColor: '#0f172a',
                  padding: '1rem',
                  gap: '1rem',
                  display: 'flex',
                  flexDirection: 'column' as const,
                  borderRadius: '10px',
                  width: 'min(100%, 500px)',
                }}>
                  <h1 style={{ width: '100%', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>Connect with me</h1>
                  {[
                    { href: 'https://github.com/ashwani1122', icon: <GitHubIcon />, text: 'GitHub' },
                    { href: 'https://x.com/243ashwani', icon: <XIcon />, text: 'Twitter' },
                    { href: 'https://www.linkedin.com/in/ashwani-singh-308081303/', icon: <LinkedInIcon />, text: 'LinkedIn' },
                    { href: 'https://www.instagram.com/ashwani123950', icon: <InstagramIcon />, text: 'Instagram' },
                  ].map(link => (
                    <a key={link.text} href={link.href} target="_blank" rel="noopener noreferrer">
                      <div style={{ display: 'flex', gap: '1rem', border: '1px solid white', padding: '0.5rem', borderRadius: '10px' }}>
                        {link.icon}
                        {link.text}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div style={{
                backgroundColor: '#0f172a',
                padding: '2rem',
                gap: '1rem',
                display: 'flex',
                flexDirection: 'column' as const,
                borderRadius: '10px',
                marginTop: '10rem',
              }}>
                <h1 style={{ fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', }}>Let's build together</h1>
                <p style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1rem)' }}>
                  I'm always interested in discussing new opportunities, innovative projects, and potential collaborations in the full stack development space. If you're interested in working together, feel free to reach out to me.
                </p>
                <ul style={{ fontSize: 'clamp(0.8rem, 2.5vw, 1rem)' }}>
                  <li>Frontend Development</li>
                  <li>Backend Development</li>
                  <li>Full Stack Development</li>
                  <li>Technical Consulting</li>
                </ul>
              </div>
            </div>
          </div>
          <hr style={{ width: '100%', marginTop: "14rem" }} />
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'space-evenly',
            marginTop: '1rem',
            padding: '1rem',
            fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
            flexWrap: 'wrap' as const,
          }}>
            <p>© 2025 Ashwani Singh. All rights reserved.</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
              <p>Privacy Policy</p>
              <p>Terms of Service</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovingBorderComplete;