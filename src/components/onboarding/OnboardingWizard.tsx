"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useSiteStore } from "@/store/useSiteStore"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ArrowRight, Sparkles } from "lucide-react"

export function OnboardingWizard() {
  const { currentStep, setStep, formData, updateFormData } = useSiteStore()

  const handleNext = () => setStep(currentStep + 1)

  const steps = [
    { title: "Business Identity", description: "Tell us who you are." },
    { title: "The Mission", description: "What do you do?" },
    { title: "The Vibe", description: "How should it feel?" },
    { title: "Generation", description: "AI is crafting your site." }
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
            <Button className="w-full h-12 rounded-xl text-lg group" onClick={handleNext}>
              Continue <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}

        {currentStep === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-2 gap-4"
          >
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
            <div className="col-span-2 mt-6">
              <Button className="w-full h-12 rounded-xl text-lg" onClick={handleNext}>
                Generate My Site <Sparkles className="ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(" ")
}
