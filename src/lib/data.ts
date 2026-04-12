import type { AboutMe, Project, SiteMetadata, Skill, SocialMedia, WorkExperience } from "@/types";

function createBaseUrl(): URL {
  return process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL("https://brijeshkumaryadav.com/");
}

export const siteMetadata: SiteMetadata = {
  name: "Portfolio of Brijeshkumar Yadav",
  title: "Brijeshkumar Yadav",
  description: "Brijeshkumar Yadav – Frontend Engineer | React, Next.js & TypeScript",
  baseUrl: createBaseUrl(),
};

export const aboutMe: AboutMe = {
  name: "Brijeshkumar Yadav",
  bio: "I'm a freelance frontend engineer based in India. I build fast, pixel-perfect web apps and care deeply about **performance**, **clean code**, and **great user experience**. Outside client work, building open source **AI Interview** platform.",
  role: "Frontend Engineer",
  email: "brijeshkumaryadav2026@gmail.com",
};

export const skills: Skill[] = [
  { name: "Next.js", url: "https://nextjs.org" },
  { name: "React.js", url: "https://react.dev" },
  { name: "TypeScript", url: "https://www.typescriptlang.org" },
  { name: "Tailwind CSS", url: "https://tailwindcss.com" },
  { name: "shadcn/ui", url: "https://ui.shadcn.com" },
  { name: "Zustand", url: "https://zustand.docs.pmnd.rs" },
  { name: "TanStack Query", url: "https://tanstack.com/query" },
  { name: "Git", url: "https://git-scm.com" },
  { name: "Docker", url: "https://www.docker.com" },
  { name: "Claude", url: "https://claude.ai" },
];

export const workExperience: WorkExperience[] = [
  {
    title: "Frontend Engineer",
    company: "Freelance",
    period: "May 2023 - Present",
    current: true,
  },
  {
    title: "Full Stack Engineer",
    company: "SolGuruz®",
    period: "Mar 2022 - Apr 2023",
    current: false,
  },
  {
    title: "Frontend Engineer",
    company: "Emperor Brains",
    period: "May 2021 - Feb 2022",
    current: false,
  },
];

export const projects: Project[] = [
  {
    title: "AI Interview",
    description:
      "Open-source AI voice interview platform. Paste a job description, send candidates a link, and get back a full scorecard automatically.",
    techStack: ["Next.js", "Tailwind CSS", "shadcn/ui", "better-auth", "AI", "Voice AI"],
    githubUrl: "https://github.com/brijeshmarch16/ai-interview",
    liveUrl: "https://ai-interview.brijeshkumaryadav.com",
  },
  {
    title: "ReactUseKit",
    description: "React Hooks & Helpers Collection — copy, paste, or install with the shadcn CLI.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    githubUrl: "https://github.com/brijeshmarch16/reactusekit",
    liveUrl: "https://reactusekit.vercel.app",
  },
  // {
  //   title: "Demo Dashboard",
  //   description: "Internal analytics dashboard built for a fintech startup",
  //   techStack: ["React", "TypeScript", "Recharts", "Tailwind CSS"],
  //   imageUrl: "/projects/demo-dashboard.svg",
  // },
];

export const socialMedia: SocialMedia[] = [
  { label: "GitHub", href: "https://github.com/brijeshmarch16" },
  { label: "LinkedIn", href: "https://linkedin.com/in/brijeshmarch16" },
  { label: "X / Twitter", href: "https://x.com/brijeshmarch" },
];
