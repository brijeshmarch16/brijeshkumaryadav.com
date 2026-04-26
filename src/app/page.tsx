import { ExperienceSection } from "@/components/home/experience-section"
import { BlogSection } from "@/components/home/blog-section"
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
import { getBlogPosts } from "@/lib/blog"

export default function Home() {
  const blogPosts = getBlogPosts()

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <IntroSection aboutMe={aboutMe} socialMedia={socialMedia} />
      <TechStackSection items={techStack} />
      <ExperienceSection workExperience={workExperience} />
      <BlogSection posts={blogPosts} />
      <ProjectsSection projects={projects} />
      <SiteFooter name={aboutMe.name} />
    </main>
  )
}
