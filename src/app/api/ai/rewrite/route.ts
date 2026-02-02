import { OpenAI } from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key",
})

export async function POST(req: Request) {
  try {
    const { text, tone = "professional" } = await req.json()

    if (!text) {
      return NextResponse.json({ error: "No text provided." }, { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `You are a world-class copywriter. Rewrite the following text to be more compelling and ${tone}. Keep it concise and maintain the original meaning.`
        },
        { role: "user", content: text }
      ],
    })

    const rewrittenText = response.choices[0].message.content?.trim()

    return NextResponse.json({ text: rewrittenText })
  } catch (error) {
    console.error("AI Rewrite Error:", error)
    return NextResponse.json({ error: "Failed to rewrite text." }, { status: 500 })
  }
}
