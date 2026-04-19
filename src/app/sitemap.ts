import type { MetadataRoute } from "next"
import { createCanonical } from "@/lib/metadata"

export const revalidate = false

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const url = (path: string): string => createCanonical(path)

  return [
    {
      url: url("/"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
