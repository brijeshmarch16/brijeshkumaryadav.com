import { ProjectItem } from "@/components/home/project-item"
import type { ProjectCard } from "@/types/home"

export function ProjectsSection({ projects }: { projects: ProjectCard[] }) {
  return (
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
  )
}
