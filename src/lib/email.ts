import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY || "re_123")

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    await resend.emails.send({
      from: "Lumina AI <onboarding@lumina.com>",
      to,
      subject,
      html: body,
    })
  } catch (error) {
    console.error("Failed to send email:", error)
  }
}

export async function sendPublicationEmail(email: string, siteUrl: string) {
  const body = `
    <h1>Congratulations!</h1>
    <p>Your site is now live at <a href="${siteUrl}">${siteUrl}</a>.</p>
    <p>The world is waiting for your brand.</p>
  `
  await sendEmail(email, "Your Lumina site is live!", body)
}
