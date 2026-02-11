import { prisma } from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { DynamicRenderer } from "@/components/engine/DynamicRenderer"
import { cookies } from "next/headers"
import { Section, SiteTheme } from "@/types/site"
import { recordEvent } from "@/lib/analytics"
import { CookieBanner } from "@/components/shared/CookieBanner"

interface PageProps {
  params: Promise<{ domain: string; slug: string }>
}

export default async function PublicSubPage({ params }: PageProps) {
  const { domain, slug } = await params

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
        where: { slug: slug }
      }
    }
  })

  if (!site || site.pages.length === 0) {
    return notFound()
  }

  // Password Protection Check
  if (site.password) {
     const cookieStore = await cookies()
     const isAuth = cookieStore.get(`site_auth_${domain}`)
     if (!isAuth) {
        redirect(`/site/${domain}/lock`)
     }
  }

  // Record Analytics
  await recordEvent(site.id, "PAGE_VIEW", slug)

  const page = site.pages[0]
  const sections = page.publishedSections as unknown as Section[]
  const theme = site.publishedTheme as unknown as SiteTheme

  if (!sections) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950 text-white">
        <h1 className="text-2xl font-bold mb-2">Page Empty</h1>
        <p className="text-zinc-500 text-sm">This page has no published content yet.</p>
      </div>
    )
  }

  return (
    <main
      className="min-h-screen bg-background"
      style={{
        "--primary": theme?.primary || "oklch(0.205 0 0)",
      } as React.CSSProperties}
    >
      <DynamicRenderer sections={sections} />

      <CookieBanner />

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
