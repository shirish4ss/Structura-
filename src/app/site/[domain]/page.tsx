import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { DynamicRenderer } from "@/components/engine/DynamicRenderer"
import { Section, SiteTheme } from "@/types/site"

export default async function PublicSitePage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params

  // Fetch site by subdomain, custom domain, or ID
  const site = await prisma.site.findFirst({
    where: {
      OR: [
        { subdomain: domain },
        { customDomain: domain },
        { id: domain }
      ],
      isPublished: true
    },
    include: {
      pages: {
        where: { slug: "index" }
      }
    }
  })

  if (!site || site.pages.length === 0) {
    return notFound()
  }

  const page = site.pages[0]
  const sections = page.publishedSections as unknown as Section[]
  const theme = site.publishedTheme as unknown as SiteTheme

  if (!sections) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white">
        <h1 className="text-2xl font-bold mb-2">Coming Soon</h1>
        <p className="text-zinc-500 text-sm">This site has no published content yet.</p>
      </div>
    )
  }

  return (
    <main
      className="min-h-screen bg-background"
      style={{
        // Optimistically apply some theme colors if provided
        // In a real app, you'd use a more robust theme injection
        "--primary": theme?.primary || "oklch(0.205 0 0)",
      } as React.CSSProperties}
    >
      <DynamicRenderer sections={sections} />

      {/* Global Footer Branding for Free Sites (Admin Feature #3) */}
      {!site.customDomain && (
         <div className="py-8 text-center border-t border-white/5 bg-zinc-950/50">
            <p className="text-xs text-zinc-600 font-medium tracking-widest uppercase">
               Made with <span className="text-white">Lumina AI</span>
            </p>
         </div>
      )}
    </main>
  )
}
