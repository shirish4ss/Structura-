import { prisma } from "./prisma"

export async function recordEvent(siteId: string, event: string, path: string = "/") {
  try {
    await prisma.analytics.create({
      data: {
        siteId,
        event,
        path,
      },
    })
  } catch (error) {
    console.error("Failed to record analytics event:", error)
  }
}

export async function getSiteAnalytics(siteId: string) {
  try {
    const totalViews = await prisma.analytics.count({
      where: { siteId, event: "PAGE_VIEW" },
    })

    const viewsByDay = await prisma.analytics.groupBy({
      by: ["timestamp"],
      where: { siteId, event: "PAGE_VIEW" },
      _count: {
        id: true,
      },
      orderBy: {
        timestamp: "asc",
      },
    })

    return { totalViews, viewsByDay }
  } catch (error) {
    console.error("Failed to fetch analytics:", error)
    return { totalViews: 0, viewsByDay: [] }
  }
}
