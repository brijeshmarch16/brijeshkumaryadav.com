import { Button } from "@/components/ui/button"
import { ClaudeAiIcon } from "@/components/ui/svgs/claudeAiIcon"
import { Docker } from "@/components/ui/svgs/docker"
import { Git } from "@/components/ui/svgs/git"
import { Javascript } from "@/components/ui/svgs/javascript"
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark"
import { Nodejs } from "@/components/ui/svgs/nodejs"
import { Openai } from "@/components/ui/svgs/openai"
import { OpenaiDark } from "@/components/ui/svgs/openaiDark"
import { ReactDark } from "@/components/ui/svgs/reactDark"
import { ReactLight } from "@/components/ui/svgs/reactLight"
import { Reactquery } from "@/components/ui/svgs/reactquery"
import { ShadcnUi } from "@/components/ui/svgs/shadcnUi"
import { ShadcnUiDark } from "@/components/ui/svgs/shadcnUiDark"
import { Tailwindcss } from "@/components/ui/svgs/tailwindcss"
import { Typescript } from "@/components/ui/svgs/typescript"
import type { TechStackIcon, TechStackItem } from "@/types"

function TechStackIconGraphic({ icon }: { icon: TechStackIcon }) {
  switch (icon) {
    case "nextjs":
      return <NextjsIconDark aria-hidden className="size-5" />
    case "react":
      return (
        <>
          <ReactLight aria-hidden className="size-5 dark:hidden" />
          <ReactDark aria-hidden className="hidden size-5 dark:block" />
        </>
      )
    case "typescript":
      return <Typescript aria-hidden className="size-5" />
    case "javascript":
      return <Javascript aria-hidden className="size-5" />
    case "tailwind":
      return <Tailwindcss aria-hidden className="size-5" />
    case "shadcn":
      return (
        <>
          <ShadcnUi aria-hidden className="size-5 dark:hidden" />
          <ShadcnUiDark aria-hidden className="hidden size-5 dark:block" />
        </>
      )
    case "tanstack-query":
      return <Reactquery aria-hidden className="size-5" />
    case "git":
      return <Git aria-hidden className="size-5" />
    case "nodejs":
      return <Nodejs aria-hidden className="size-5" />
    case "docker":
      return <Docker aria-hidden className="size-5" />
    case "chatgpt":
      return (
        <>
          <Openai aria-hidden className="size-5 dark:hidden" />
          <OpenaiDark aria-hidden className="hidden size-5 dark:block" />
        </>
      )
    case "claude":
      return <ClaudeAiIcon aria-hidden className="size-5" />
  }
}

export function TechStackSection({ items }: { items: TechStackItem[] }) {
  return (
    <section className="flex flex-col gap-4 pt-8">
      <p className="text-sm font-medium text-muted-foreground uppercase">
        Tech Stack
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map(({ label, href, icon }) => (
          <Button
            key={label}
            variant="outline"
            size="sm"
            asChild
            className="text-foreground"
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              <TechStackIconGraphic icon={icon} />
              {label}
            </a>
          </Button>
        ))}
      </div>
    </section>
  )
}
