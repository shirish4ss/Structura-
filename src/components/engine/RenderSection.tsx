import { Hero } from "@/components/blocks/Hero"
import { Features } from "@/components/blocks/Features"
import { Section } from "@/types/site"

export function RenderSection({ section }: { section: Section }) {
  switch (section.type) {
    case "hero":
      return <Hero {...section} />
    case "features":
      return <Features {...section} />
    // More components will be added here
    default:
      return (
        <div className="py-12 bg-zinc-900/50 border border-white/5 rounded-lg text-center">
          <p className="text-muted-foreground">Section type &quot;{section.type}&quot; not implemented yet.</p>
        </div>
      )
  }
}
