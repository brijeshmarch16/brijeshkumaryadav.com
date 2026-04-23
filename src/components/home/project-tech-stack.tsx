import { Badge } from "@/components/ui/badge"
import type { Project } from "@/types"

export function ProjectTechStack({
  techStack,
}: {
  techStack: Project["techStack"]
}) {
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
