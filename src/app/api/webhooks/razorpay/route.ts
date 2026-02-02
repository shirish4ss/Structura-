import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import crypto from "crypto"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("x-razorpay-signature") as string

  // Verify signature
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(body)
    .digest("hex")

  if (expectedSignature !== signature) {
    return new NextResponse("Invalid signature", { status: 400 })
  }

  const payload = JSON.parse(body)
  const event = payload.event

  if (event === "subscription.charged") {
    const subscription = payload.payload.subscription.entity
    const userId = subscription.notes.userId

    if (!userId) {
      return new NextResponse("User id not found in notes", { status: 400 })
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        subscriptionTier: "PRO",
        subscriptionId: subscription.id,
        currentPeriodEnd: new Date(subscription.current_end * 1000),
      },
    })
  }

  return new NextResponse(null, { status: 200 })
}
