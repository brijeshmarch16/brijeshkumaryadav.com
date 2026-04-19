import { ArrowUpRightIcon } from "lucide-react"
import { ProjectItem } from "@/components/project-item"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
  aboutMe,
  projects,
  skills,
  socialMedia,
  workExperience,
} from "@/lib/data"
import { parseBold } from "@/lib/parse-bold"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl space-y-10 px-4 py-20">
      {/* Name + role */}
      <header className="space-y-1">
        <h1 className="text-base leading-tight font-bold">{aboutMe.name}</h1>
        <p className="text-sm text-muted-foreground">{aboutMe.role}</p>
      </header>

      {/* Bio */}
      <section className="space-y-3">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {parseBold(aboutMe.bio).map((part) =>
            part.bold ? (
              <span key={part.text} className="font-medium text-foreground">
                {part.text}
              </span>
            ) : (
              part.text
            )
          )}
        </p>
      </section>

      {/* Skills */}
      <section>
        <p className="mb-4 text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Skills
        </p>
        <div className="flex flex-wrap gap-2">
          {skills.map(({ name, url }) => (
            <Badge asChild key={name} variant="secondary">
              <a href={url} target="_blank" rel="noopener noreferrer">
                {name}
              </a>
            </Badge>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section>
        <p className="mb-4 text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Projects
        </p>
        <ul className="list-disc space-y-4 pl-5">
          {projects.map((project) => (
            <ProjectItem key={project.title} project={project} />
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section>
        <p className="mb-4 text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Experience
        </p>
        <ul className="space-y-4">
          {workExperience.map((job) => (
            <li
              key={`${job.company}-${job.period}`}
              className="flex items-start justify-between gap-4"
            >
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{job.title}</p>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-muted-foreground">{job.period}</p>
                {job.current && (
                  <span className="text-xs font-medium text-foreground">
                    Current
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Connect */}
      <section>
        <p className="mb-4 text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Connect
        </p>
        <p className="mb-4 text-sm text-muted-foreground">
          Feel free to reach me at{" "}
          <a
            href={`mailto:${aboutMe.email}`}
            className="font-medium text-foreground underline underline-offset-2 transition-colors hover:text-muted-foreground"
          >
            {aboutMe.email}
          </a>
        </p>
        <div className="flex flex-wrap gap-2">
          {socialMedia.map(({ label, href }) => (
            <Button key={label} size="sm" variant="outline" asChild>
              <a href={href} target="_blank" rel="noopener noreferrer">
                {label}
                <ArrowUpRightIcon size={12} />
              </a>
            </Button>
          ))}
        </div>
      </section>

      {/* Footer — theme toggle */}
      <footer className="flex items-center justify-between border-t border-border pt-4">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {aboutMe.name}. All rights reserved.
        </p>
        <ThemeToggle />
      </footer>
    </main>
  )
}
