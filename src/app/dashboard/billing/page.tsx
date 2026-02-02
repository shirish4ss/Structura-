"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Loader2, CreditCard } from "lucide-react"
import { createStripeCheckout, createRazorpaySubscription } from "@/actions/billing-actions"
import { cn } from "@/lib/utils"
import Script from "next/script"

export default function BillingPage() {
  const [loading, setLoading] = useState(false)
  const [country, setCountry] = useState<"IN" | "US">("US") // Default to US

  // Mock location detection or fetch from DB user
  useEffect(() => {
    // In a real app, you could use an IP API or check user profile
    const isIndia = Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Kolkata"
    setCountry(isIndia ? "IN" : "US")
  }, [])

  const handleSubscribe = async () => {
    setLoading(true)
    try {
      if (country === "US") {
        const { url } = await createStripeCheckout()
        if (url) window.location.href = url
      } else {
        const { subscriptionId, keyId } = await createRazorpaySubscription()
        const options = {
          key: keyId,
          subscription_id: subscriptionId,
          name: "Lumina AI Builder",
          description: "Monthly Pro Subscription",
          handler: function (response: { razorpay_payment_id: string }) {
             alert("Payment Successful: " + response.razorpay_payment_id)
             window.location.reload()
          },
          prefill: {
            name: "",
            email: "",
          },
          theme: {
            color: "#000000",
          },
        }
        const rzp = new (window as unknown as { Razorpay: new (options: object) => { open: () => void } }).Razorpay(options)
        rzp.open()
      }
    } catch (error) {
      console.error("Subscription failed", error)
    } finally {
      setLoading(false)
    }
  }

  const features = [
    "Unlimited AI Website Generations",
    "High-End AI Image Replacement (DALL-E 3)",
    "Custom Domain Connection",
    "Advanced SEO Auto-Fixer",
    "Priority Support & Pro Blocks",
    "Remove 'Made with Lumina' Badge"
  ]

  return (
    <div className="p-10 bg-zinc-950 min-h-screen text-white flex flex-col items-center">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Upgrade to <span className="text-primary">Pro</span></h1>
          <p className="text-zinc-400 text-lg">Unlock the full power of Lumina and build professional websites with ease.</p>

          <div className="flex justify-center mt-6">
            <div className="inline-flex items-center p-1 bg-white/5 border border-white/10 rounded-full gap-2">
               <button
                onClick={() => setCountry("US")}
                className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition-all", country === "US" ? "bg-primary text-white shadow-lg" : "text-zinc-500 hover:text-white")}
               >
                 Global (USD)
               </button>
               <button
                onClick={() => setCountry("IN")}
                className={cn("px-4 py-1.5 rounded-full text-sm font-medium transition-all", country === "IN" ? "bg-primary text-white shadow-lg" : "text-zinc-500 hover:text-white")}
               >
                 India (INR)
               </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Free Tier */}
          <Card className="p-8 bg-white/5 border-white/10 rounded-3xl flex flex-col">
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2">Free</h3>
              <p className="text-zinc-500 text-sm italic">For testing the waters.</p>
            </div>
            <div className="text-4xl font-bold mb-8">$0<span className="text-lg text-zinc-500 font-normal">/mo</span></div>

            <div className="flex-1 space-y-4 mb-10">
              <div className="flex items-center gap-3 text-sm">
                <Check className="w-4 h-4 text-emerald-500" /> 1 Basic Website
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Check className="w-4 h-4 text-emerald-500" /> AI Site Generation
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-600">
                <Check className="w-4 h-4 opacity-20" /> No Custom Domain
              </div>
            </div>

            <Button variant="outline" disabled className="w-full rounded-2xl border-white/10 opacity-50">Current Plan</Button>
          </Card>

          {/* Pro Tier */}
          <Card className="p-8 bg-zinc-900 border-primary/50 rounded-3xl relative overflow-hidden flex flex-col shadow-[0_0_50px_rgba(var(--primary-rgb),0.1)]">
            <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">Best Value</div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Pro
              </h3>
              <p className="text-zinc-400 text-sm">Everything you need for success.</p>
            </div>

            <div className="text-4xl font-bold mb-8">
              {country === "US" ? "$29" : "₹1,999"}<span className="text-lg text-zinc-500 font-normal">/mo</span>
            </div>

            <div className="flex-1 space-y-4 mb-10">
              {features.map(f => (
                <div key={f} className="flex items-center gap-3 text-sm">
                  <Check className="w-4 h-4 text-primary" /> {f}
                </div>
              ))}
            </div>

            <Button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full h-14 rounded-2xl text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CreditCard className="w-5 h-5 mr-2" /> Upgrade Now</>}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  )
}
