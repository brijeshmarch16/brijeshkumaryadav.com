export interface SiteMetadata {
  name: string
  title: string
  description: string
  baseUrl: URL
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

export interface Project {
  title: string
  description: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  /** Path to a screenshot/image, used when there is no public live URL */
  imageUrl?: string
}

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
