"use client"

import Image from "next/image"
import { ArrowUpRightIcon, ImageIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Project } from "@/types"

type PreviewProject = Project & { imageUrl: string }

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

export function ProjectPreviewCard({ project }: { project: PreviewProject }) {
  return (
    <Dialog>
      <article>
        <Card>
          <CardHeader>
            <CardTitle>{project.title}</CardTitle>
            <CardDescription>{project.description}</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col gap-4">
            <ProjectTechStack techStack={project.techStack} />

            <div className="flex flex-wrap items-center gap-2">
              <DialogTrigger asChild>
                <Button type="button">
                  Preview
                  <ImageIcon data-icon="inline-end" />
                </Button>
              </DialogTrigger>

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

      <DialogContent className="sm:max-w-3xl">
        <div className="flex flex-col gap-4">
          <DialogHeader className="border-b">
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>{project.description}</DialogDescription>
          </DialogHeader>
          <div className="overflow-hidden border border-border/60 bg-muted/20 p-2 sm:p-3">
            <div className="relative aspect-video w-full">
              <Image
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                fill
                sizes="(min-width: 640px) 768px, 100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
