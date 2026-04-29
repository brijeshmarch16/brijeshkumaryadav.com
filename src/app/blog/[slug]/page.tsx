import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import Script from "next/script"
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon } from "lucide-react"
import { MdxContent } from "@/components/blog/mdx-content"
import { Button } from "@/components/ui/button"
import {
  getPublishedBlogPost,
  getPublishedBlogStaticParams,
} from "@/lib/blog"
import {
  createBlogPostJsonLd,
  createBlogPostMetadata,
} from "@/lib/metadata"

type BlogDetailPageProps = {
  params: Promise<{
    slug: string
  }>
}

export function generateStaticParams() {
  return getPublishedBlogStaticParams()
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPublishedBlogPost(slug)

  if (!post) {
    return {}
  }

  return createBlogPostMetadata(post)
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = getPublishedBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <Script
        id={`blog-post-json-ld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createBlogPostJsonLd(post)),
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
            {post.title}
          </h1>

          <p className="max-w-2xl text-xs/relaxed text-muted-foreground">
            {post.summary}
          </p>

          <div className="flex flex-wrap gap-3 text-xs/relaxed text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDaysIcon className="size-3.5" aria-hidden="true" />
              <time dateTime={post.publishedAt}>{post.formattedPublishedAt}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="size-3.5" aria-hidden="true" />
              {post.readingTime}
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
