import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { MailIcon } from "lucide-react"
import { GithubDark } from "@/components/ui/svgs/githubDark"
import { GithubLight } from "@/components/ui/svgs/githubLight"
import { Linkedin } from "@/components/ui/svgs/linkedin"
import { X } from "@/components/ui/svgs/x"
import { XDark } from "@/components/ui/svgs/xDark"
import type { AboutMe, SocialIcon, SocialMedia } from "@/types"

function SocialIconGraphic({ icon }: { icon: SocialIcon }) {
  switch (icon) {
    case "email":
      return <MailIcon data-icon="inline-start" className="size-4.5" />
    case "github":
      return (
        <>
          <GithubLight
            data-icon="inline-start"
            className="size-4 dark:hidden"
          />
          <GithubDark
            data-icon="inline-start"
            className="hidden size-4 dark:block"
          />
        </>
      )
    case "linkedin":
      return <Linkedin data-icon="inline-start" className="size-4" />
    case "twitter":
      return (
        <>
          <X data-icon="inline-start" className="size-3.5 dark:hidden" />
          <XDark
            data-icon="inline-start"
            className="hidden size-3.5 dark:block"
          />
        </>
      )
  }
}

export function IntroSection({
  aboutMe,
  socialMedia,
}: {
  aboutMe: AboutMe
  socialMedia: SocialMedia[]
}) {
  return (
    <header className="flex flex-col gap-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-base">{aboutMe.name}</h1>
          <p className="text-sm text-muted-foreground">{aboutMe.role}</p>
        </div>
        <div className="flex items-center gap-1">
          {socialMedia.map(({ label, href, icon }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon-sm"
              asChild
              className="text-muted-foreground hover:text-foreground"
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                <SocialIconGraphic icon={icon} />
                <span className="sr-only">{label}</span>
              </a>
            </Button>
          ))}
          <ThemeToggle />
        </div>
      </div>

      <p className="text-sm leading-6 text-muted-foreground">{aboutMe.bio}</p>
    </header>
  )
}
