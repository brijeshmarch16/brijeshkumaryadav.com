import type { MetadataRoute } from "next"
import { createCanonical } from "@/lib/metadata"

export default function robots(): MetadataRoute.Robots {
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
