export type BlogPostMetadata = {
  title: string
  published: boolean
  publishedAt: string
  summary: string
  readingTime: string
  image?: string
}

export type BlogPost = {
  slug: string
  metadata: BlogPostMetadata
  content: string
}

export type BlogPostSummary = {
  slug: string
  href: `/blog/${string}`
  title: string
  summary: string
  publishedAt: string
  formattedPublishedAt: string
  readingTime: string
  image?: string
}

export type BlogPostDetail = BlogPostSummary & {
  content: string
}
