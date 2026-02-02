import { OpenAI } from "openai"
import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { checkSubscription } from "@/lib/subscription"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key",
})

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    if (!userId) return new NextResponse("Unauthorized", { status: 401 })

    const isPro = await checkSubscription(userId)
    if (!isPro) {
      return NextResponse.json({ error: "Pro subscription required for AI Image generation." }, { status: 403 })
    }

    const { prompt } = await req.json()

    if (!prompt) {
      return NextResponse.json({ error: "No prompt provided." }, { status: 400 })
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: `A high-end, professional website image for: ${prompt}. Minimalist, Silicon Valley aesthetic, 4k resolution, high quality.`,
      n: 1,
      size: "1024x1024",
    })

    const imageUrl = response.data?.[0]?.url

    return NextResponse.json({ url: imageUrl })
  } catch (error) {
    console.error("AI Image Generation Error:", error)
    return NextResponse.json({ error: "Failed to generate image." }, { status: 500 })
  }
}
