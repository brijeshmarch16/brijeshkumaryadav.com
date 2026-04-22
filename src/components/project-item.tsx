import dynamic from "next/dynamic"
import { ArrowUpRightIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Project } from "@/types"

type PreviewProject = Project & { imageUrl: string }

const ProjectPreviewCard = dynamic<{ project: PreviewProject }>(() =>
  import("@/components/project-preview-card").then(
    (mod) => mod.ProjectPreviewCard
  )
)

function ProjectTechStack({ techStack }: Pick<Project, "techStack">) {
  return (
    <div className="flex flex-wrap gap-2">
      {techStack.map((skill) => (
        <Badge key={skill} variant="secondary" className="h-6">
          {skill}
        </Badge>
      ))}
    </div>
  )
}

function SimpleProjectItem({ project }: { project: Project }) {
  return (
    <article>
      <Card>
        <CardHeader>
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <ProjectTechStack techStack={project.techStack} />

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex flex-wrap items-center gap-2">
              {project.liveUrl && (
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
          )}
        </CardContent>
      </Card>
    </article>
  )
}

export function ProjectItem({ project }: { project: Project }) {
  if (!project.liveUrl && project.imageUrl) {
    const previewProject: PreviewProject = {
      ...project,
      imageUrl: project.imageUrl,
    }

    return <ProjectPreviewCard project={previewProject} />
  }

  return <SimpleProjectItem project={project} />
}
