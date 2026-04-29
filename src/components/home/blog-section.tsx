import type { Route } from "next"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { BlogPostSummary } from "@/types/blog"

export function BlogSection({ posts }: { posts: BlogPostSummary[] }) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="flex flex-col gap-4 pt-8">
      <p className="text-sm font-medium text-muted-foreground uppercase">
        Blog
      </p>

      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link
              href={post.href as Route}
              className="block focus-visible:outline-none"
            >
              <Card className="transition-colors hover:bg-muted/40 focus-visible:ring-2 focus-visible:ring-ring">
                <CardHeader>
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>{post.summary}</CardDescription>
                  <CardAction className="text-muted-foreground transition-colors group-hover/card:text-foreground">
                    <ArrowRightIcon className="size-4" aria-hidden="true" />
                  </CardAction>
                </CardHeader>

                <div className="px-4 text-xs text-muted-foreground">
                  <time dateTime={post.publishedAt}>
                    {post.formattedPublishedAt}
                  </time>
                  <span aria-hidden="true"> / </span>
                  <span>{post.readingTime}</span>
                </div>
              </Card>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
