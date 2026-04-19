import type { Metadata } from "next"
import { siteMetadata } from "./data"

export const baseUrl = siteMetadata.baseUrl

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    openGraph: {
      ...override.openGraph,
      title: override.openGraph?.title,
      description: override.description ?? undefined,
      url: override.openGraph?.url ?? createCanonical("/"),
      images: override.openGraph?.images,
      siteName: siteMetadata.name,
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
