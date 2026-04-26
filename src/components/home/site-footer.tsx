import { Button } from "@/components/ui/button"

export function SiteFooter({ name }: { name: string }) {
  return (
    <footer className="mt-8 flex flex-col gap-3 border-t pt-4 text-xs/relaxed text-muted-foreground">
      <p>
        Designed and built by {name}. Source code on{" "}
        <Button variant="link" asChild className="h-auto px-0 text-xs">
          <a
            href="https://github.com/brijeshmarch16/brijeshkumaryadav.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </Button>
        .
      </p>
    </footer>
  )
}
