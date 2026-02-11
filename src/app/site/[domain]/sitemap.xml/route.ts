import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: Promise<{ domain: string }> }) {
  const { domain } = await params

  const site = await prisma.site.findFirst({
    where: {
      OR: [{ subdomain: domain }, { customDomain: domain }],
      isPublished: true
    },
    include: { pages: true }
  })

  if (!site) return new NextResponse("Not Found", { status: 404 })

  const baseUrl = `https://${domain}`
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${site.pages.map(page => `
        <url>
          <loc>${baseUrl}/${page.slug === 'index' ? '' : page.slug}</loc>
          <lastmod>${page.updatedAt.toISOString()}</lastmod>
        </url>
      `).join('')}
    </urlset>
  `

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
