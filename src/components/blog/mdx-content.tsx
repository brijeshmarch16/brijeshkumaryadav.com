import type { ComponentPropsWithoutRef, ReactNode } from "react"
import type { Route } from "next"
import Image from "next/image"
import Link from "next/link"
import { MDXRemote } from "next-mdx-remote/rsc"
import { highlight } from "sugar-high"

function MdxLink({
  href = "",
  ...props
}: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return <Link href={href as Route} {...props} />
  }

  if (href.startsWith("#")) {
    return <a href={href} {...props} />
  }

  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
}

function MdxImage({
  alt = "",
  ...props
}: ComponentPropsWithoutRef<typeof Image>) {
  return <Image alt={alt} className="rounded-none border" {...props} />
}

function MdxCode({ children, ...props }: ComponentPropsWithoutRef<"code">) {
  if (typeof children !== "string") {
    return <code {...props}>{children}</code>
  }

  return (
    <code
      dangerouslySetInnerHTML={{ __html: highlight(children) }}
      {...props}
    />
  )
}

function createHeading(level: 2 | 3 | 4) {
  function Heading({ children }: { children: ReactNode }) {
    const slug = String(children)
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")

    const Tag = `h${level}` as const

    return (
      <Tag id={slug}>
        <a href={`#${slug}`} className="anchor" aria-label="Link to section" />
        {children}
      </Tag>
    )
  }

  Heading.displayName = `Heading${level}`

  return Heading
}

const components = {
  a: MdxLink,
  code: MdxCode,
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  Image: MdxImage,
}

export function MdxContent({ source }: { source: string }) {
  return <MDXRemote source={source} components={components} />
}
