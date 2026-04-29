export interface SiteMetadata {
  name: string
  title: string
  description: string
  url: string
}

export interface AboutMe {
  name: string
  bio: string
  role: string
}

export type SocialIcon = "email" | "github" | "linkedin" | "twitter"

export type TechStackIcon =
  | "nextjs"
  | "react"
  | "typescript"
  | "javascript"
  | "tailwind"
  | "shadcn"
  | "tanstack-query"
  | "git"
  | "nodejs"
  | "docker"
  | "chatgpt"
  | "claude"

export interface WorkExperience {
  title: string
  company: string
  period: string
  current: boolean
}

interface ProjectCardBase {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
}

export type LiveProjectCard = ProjectCardBase & {
  kind: "live"
  liveUrl: string
}

export type PreviewProjectCard = ProjectCardBase & {
  kind: "preview"
  imageUrl: string
}

export type SourceProjectCard = ProjectCardBase & {
  kind: "source"
  githubUrl: string
}

export type ProjectCard =
  | LiveProjectCard
  | PreviewProjectCard
  | SourceProjectCard

export interface SocialMedia {
  label: string
  href: string
  icon: SocialIcon
}

export interface TechStackItem {
  label: string
  href: string
  icon: TechStackIcon
}

export interface Portfolio {
  site: SiteMetadata
  about: AboutMe
  workExperience: WorkExperience[]
  projects: ProjectCard[]
  techStack: TechStackItem[]
  socialMedia: SocialMedia[]
}
