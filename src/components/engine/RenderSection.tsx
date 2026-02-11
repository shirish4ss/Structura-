import { Hero } from "@/components/blocks/Hero"
import { Features } from "@/components/blocks/Features"
import { AnnouncementBar } from "@/components/blocks/AnnouncementBar"
import { Section } from "@/types/site"

export function RenderSection({ section }: { section: Section }) {
  switch (section.type) {
    case "hero":
      return <Hero {...section} />
    case "features":
      return <Features {...section} />
    case "announcement-bar":
      return <AnnouncementBar content={section.content as { text: string, link?: string }} />
    case "custom-code":
      return <div dangerouslySetInnerHTML={{ __html: (section.content as { code: string }).code }} />
    default:
      return (
        <div className="py-12 bg-zinc-900/50 border border-white/5 rounded-lg text-center">
          <p className="text-muted-foreground">Section type &quot;{section.type}&quot; not implemented yet.</p>
        </div>
      )
  }
}
