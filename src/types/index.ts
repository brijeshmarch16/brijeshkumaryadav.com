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
  email: string
}

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
}

export interface Skill {
  name: string
  url: string
}
