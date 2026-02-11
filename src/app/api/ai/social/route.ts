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
      return NextResponse.json({ error: "Pro subscription required." }, { status: 403 })
    }

    const { siteName, description } = await req.json()

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a social media expert. Generate 5 highly engaging launch posts (for Twitter, LinkedIn, Instagram) for a new website called "${siteName}". Use relevant emojis and hashtags.`
        },
        { role: "user", content: `Business Description: ${description}` }
      ],
    })

    const posts = response.choices[0].message.content

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("AI Social Error:", error)
    return NextResponse.json({ error: "Failed to generate posts." }, { status: 500 })
  }
}
