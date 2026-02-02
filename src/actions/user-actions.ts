"use server"

import { prisma } from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server"
import { generateReferralCode } from "@/lib/referral"

export async function syncUser(referralCode?: string) {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) return null

  // Check if user already exists
  let dbUser = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!dbUser) {
    let referredById = null
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode: referralCode.toUpperCase() },
      })
      if (referrer) {
        referredById = referrer.id
      }
    }

    dbUser = await prisma.user.create({
      data: {
        id: userId,
        email: user.emailAddresses[0].emailAddress,
        referralCode: generateReferralCode(),
        referredBy: referredById,
      },
    })
  }

  return dbUser
}

export async function getUserReferralStats() {
  const { userId } = await auth()
  if (!userId) return null

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      referralCode: true,
      referralCredits: true,
    }
  })

  const referralCount = await prisma.user.count({
    where: { referredBy: userId }
  })

  return {
    ...user,
    referralCount
  }
}
