import { ExternalLink } from "lucide-react";

const experiences = [
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

export default function Experience() {
  return (
    <section id="experience" className="mb-24">
      <div className="flex items-center gap-3 mb-8">
        <span className="rounded-none border-2 border-black dark:border-white bg-[#ffe600] px-2 py-1 text-xs font-bold text-black">
          003
        </span>
        <span className="text-xs font-bold uppercase tracking-widest">Work_Experience</span>
        <span className="flex-1 h-[2px] bg-black dark:bg-white" />
      </div>

      <div className="flex flex-col gap-8">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="rounded-none border-2 border-black dark:border-white bg-white dark:bg-black p-5 shadow-[6px_6px_0px_0px_#000] dark:shadow-[6px_6px_0px_0px_#fff] hover:shadow-[2px_2px_0px_0px_#000] dark:hover:shadow-[2px_2px_0px_0px_#fff] hover:translate-x-[4px] hover:translate-y-[4px]"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3 border-b-2 border-black dark:border-white pb-3">
              <div>
                <h3 className="font-bold uppercase text-base">{exp.role}</h3>
                <p className="text-xs font-bold uppercase mt-1">
                  {exp.company} :: {exp.location}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-bold border-2 border-black dark:border-white px-2 py-0.5">{exp.duration}</span>
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold uppercase border-2 border-black dark:border-white px-2 py-0.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black active:translate-x-[2px] active:translate-y-[2px]"
                  >
                    Visit <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm leading-relaxed mb-4">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-none bg-[#ffe600] border border-black px-2 py-1 text-xs font-bold uppercase text-black"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
