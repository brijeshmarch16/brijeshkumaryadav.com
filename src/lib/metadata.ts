import type { Metadata } from "next"
import type { MetadataRoute } from "next"
import type { BlogPostSummary } from "@/types/blog"
import { portfolio } from "./data"

function createBaseUrl(): URL {
  return process.env.NODE_ENV === "development"
    ? new URL("http://localhost:3000")
    : new URL(portfolio.site.url)
}

export const baseUrl = createBaseUrl()

type BlogPostJsonLd = {
  "@context": "https://schema.org"
  "@type": "BlogPosting"
  headline: string
  datePublished: string
  dateModified: string
  description: string
  image: string
  url: string
  author: {
    "@type": "Person"
    name: string
  }
}

function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      ...override.openGraph,
      title: override.openGraph?.title,
      description: override.description ?? undefined,
      url: override.openGraph?.url ?? createCanonical("/"),
      images: override.openGraph?.images,
      siteName: portfolio.site.name,
    },
    twitter: {
      ...override.twitter,
      card: "summary_large_image",
      creator: "@brijeshmarch", // cspell:ignore brijeshmarch
      title: override.twitter?.title ?? override.title ?? undefined,
      description: override.description ?? undefined,
      images: override.twitter?.images ?? override.openGraph?.images,
    },
    alternates: {
      ...override.alternates,
    },
  }
}

export function createCanonical(path: string): string {
  return new URL(path, baseUrl).toString()
}

function createOgImageUrl(title: string, description: string): string {
  return createCanonical(
    `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`
  )
}

export function createSiteMetadata(): Metadata {
  const canonicalUrl = createCanonical("/")
  const ogImageUrl = createOgImageUrl(
    portfolio.site.title,
    portfolio.site.description
  )

  return createMetadata({
    title: {
      default: portfolio.site.title,
      template: "%s - " + portfolio.about.name,
    },
    description: portfolio.site.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: portfolio.site.title,
        },
      ],
    },
  })
}

export function createBlogPostMetadata(post: BlogPostSummary): Metadata {
  const canonicalUrl = createCanonical(post.href)
  const ogImageUrl = createOgImageUrl(post.title, post.summary)

  return createMetadata({
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description: post.summary,
      publishedTime: post.publishedAt,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  })
}

export function createBlogPostJsonLd(post: BlogPostSummary): BlogPostJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    description: post.summary,
    image: createOgImageUrl(post.title, post.summary),
    url: createCanonical(post.href),
    author: {
      "@type": "Person",
      name: portfolio.about.name,
    },
  }
}

export function createRobots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: createCanonical("/sitemap.xml"),
  }
}

export function createSitemap(
  blogPosts: BlogPostSummary[]
): MetadataRoute.Sitemap {
  return [
    {
      url: createCanonical("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...blogPosts.map((post) => ({
      url: createCanonical(post.href),
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
