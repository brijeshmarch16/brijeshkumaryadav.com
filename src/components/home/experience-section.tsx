import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { WorkExperience } from "@/types"

export function ExperienceSection({
  workExperience,
}: {
  workExperience: WorkExperience[]
}) {
  return (
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
  )
}
