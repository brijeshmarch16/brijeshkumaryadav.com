import { ProjectItem } from "@/components/project-item"
import { TechStackSection } from "@/components/tech-stack-section"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GithubDark } from "@/components/ui/svgs/githubDark"
import { GithubLight } from "@/components/ui/svgs/githubLight"
import { Linkedin } from "@/components/ui/svgs/linkedin"
import { X } from "@/components/ui/svgs/x"
import { XDark } from "@/components/ui/svgs/xDark"
import {
  aboutMe,
  projects,
  socialMedia,
  techStack,
  workExperience,
} from "@/lib/data"
import type { SocialIcon } from "@/types"

function SocialIconGraphic({ icon }: { icon: SocialIcon }) {
  switch (icon) {
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

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
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

      <section className="flex flex-col gap-4 pt-8">
        <p className="text-sm font-medium text-muted-foreground uppercase">
          Projects
        </p>
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <ProjectItem key={project.title} project={project} />
          ))}
        </div>
      </section>

      <TechStackSection items={techStack} />

      <section className="flex flex-col gap-4 pt-8">
        <p className="text-sm font-medium text-muted-foreground uppercase">
          Experience
        </p>
        <ul className="flex flex-col gap-3 sm:gap-4">
          {workExperience.map((job) => (
            <li key={`${job.company}-${job.period}`}>
              <Card size="sm">
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <div className="row-span-2 row-start-1 flex items-center justify-between gap-3 sm:col-start-2 sm:flex-col sm:items-end">
                    <CardDescription className="uppercase">
                      {job.period}
                    </CardDescription>
                    {job.current ? (
                      <Badge variant="secondary">Current</Badge>
                    ) : null}
                  </div>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <footer className="mt-8 gap-3 border-t pt-4 text-xs text-muted-foreground">
        <p className="text-muted-foreground">
          Built with care by {aboutMe.name}. Source code available on{" "}
          <Button variant="link" asChild className="h-auto px-0 text-xs">
            <a
              href="https://github.com/brijeshmarch16/portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </Button>
          .
        </p>
      </footer>
    </main>
  )
}
