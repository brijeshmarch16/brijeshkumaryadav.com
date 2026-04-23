import type { MetadataRoute } from "next"
import { getBlogPosts } from "@/lib/blog"
import { createCanonical } from "@/lib/metadata"

export const revalidate = false

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => createCanonical(path)
  const blogPosts = getBlogPosts()

  return [
    {
      url: url("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...blogPosts.map((post) => ({
      url: url(`/blog/${post.slug}`),
      lastModified: post.metadata.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ]
}
