import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Geist, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { aboutMe, siteMetadata } from "@/lib/data"
import { createCanonical, createMetadata } from "@/lib/metadata"
import { cn } from "@/lib/utils"

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export async function generateMetadata(): Promise<Metadata> {
  const canonicalUrl = createCanonical("/")
  const ogImageUrl = createCanonical(
    `/og?title=${encodeURIComponent(siteMetadata.title)}&description=${encodeURIComponent(siteMetadata.description)}`
  )

  return createMetadata({
    title: {
      default: siteMetadata.title,
      template: "%s - " + aboutMe.name,
    },
    description: siteMetadata.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: siteMetadata.title,
        },
      ],
    },
  })
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "font-mono antialiased",
        fontSans.variable,
        jetbrainsMono.variable
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
