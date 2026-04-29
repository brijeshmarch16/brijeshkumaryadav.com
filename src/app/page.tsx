import { ExperienceSection } from "@/components/home/experience-section"
import { BlogSection } from "@/components/home/blog-section"
import { IntroSection } from "@/components/home/intro-section"
import { ProjectsSection } from "@/components/home/projects-section"
import { SiteFooter } from "@/components/home/site-footer"
import { TechStackSection } from "@/components/home/tech-stack-section"
import { portfolio } from "@/lib/data"
import { getPublishedBlogSummaries } from "@/lib/blog"

export default function Home() {
  const blogPosts = getPublishedBlogSummaries()

  return (
    <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
      <IntroSection
        aboutMe={portfolio.about}
        socialMedia={portfolio.socialMedia}
      />
      <TechStackSection items={portfolio.techStack} />
      <ExperienceSection workExperience={portfolio.workExperience} />
      <BlogSection posts={blogPosts} />
      <ProjectsSection projects={portfolio.projects} />
      <SiteFooter name={portfolio.about.name} />
    </main>
  )
}
