import { Button } from "@/components/ui/button"

export function SiteFooter({ name }: { name: string }) {
  return (
    <footer className="mt-8 gap-3 border-t pt-4 text-xs text-muted-foreground">
      <p className="text-muted-foreground">
        Built with care by {name}. Source code available on{" "}
        <Button variant="link" asChild className="h-auto px-0 text-xs">
          <a
            href="https://github.com/brijeshmarch16/portfolio"
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
