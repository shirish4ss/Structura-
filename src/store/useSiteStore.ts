import { create } from "zustand"
import { SiteConfig, Section } from "@/types/site"

interface SiteState {
  config: SiteConfig | null
  isGenerating: boolean
  isDirty: boolean
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
  updateSection: (pageSlug: string, sectionId: string, updates: object) => void
  setSaved: () => void
  reset: () => void
}

export const useSiteStore = create<SiteState>((set) => ({
  config: null,
  isGenerating: false,
  isDirty: false,
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
  setSiteConfig: (config) => set({ config, isDirty: false }),
  updateSection: (pageSlug, sectionId, updates) => set((state) => {
    if (!state.config) return state

    const newPages = state.config.pages.map(page => {
      if (page.slug !== pageSlug) return page

      const newSections = page.sections.map(section => {
        if (section.id !== sectionId) return section
        return { ...section, content: { ...section.content, ...updates } } as unknown as Section
      })

      return { ...page, sections: newSections }
    })

    return {
      config: { ...state.config, pages: newPages },
      isDirty: true
    }
  }),
  setSaved: () => set({ isDirty: false }),
  reset: () => set({
    config: null,
    isGenerating: false,
    isDirty: false,
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
