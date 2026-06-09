import { motion } from "framer-motion";
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
      <p className="text-xs font-semibold uppercase tracking-widest text-[#bbb] dark:text-[#555] mb-8">
        Work Experience
      </p>

      <div className="flex flex-col gap-5">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="rounded-xl border border-[#e5e5e5] dark:border-[#1f1f1f] bg-[#fafafa] dark:bg-[#0f0f0f] p-5 hover:border-[#ccc] dark:hover:border-[#2e2e2e] transition-colors duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
              <div>
                <h3 className="font-semibold text-[#111] dark:text-white text-base">{exp.role}</h3>
                <p className="text-sm text-[#777] dark:text-[#777] mt-0.5">
                  {exp.company} · {exp.location}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-[#aaa] dark:text-[#555]">{exp.duration}</span>
                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#888] dark:text-[#777] hover:text-[#111] dark:hover:text-white transition-colors"
                  >
                    Visit <ExternalLink size={11} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-[#666] dark:text-[#888] leading-relaxed mb-4">
              {exp.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {exp.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md bg-[#ebebeb] dark:bg-[#161616] border border-[#e0e0e0] dark:border-[#1f1f1f] px-2 py-1 text-xs text-[#777] dark:text-[#777]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
