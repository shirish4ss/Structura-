"use server"

import { prisma } from "@/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getAdminStats() {
  await auth()
  // In real app, check if user is admin
  // const user = await prisma.user.findUnique({ where: { id: userId } })
  // if (user?.role !== "ADMIN") throw new Error("Unauthorized")

  try {
    const totalUsers = await prisma.user.count()
    const activeSites = await prisma.site.count({
      where: { isPublished: true }
    })

    // DB Ping
    const dbPing = await prisma.$queryRaw`SELECT 1`
    const isDbHealthy = !!dbPing

    return {
      totalUsers,
      activeSites,
      isDbHealthy,
      revenue: totalUsers * 29, // Mock revenue logic for now based on users
    }
  } catch (error) {
    console.error("Failed to fetch admin stats:", error)
    return {
      totalUsers: 0,
      activeSites: 0,
      isDbHealthy: false,
      revenue: 0,
    }
  }
}

export async function banUser(targetUserId: string) {
  await auth()
  // Check admin auth here...

  await prisma.user.update({
    where: { id: targetUserId },
    data: { isBanned: true }
  })

  return { success: true }
}

export async function impersonateUser(targetUserId: string) {
  await auth()
  // Check admin auth here...

  const cookieStore = await cookies()
  cookieStore.set("impersonated_user_id", targetUserId, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  })

  redirect("/dashboard/sites")
}

export async function stopImpersonating() {
  const cookieStore = await cookies()
  cookieStore.delete("impersonated_user_id")
  redirect("/admin")
}

export async function getOrphanedAssets() {
  // 1. Get all images from DB
  const pages = await prisma.page.findMany()
  const dbImages = new Set<string>()

  pages.forEach(page => {
    const sections = page.sections as { content?: { image?: string } }[]
    sections.forEach(section => {
      if (section.content?.image) dbImages.add(section.content.image)
    })
  })

  // 2. Mock storage images (In real app, fetch from Supabase Storage)
  const storageImages = [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg",
    "https://example.com/orphan.jpg"
  ]

  const orphaned = storageImages.filter(img => !dbImages.has(img))

  return orphaned
}
