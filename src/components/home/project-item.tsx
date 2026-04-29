import dynamic from "next/dynamic"
import { ArrowUpRightIcon } from "lucide-react"
import { ProjectTechStack } from "@/components/home/project-tech-stack"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {
  LiveProjectCard,
  PreviewProjectCard as PreviewProjectCardModel,
  ProjectCard,
  SourceProjectCard,
} from "@/types/home"

const ProjectPreviewCard = dynamic<{ project: PreviewProjectCardModel }>(() =>
  import("@/components/home/project-preview-card").then(
    (mod) => mod.ProjectPreviewCard
  )
)

function SimpleProjectItem({
  project,
}: {
  project: LiveProjectCard | SourceProjectCard
}) {
  return (
    <article>
      <Card>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <ProjectTechStack techStack={project.techStack} />

          <div className="flex flex-wrap items-center gap-2">
            {project.kind === "live" && (
              <Button asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Button>
            )}

            {project.githubUrl && (
              <Button variant="outline" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                  <ArrowUpRightIcon data-icon="inline-end" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </article>
  )
}

export function ProjectItem({ project }: { project: ProjectCard }) {
  switch (project.kind) {
    case "preview":
      return <ProjectPreviewCard project={project} />
    case "live":
    case "source":
      return <SimpleProjectItem project={project} />
  }
}
