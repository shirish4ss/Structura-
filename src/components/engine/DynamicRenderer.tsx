import { RenderSection } from "./RenderSection"
import { Section } from "@/types/site"

interface DynamicRendererProps {
  sections: Section[]
}

export function DynamicRenderer({ sections }: DynamicRendererProps) {
  if (!sections || sections.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 border-2 border-dashed border-white/10 rounded-3xl m-6">
        <h2 className="text-2xl font-semibold mb-2">No sections generated yet</h2>
        <p className="text-muted-foreground">Describe your business to start building.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full">
      {sections.map((section) => (
        <RenderSection key={section.id} section={section} />
      ))}
    </div>
  )
}
