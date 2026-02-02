import { OnboardingWizard } from "@/components/onboarding/OnboardingWizard"
import { Suspense } from "react"
import { Loader2 } from "lucide-react"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>}>
        <OnboardingWizard />
      </Suspense>
    </div>
  )
}
