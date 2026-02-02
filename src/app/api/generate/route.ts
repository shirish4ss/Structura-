import { OpenAI } from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "dummy_key",
})

const BANNED_KEYWORDS = ["illegal", "drugs", "weapons", "violence"]

export async function POST(req: Request) {
  try {
    const { businessName, industry, description, vibe, model = "gpt-4o" } = await req.json()

    // Keyword Banning (Admin Feature #8)
    const combinedContent = `${businessName} ${industry} ${description}`.toLowerCase()
    if (BANNED_KEYWORDS.some(keyword => combinedContent.includes(keyword))) {
      return NextResponse.json({ error: "Content contains prohibited industries." }, { status: 400 })
    }

    const systemPrompt = `
      You are an expert web designer and copywriter.
      Generate a JSON configuration for a high-end website for a business named "${businessName}" in the "${industry}" industry.
      The vibe of the site should be "${vibe}".

      Return ONLY a JSON object that strictly follows this structure:
      {
        "name": string,
        "theme": { "primary": string, "secondary": string, "fontSans": string, "borderRadius": string, "mode": "dark" },
        "pages": [
          {
            "slug": "index",
            "title": "Home",
            "sections": [
              { "id": "hero-1", "type": "hero", "content": { "title": string, "subtitle": string, "primaryCtaText": string, "image": string } },
              { "id": "features-1", "type": "features", "content": { "title": string, "features": [ { "id": string, "title": string, "description": string, "icon": string } ] } }
            ]
          }
        ]
      }
    `

    // AI Model Switcher (Admin Feature #1)
    const response = await openai.chat.completions.create({
      model: model === "gpt-4o" ? "gpt-4o" : "gpt-4o-mini", // Simplified model switcher
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Business Description: ${description}` }
      ],
      response_format: { type: "json_object" }
    })

    const siteConfig = JSON.parse(response.choices[0].message.content || "{}")

    return NextResponse.json(siteConfig)
  } catch (error: unknown) {
    console.error("AI Generation Error:", error)
    return NextResponse.json({ error: "Failed to generate site structure." }, { status: 500 })
  }
}
