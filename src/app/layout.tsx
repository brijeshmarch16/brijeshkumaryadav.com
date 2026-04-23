import type { Metadata } from "next"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { Geist, JetBrains_Mono } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { siteMetadata } from "@/lib/data"
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

  return createMetadata({
    title: siteMetadata.title,
    description: siteMetadata.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      images: [
        {
          url: `${siteMetadata.baseUrl}/og-preview.png`,
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
