// components/Experience.tsx
"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  CalendarDays,
  MapPin,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const experiences = [
  {
    company: "Hibiscustech",
    role: "Full Stack Product Engineer",
    duration: "may 2026 — Present",
    location: "Remote",
    description:
      "Built scalable UI systems, improved dashboard performance, developed Storybook design components, and optimized developer experience using Next.js, TypeScript, and TanStack Query.",
    skills: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "React Query",
      "Tailwind",
      "Storybook",
      "GO",
      "TanStack Query",
      "AWS",
    ],
    link: "https://hibiscustech.org/",
  },
  {
    company: "Nexo",
    role: "Full Stack Developer Freelancer",
    duration: "Aug 2025 — Dec 2025",
    location: "Remote",
    description:
      "Developed full-stack applications with modern architectures, authentication systems,Reatime Chatting Systems ,  APIs, and reusable UI patterns focused on scalability and performance.",
    skills: [
      "Node.js",
      "Supabase",
      "Typescript",
      "React",
      "Express",
      "JWT",
      "PostgreSQL",
    ],
    link: "#",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full py-28 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/3 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />

      <div className="absolute bottom-0 right-1/4 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
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
            <Sparkles size={14} />
            Career Journey
          </div>

          <h2 className="mt-6 text-5xl md:text-6xl font-black tracking-tight text-white">
            Experience
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            Building products, scaling systems, and crafting premium
            digital experiences through modern technologies.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative ml-4 border-l border-white/10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
              }}
              viewport={{ once: true }}
              className="relative mb-14 pl-10"
            >
              {/* Timeline Dot */}
              <div
                className="
                  absolute
                  -left-[13px]
                  top-6
                  h-6
                  w-6
                  rounded-full
                  border-4
                  border-[#020617]
                  bg-gradient-to-br
                  from-fuchsia-500
                  to-cyan-500
                  shadow-[0_0_25px_rgba(168,85,247,0.6)]
                "
              />

              {/* Card */}
              <div
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[32px]
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-6
                  md:p-8
                  backdrop-blur-2xl
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:border-white/20
                  hover:bg-white/[0.05]
                  hover:shadow-[0_20px_80px_rgba(0,0,0,0.45)]
                "
              >
                {/* Glow Overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                    bg-gradient-to-br
                    from-fuchsia-500/10
                    via-transparent
                    to-cyan-500/10
                  "
                />

                <div className="relative z-10">
                  {/* Top */}
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    {/* Left */}
                    <div>
                      <div className="flex items-center gap-2 text-slate-400">
                        <Briefcase size={16} />

                        <span className="text-sm tracking-wide">
                          Experience
                        </span>
                      </div>

                      <h3 className="mt-4 text-3xl font-bold tracking-tight text-white">
                        {exp.role}
                      </h3>

                      <p className="mt-2 text-lg text-slate-300">
                        {exp.company}
                      </p>
                    </div>

                    {/* Visit */}
                    <a
                      href={exp.link}
                      target="_blank"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        self-start
                        rounded-2xl
                        border
                        border-white/10
                        bg-white/[0.03]
                        px-5
                        py-3
                        text-sm
                        text-slate-300
                        transition-all
                        duration-300
                        hover:bg-white/[0.08]
                        hover:text-white
                      "
                    >
                      Visit
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  {/* Meta */}
                  <div className="mt-8 flex flex-wrap gap-4">
                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/10
                        bg-black/20
                        px-4
                        py-2
                        text-sm
                        text-slate-300
                      "
                    >
                      <CalendarDays size={15} />
                      {exp.duration}
                    </div>

                    <div
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-white/10
                        bg-black/20
                        px-4
                        py-2
                        text-sm
                        text-slate-300
                      "
                    >
                      <MapPin size={15} />
                      {exp.location}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-8 max-w-4xl leading-relaxed text-slate-400">
                    {exp.description}
                  </p>

                  {/* Skills */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="
                          rounded-full
                          border
                          border-white/10
                          bg-white/[0.03]
                          px-4
                          py-2
                          text-sm
                          text-slate-300
                          transition-all
                          duration-300
                          hover:border-fuchsia-500/30
                          hover:bg-fuchsia-500/10
                          hover:text-white
                        "
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}