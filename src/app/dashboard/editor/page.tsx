"use client"

import { useState, useEffect, use } from "react"
import { useSiteStore } from "@/store/useSiteStore"
import { DynamicRenderer } from "@/components/engine/DynamicRenderer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Monitor,
  Smartphone,
  Tablet,
  Settings,
  Layers,
  Sparkles,
  Send,
  Loader2
} from "lucide-react"
import { getSite } from "@/actions/site-actions"
import { cn } from "@/lib/utils"
import { SiteTheme, Section } from "@/types/site"

export default function EditorPage({ searchParams }: { searchParams: Promise<{ siteId: string }> }) {
  const { siteId } = use(searchParams)
  const { config, setSiteConfig } = useSiteStore()
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadSite() {
      if (!siteId) return
      setIsLoading(true)
      const site = await getSite(siteId)
      if (site) {
        // Map Prisma site to SiteConfig type
        setSiteConfig({
          id: site.id,
          name: site.subdomain,
          industry: "",
          subdomain: site.subdomain,
          theme: site.themeSettings as unknown as SiteTheme,
          pages: site.pages.map(p => ({
            id: p.id,
            slug: p.slug,
            title: p.slug,
            sections: p.sections as unknown as Section[]
          }))
        })
      }
      setIsLoading(false)
    }
    loadSite()
  }, [siteId, setSiteConfig])

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Left Sidebar - Navigation */}
      <aside className="w-16 border-r border-white/10 flex flex-col items-center py-6 gap-8 bg-zinc-950">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-xl">L</div>
        <div className="flex flex-col gap-6 text-zinc-500">
          <Layers className="cursor-pointer hover:text-white transition-colors" />
          <Settings className="cursor-pointer hover:text-white transition-colors" />
        </div>
      </aside>

      {/* Center - Live Preview */}
      <main className="flex-1 flex flex-col bg-zinc-900/50">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-4 bg-zinc-900 rounded-full px-4 py-1.5 border border-white/5">
            <Monitor
              className={cn("w-5 h-5 cursor-pointer", device === "desktop" ? "text-primary" : "text-zinc-500")}
              onClick={() => setDevice("desktop")}
            />
            <Tablet
              className={cn("w-5 h-5 cursor-pointer", device === "tablet" ? "text-primary" : "text-zinc-500")}
              onClick={() => setDevice("tablet")}
            />
            <Smartphone
              className={cn("w-5 h-5 cursor-pointer", device === "mobile" ? "text-primary" : "text-zinc-500")}
              onClick={() => setDevice("mobile")}
            />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-white/10">Preview</Button>
            <Button className="rounded-full px-6">Publish</Button>
          </div>
        </header>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto p-8 flex justify-center items-start">
          <div className={cn(
            "bg-background transition-all duration-500 shadow-2xl rounded-2xl overflow-hidden border border-white/5",
            device === "desktop" ? "w-full max-w-5xl" : device === "tablet" ? "w-[768px]" : "w-[375px]"
          )}>
            {config ? (
              <DynamicRenderer sections={config.pages[0].sections} />
            ) : (
              <div className="p-20 text-center text-zinc-500">
                <p>No site configuration loaded.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Right Sidebar - AI Editor */}
      <aside className="w-80 border-l border-white/10 flex flex-col bg-zinc-950">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Lumina AI
          </h2>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-4">
          <div className="bg-white/5 rounded-2xl p-4 text-sm leading-relaxed text-zinc-300">
            Hello! I&apos;m your AI design assistant. You can ask me to change colors, add sections, or rewrite content.
          </div>
        </div>

        <div className="p-4 border-t border-white/10 bg-zinc-900/50">
          <div className="relative">
            <Input
              placeholder="Ask AI to edit..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="pr-10 bg-zinc-900 border-white/10 h-12 rounded-xl focus:ring-primary"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1 text-primary hover:text-primary hover:bg-transparent"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </aside>
    </div>
  )
}
