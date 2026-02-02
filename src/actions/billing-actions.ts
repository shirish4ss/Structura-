"use server"

import { stripe } from "@/lib/stripe"
import { razorpay } from "@/lib/razorpay"
import { auth, currentUser } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"

const ABSOLUTE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export async function createStripeCheckout() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) {
    throw new Error("Unauthorized")
  }

  // 1. Get or create Stripe customer
  let dbUser = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!dbUser?.stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.emailAddresses[0].emailAddress,
      metadata: { userId },
    })
    dbUser = await prisma.user.update({
      where: { id: userId },
      data: { stripeCustomerId: customer.id },
    })
  }

  // 2. Create Checkout Session
  const session = await stripe.checkout.sessions.create({
    customer: dbUser.stripeCustomerId!,
    line_items: [
      {
        price: process.env.STRIPE_PRO_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${ABSOLUTE_URL}/dashboard/billing?success=true`,
    cancel_url: `${ABSOLUTE_URL}/dashboard/billing?canceled=true`,
    metadata: { userId },
  })

  return { url: session.url }
}

export async function createRazorpaySubscription() {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  // Create a plan/subscription in Razorpay
  // In a real app, you'd fetch the plan ID from env
  const subscription = await razorpay.subscriptions.create({
    plan_id: process.env.RAZORPAY_PLAN_ID!,
    customer_notify: 1,
    total_count: 12,
    notes: { userId },
  })

  return {
    subscriptionId: subscription.id,
    keyId: process.env.RAZORPAY_KEY_ID,
  }
}
