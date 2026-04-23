import { ExperienceSection } from "@/components/home/experience-section"
import { IntroSection } from "@/components/home/intro-section"
import { ProjectsSection } from "@/components/home/projects-section"
import { SiteFooter } from "@/components/home/site-footer"
import { TechStackSection } from "@/components/home/tech-stack-section"
import {
  aboutMe,
  projects,
  socialMedia,
  techStack,
  workExperience,
} from "@/lib/data"

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <IntroSection aboutMe={aboutMe} socialMedia={socialMedia} />
      <ProjectsSection projects={projects} />
      <TechStackSection items={techStack} />
      <ExperienceSection workExperience={workExperience} />
      <SiteFooter name={aboutMe.name} />
    </main>
  )
}
