import { ImageResponse } from "next/og"

const theme = {
  background: "#ffffff",
  foreground: "#171717",
  mutedForeground: "#737373",
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get("title") ?? "Brijeshkumar Yadav"
  const description =
    searchParams.get("description") ??
    "Frontend Engineer / React / Next.js / TypeScript"

  return new ImageResponse(
    <div
      tw="flex h-full w-full flex-col items-center justify-center p-28"
      style={{
        backgroundColor: theme.background,
        color: theme.foreground,
        fontFamily: "monospace",
      }}
    >
      <div tw="flex h-full w-full flex-col justify-between">
        <div tw="flex flex-col">
          <h1 tw="m-0 flex max-w-4xl text-left text-6xl font-semibold tracking-tighter leading-none">
            {title}
          </h1>
          <p
            tw="mt-8 flex max-w-4xl text-left text-3xl leading-snug"
            style={{ color: theme.mutedForeground }}
          >
            {description}
          </p>
        </div>

        <div tw="flex w-full items-center justify-between">
          <p tw="m-0 text-2xl font-semibold tracking-tight">
            brijeshkumaryadav.com
          </p>
        </div>
      </div>
    </div>,
    {
      height: 630,
      width: 1200,
    }
  )
}
