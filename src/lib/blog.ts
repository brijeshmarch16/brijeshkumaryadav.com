import fs from "fs"
import path from "path"
import type {
  BlogPost,
  BlogPostDetail,
  BlogPostMetadata,
  BlogPostSummary,
} from "@/types/blog"

const postsDirectory = path.join(process.cwd(), "src", "app", "blog", "posts")

function parseFrontmatter(fileContent: string): {
  metadata: BlogPostMetadata
  content: string
} {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)

  if (!match) {
    throw new Error("Blog posts must start with frontmatter metadata.")
  }

  const frontmatter = match[1]
  const content = fileContent.replace(frontmatterRegex, "").trim()
  const metadata: Partial<BlogPostMetadata> = {
    published: false,
  }

  for (const line of frontmatter.trim().split("\n")) {
    const [key, ...valueParts] = line.split(":")
    const value = valueParts.join(":").trim().replace(/^['"](.*)['"]$/, "$1")
    const metadataKey = key.trim()

    if (metadataKey === "published") {
      if (value !== "true" && value !== "false") {
        throw new Error(
          "Blog post frontmatter field `published` must be true or false."
        )
      }

      metadata.published = value === "true"
      continue
    }

    switch (metadataKey) {
      case "title":
      case "publishedAt":
      case "summary":
      case "readingTime":
      case "image":
        metadata[metadataKey] = value
        break
    }
  }

  return {
    metadata: metadata as BlogPostMetadata,
    content,
  }
}

function getPostFiles(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => path.extname(file) === ".mdx")
}

function readPost(fileName: string): BlogPost {
  const filePath = path.join(postsDirectory, fileName)
  const rawContent = fs.readFileSync(filePath, "utf-8")
  const { metadata, content } = parseFrontmatter(rawContent)
  const slug = path.basename(fileName, path.extname(fileName))

  return {
    slug,
    metadata,
    content,
  }
}

function getPublishedPosts(): BlogPost[] {
  return getPostFiles()
    .map(readPost)
    .filter((post) => post.metadata.published)
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
}

function toBlogPostSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    href: `/blog/${post.slug}`,
    title: post.metadata.title,
    summary: post.metadata.summary,
    publishedAt: post.metadata.publishedAt,
    formattedPublishedAt: formatPostDate(post.metadata.publishedAt),
    readingTime: post.metadata.readingTime,
    image: post.metadata.image,
  }
}

function toBlogPostDetail(post: BlogPost): BlogPostDetail {
  return {
    ...toBlogPostSummary(post),
    content: post.content,
  }
}

function formatPostDate(date: string): string {
  const dateWithTime = date.includes("T") ? date : `${date}T00:00:00`

  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateWithTime))
}

export function getPublishedBlogSummaries(): BlogPostSummary[] {
  return getPublishedPosts().map(toBlogPostSummary)
}

export function getPublishedBlogPost(slug: string): BlogPostDetail | undefined {
  const post = getPublishedPosts().find((post) => post.slug === slug)

  return post ? toBlogPostDetail(post) : undefined
}

export function getPublishedBlogStaticParams(): { slug: string }[] {
  return getPublishedPosts().map((post) => ({
    slug: post.slug,
  }))
}
