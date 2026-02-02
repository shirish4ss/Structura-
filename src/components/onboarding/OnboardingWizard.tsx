"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSiteStore } from "@/store/useSiteStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowRight, Sparkles, Loader2, CheckCircle2 } from "lucide-react"
import { createSite } from "@/actions/site-actions"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

export function OnboardingWizard() {
  const { currentStep, setStep, formData, updateFormData, setSiteConfig, config } = useSiteStore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { user } = useUser()
  const router = useRouter()

  const handleNext = () => setStep(currentStep + 1)
  const handleBack = () => setStep(currentStep - 1)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setStep(4)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      setSiteConfig(data)
    } catch (error) {
      console.error("Generation failed", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCreateSite = async () => {
    if (!user || !config) return
    setIsSaving(true)
    try {
      const result = await createSite(config)
      if (result.success) {
        router.push(`/dashboard/editor?siteId=${result.siteId}`)
      } else {
        alert(result.error)
      }
    } catch (error) {
      console.error("Save failed", error)
    } finally {
      setIsSaving(false)
    }
  }

  const steps = [
    { title: "Business Identity", description: "Tell us who you are." },
    { title: "The Mission", description: "What do you do?" },
    { title: "The Vibe", description: "How should it feel?" },
    { title: "The Result", description: "Your AI-crafted site is ready." }
  ]

  return (
    <div className="max-w-2xl mx-auto py-20 px-6">
      <div className="mb-12 text-center">
        <div className="flex justify-center gap-2 mb-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 w-12 rounded-full transition-all duration-500",
                i + 1 <= currentStep ? "bg-primary" : "bg-zinc-800"
              )}
            />
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-2">{steps[currentStep - 1].title}</h1>
        <p className="text-muted-foreground">{steps[currentStep - 1].description}</p>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label>Business Name</Label>
              <Input
                placeholder="e.g. Lumina Studios"
                value={formData.businessName}
                onChange={(e) => updateFormData({ businessName: e.target.value })}
                className="h-12 bg-white/5 border-white/10"
              />
            </div>
            <div className="space-y-2">
              <Label>Industry</Label>
              <Input
                placeholder="e.g. Creative Agency"
                value={formData.industry}
                onChange={(e) => updateFormData({ industry: e.target.value })}
                className="h-12 bg-white/5 border-white/10"
              />
            </div>
            <Button className="w-full h-12 rounded-xl text-lg group" onClick={handleNext} disabled={!formData.businessName || !formData.industry}>
              Continue <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}

        {currentStep === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="space-y-2">
              <Label>Business Description</Label>
              <Textarea
                placeholder="Describe your services, target audience, and unique selling points..."
                value={formData.description}
                onChange={(e) => updateFormData({ description: e.target.value })}
                className="min-h-[150px] bg-white/5 border-white/10"
              />
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="w-full h-12 rounded-xl" onClick={handleBack}>Back</Button>
              <Button className="w-full h-12 rounded-xl text-lg group" onClick={handleNext} disabled={!formData.description}>
                Continue <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              {["minimal", "bold", "luxury", "playful"].map((vibe) => (
                <Card
                  key={vibe}
                  className={cn(
                    "p-6 cursor-pointer border-2 transition-all hover:border-primary/50 bg-white/5",
                    formData.vibe === vibe ? "border-primary" : "border-white/10"
                  )}
                  onClick={() => updateFormData({ vibe: vibe as "minimal" | "bold" | "corporate" | "playful" | "luxury" })}
                >
                  <div className="text-lg font-semibold capitalize mb-1">{vibe}</div>
                  <div className="text-xs text-muted-foreground">Premium {vibe} aesthetics</div>
                </Card>
              ))}
            </div>
            <div className="flex gap-4">
              <Button variant="outline" className="w-full h-12 rounded-xl" onClick={handleBack}>Back</Button>
              <Button className="w-full h-12 rounded-xl text-lg" onClick={handleGenerate}>
                Generate My Site <Sparkles className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {currentStep === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 py-10"
          >
            {isGenerating ? (
              <div className="space-y-4">
                <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
                <p className="text-xl font-medium">Lumina AI is designing your site...</p>
                <p className="text-muted-foreground">This usually takes about 15-30 seconds.</p>
              </div>
            ) : (
              <div className="space-y-6">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <div>
                  <h2 className="text-2xl font-bold">Generation Complete!</h2>
                  <p className="text-muted-foreground mt-2">Your multi-page business site is ready for final creation.</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10 text-left">
                   <p className="font-semibold mb-2">Project Preview:</p>
                   <ul className="text-sm space-y-1 text-muted-foreground">
                     <li>• 3 Pages Generated (Home, About, Services)</li>
                     <li>• {config?.theme.primary} Color Palette</li>
                     <li>• Responsive Layouts Created</li>
                   </ul>
                </div>
                <Button
                  className="w-full h-14 rounded-2xl text-xl shadow-xl shadow-primary/20"
                  onClick={handleCreateSite}
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Finalizing...</>
                  ) : (
                    "Create Site & Open Editor"
                  )}
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
