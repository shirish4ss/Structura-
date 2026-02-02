import { stripe } from "@/lib/stripe"
import { prisma } from "@/lib/prisma"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import Stripe from "stripe"

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get("Stripe-Signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: unknown) {
    return new NextResponse(`Webhook Error: ${error instanceof Error ? error.message : "Unknown error"}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === "checkout.session.completed") {
    const subscription = (await stripe.subscriptions.retrieve(
      session.subscription as string
    )) as Stripe.Subscription

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 })
    }

    await prisma.user.update({
      where: { id: session.metadata.userId },
      data: {
        subscriptionTier: "PRO",
        subscriptionId: subscription.id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      },
    })
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = (await stripe.subscriptions.retrieve(
      session.subscription as string
    )) as Stripe.Subscription

    await prisma.user.update({
      where: { subscriptionId: subscription.id },
      data: {
        subscriptionTier: "PRO",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
      },
    })
  }

  return new NextResponse(null, { status: 200 })
}
