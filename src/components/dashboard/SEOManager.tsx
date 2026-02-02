"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, CheckCircle2, AlertCircle } from "lucide-react"

export function SEOManager() {
  const [analyzing, setAnalyzing] = useState(false)
  const [fixed, setFixed] = useState(false)

  const handleFix = () => {
    setAnalyzing(true)
    setTimeout(() => {
      setAnalyzing(false)
      setFixed(true)
    }, 2000)
  }

  return (
    <Card className="p-8 bg-white/5 border-white/10 rounded-3xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-semibold">SEO Auto-Fixer</h3>
          <p className="text-sm text-muted-foreground mt-1">Let AI optimize your site for search engines.</p>
        </div>
        <Button
          onClick={handleFix}
          disabled={analyzing || fixed}
          className="rounded-full"
        >
          {analyzing ? "Analyzing..." : fixed ? "Optimized" : "Scan & Fix"}
          {!analyzing && !fixed && <Sparkles className="ml-2 w-4 h-4" />}
          {fixed && <CheckCircle2 className="ml-2 w-4 h-4 text-emerald-500" />}
        </Button>
      </div>

      <div className="space-y-6">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
          <div className={cn("p-2 rounded-full", fixed ? "bg-emerald-500/20 text-emerald-500" : "bg-amber-500/20 text-amber-500")}>
            {fixed ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          </div>
          <div>
            <p className="font-medium">Meta Title Length</p>
            <p className="text-xs text-muted-foreground">
              {fixed ? "Title is perfectly optimized (60 characters)." : "Your home page title is too short (12 characters)."}
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(" ")
}
