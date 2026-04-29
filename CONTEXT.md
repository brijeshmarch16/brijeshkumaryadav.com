# Portfolio Context

## Domain Vocabulary

- **Portfolio**: The public website at `brijeshkumaryadav.com` that presents Brijeshkumar Yadav's profile, writing, work experience, projects, and links.
- **Home Page**: The primary portfolio page. It assembles intro, tech stack, work experience, blog summaries, project cards, and footer content.
- **Blog Post**: An MDX article stored in `src/app/blog/posts`. Published posts appear on the home page, blog detail pages, sitemap, and SEO metadata.
- **Project**: A portfolio work item. Projects are rendered through explicit card kinds: live project, preview project, or source project.
- **Tech Stack**: The tools and technologies shown as linked badges on the home page.
- **Work Experience**: Career timeline entries shown on the home page.
- **SEO Metadata**: Canonical URLs, Open Graph/Twitter metadata, JSON-LD, robots, sitemap, and OG image URLs generated for the site and blog posts.

## Architecture Notes

- Route files should ask for prepared page models and metadata helpers instead of assembling raw content rules.
- UI modules should render explicit view models rather than infer behavior from optional raw fields.
- Blog parsing, draft filtering, sorting, date formatting, and MDX file access belong behind the blog module.
