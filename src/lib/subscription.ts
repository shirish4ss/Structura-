import { prisma } from "@/lib/prisma"

export async function checkSubscription(userId: string) {
  if (!userId) return false

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      subscriptionTier: true,
      currentPeriodEnd: true,
    },
  })

  if (!user) return false

  // Basic check: Is the user a PRO subscriber and is the subscription still valid?
  const isPro = user.subscriptionTier === "PRO"
  const isValid = user.currentPeriodEnd ? user.currentPeriodEnd.getTime() > Date.now() : false

  return isPro && isValid
}
