import { create } from "zustand"
import { SiteConfig } from "@/types/site"

interface SiteState {
  config: SiteConfig | null
  isGenerating: boolean
  currentStep: number
  formData: {
    businessName: string
    industry: string
    description: string
    vibe: "minimal" | "bold" | "corporate" | "playful" | "luxury"
    contactEmail: string
  }
  setStep: (step: number) => void
  updateFormData: (data: Partial<SiteState["formData"]>) => void
  setGenerating: (status: boolean) => void
  setSiteConfig: (config: SiteConfig) => void
  reset: () => void
}

export const useSiteStore = create<SiteState>((set) => ({
  config: null,
  isGenerating: false,
  currentStep: 1,
  formData: {
    businessName: "",
    industry: "",
    description: "",
    vibe: "minimal",
    contactEmail: "",
  },
  setStep: (step) => set({ currentStep: step }),
  updateFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  setGenerating: (status) => set({ isGenerating: status }),
  setSiteConfig: (config) => set({ config }),
  reset: () => set({
    config: null,
    isGenerating: false,
    currentStep: 1,
    formData: {
      businessName: "",
      industry: "",
      description: "",
      vibe: "minimal",
      contactEmail: ""
    }
  }),
}))
