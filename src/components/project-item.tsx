"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Project } from "@/types"

export function ProjectItem({ project }: { project: Project }) {
  const title = project.liveUrl ? (
    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-medium underline underline-offset-2"
    >
      {project.title}
    </a>
  ) : project.imageUrl ? (
    <Dialog>
      <DialogTrigger className="cursor-pointer text-sm font-medium underline underline-offset-2">
        {project.title}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{project.title}</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-video w-full">
          <Image
            src={project.imageUrl}
            alt={`${project.title} screenshot`}
            fill
            className="object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <span className="text-sm font-medium">{project.title}</span>
  )

  return (
    <li>
      {title}
      <small className="text-sm text-muted-foreground">
        {" "}
        — {project.description}
      </small>
    </li>
  )
}
