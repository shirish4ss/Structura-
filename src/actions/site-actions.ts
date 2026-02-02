"use server"

import { prisma } from "@/lib/prisma"
import { SiteConfig } from "@/types/site"
import { auth } from "@clerk/nextjs/server"

export async function createSite(config: SiteConfig) {
  try {
    const { userId } = await auth()
    if (!userId) {
      return { success: false, error: "Unauthorized" }
    }

    // Wrap in transaction
    const result = await prisma.$transaction(async (tx) => {
      // 1. Create the Site record
      const site = await tx.site.create({
        data: {
          userId,
          subdomain: config.subdomain || `site-${Math.random().toString(36).substring(7)}`,
          themeSettings: config.theme as object,
          isPublished: false,
        },
      })

      // 2. Create the initial Page records
      const pagePromises = config.pages.map((page) => {
        return tx.page.create({
          data: {
            siteId: site.id,
            slug: page.slug,
            sections: page.sections as object,
            seoMetadata: (page.seo || {}) as object,
          },
        })
      })

      await Promise.all(pagePromises)
      return site
    })

    return { success: true, siteId: result.id }
  } catch (error) {
    console.error("Error creating site:", error)
    return { success: false, error: "Failed to create site in database." }
  }
}

export async function getSite(siteId: string) {
  try {
    const { userId } = await auth()
    if (!userId) return null

    const site = await prisma.site.findUnique({
      where: { id: siteId, userId },
      include: { pages: true },
    })

    return site
  } catch (error) {
    console.error("Error fetching site:", error)
    return null
  }
}

export async function updatePage(pageId: string, sections: object) {
  try {
    const { userId } = await auth()
    if (!userId) return { success: false, error: "Unauthorized" }

    await prisma.page.update({
      where: { id: pageId },
      data: { sections },
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating page:", error)
    return { success: false, error: "Failed to update page." }
  }
}
