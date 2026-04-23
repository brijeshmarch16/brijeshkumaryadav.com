import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Script from "next/script"
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon } from "lucide-react"
import { MdxContent } from "@/components/blog/mdx-content"
import { Button } from "@/components/ui/button"
import { formatPostDate, getBlogPost, getBlogPosts } from "@/lib/blog"
import { createCanonical, createMetadata } from "@/lib/metadata"

type BlogDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return {}
  }

  const canonicalUrl = createCanonical(`/blog/${post.slug}`)
  const ogImageUrl = createCanonical(
    `/og?title=${encodeURIComponent(post.metadata.title)}&description=${encodeURIComponent(post.metadata.summary)}`
  )

  return createMetadata({
    title: post.metadata.title,
    description: post.metadata.summary,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.metadata.title,
      description: post.metadata.summary,
      publishedTime: post.metadata.publishedAt,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.metadata.title,
        },
      ],
    },
  })
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  const postUrl = createCanonical(`/blog/${post.slug}`)
  const ogImageUrl = createCanonical(
    `/og?title=${encodeURIComponent(post.metadata.title)}&description=${encodeURIComponent(post.metadata.summary)}`
  )

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <Script
        id={`blog-post-json-ld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: ogImageUrl,
            url: postUrl,
            author: {
              "@type": "Person",
              name: "Brijeshkumar Yadav",
            },
          }),
        }}
      />

      <div className="mb-8">
        <Button variant="outline" size="sm" asChild>
          <Link href="/">
            <ArrowLeftIcon data-icon="inline-start" />
            Back home
          </Link>
        </Button>
      </div>

      <section>
        <header className="mb-8 flex flex-col gap-3">
          <h1 className="font-heading text-sm font-medium tracking-tight text-balance text-foreground">
            {post.metadata.title}
          </h1>

          <p className="max-w-2xl text-xs/relaxed text-muted-foreground">
            {post.metadata.summary}
          </p>

          <div className="flex flex-wrap gap-3 text-xs/relaxed text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDaysIcon className="size-3.5" aria-hidden="true" />
              <time dateTime={post.metadata.publishedAt}>
                {formatPostDate(post.metadata.publishedAt)}
              </time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="size-3.5" aria-hidden="true" />
              {post.metadata.readingTime}
            </span>
          </div>
        </header>

        <article className="mdx-content">
          <MdxContent source={post.content} />
        </article>
      </section>
    </main>
  )
}
