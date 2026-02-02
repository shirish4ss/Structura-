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
  Loader2,
  Check,
  Cloud
} from "lucide-react"
import { getSite } from "@/actions/site-actions"
import { cn } from "@/lib/utils"
import { SiteTheme, Section } from "@/types/site"
import { useAutoSave } from "@/hooks/useAutoSave"

export default function EditorPage({ searchParams }: { searchParams: Promise<{ siteId: string }> }) {
  const { siteId } = use(searchParams)
  const { config, setSiteConfig, isDirty } = useSiteStore()
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [chatInput, setChatInput] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Activate Auto-Save
  useAutoSave()

  useEffect(() => {
    async function loadSite() {
      if (!siteId) return
      setIsLoading(true)
      const site = await getSite(siteId)
      if (site) {
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
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold text-xl shadow-lg shadow-primary/20">L</div>
        <div className="flex flex-col gap-6 text-zinc-500">
          <Layers className="cursor-pointer hover:text-white transition-colors" />
          <Settings className="cursor-pointer hover:text-white transition-colors" />
        </div>
      </aside>

      {/* Center - Live Preview */}
      <main className="flex-1 flex flex-col bg-zinc-900/50">
        {/* Top Header */}
        <header className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-zinc-950">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 bg-zinc-900 rounded-full px-4 py-1.5 border border-white/5">
              <Monitor
                className={cn("w-5 h-5 cursor-pointer transition-colors", device === "desktop" ? "text-primary" : "text-zinc-500 hover:text-white")}
                onClick={() => setDevice("desktop")}
              />
              <Tablet
                className={cn("w-5 h-5 cursor-pointer transition-colors", device === "tablet" ? "text-primary" : "text-zinc-500 hover:text-white")}
                onClick={() => setDevice("tablet")}
              />
              <Smartphone
                className={cn("w-5 h-5 cursor-pointer transition-colors", device === "mobile" ? "text-primary" : "text-zinc-500 hover:text-white")}
                onClick={() => setDevice("mobile")}
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 uppercase tracking-widest">
              {isDirty ? (
                <><Cloud className="w-4 h-4 text-amber-500 animate-pulse" /> Unsaved Changes</>
              ) : (
                <><Check className="w-4 h-4 text-emerald-500" /> All Saved</>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-white/10 hover:bg-white/5 rounded-full px-6">Preview</Button>
            <Button className="rounded-full px-8 shadow-lg shadow-primary/20">Publish</Button>
          </div>
        </header>

        {/* Preview Area */}
        <div className="flex-1 overflow-auto p-12 flex justify-center items-start scrollbar-hide">
          <div
            className={cn(
              "bg-background transition-all duration-700 ease-in-out shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden border border-white/5",
              device === "desktop" ? "w-full max-w-[1200px]" : device === "tablet" ? "w-[768px]" : "w-[375px]"
            )}
          >
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
      <aside className="w-85 border-l border-white/10 flex flex-col bg-zinc-950">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" /> Lumina AI Assistant
          </h2>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          <div className="bg-white/5 rounded-2xl p-5 text-sm leading-relaxed text-zinc-300 border border-white/5">
            Hello! I&apos;m your AI design assistant. You can ask me to:
            <ul className="mt-3 space-y-2 text-zinc-400">
              <li className="flex items-center gap-2">• <span className="text-white/80 italic">&quot;Change the primary color to violet&quot;</span></li>
              <li className="flex items-center gap-2">• <span className="text-white/80 italic">&quot;Make the hero headline punchier&quot;</span></li>
              <li className="flex items-center gap-2">• <span className="text-white/80 italic">&quot;Add a pricing section below features&quot;</span></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active Page</h3>
            <Card className="p-4 bg-white/5 border-white/10 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-white/10 transition-colors">
              <span className="text-sm font-medium">Home Page</span>
              <Settings className="w-4 h-4 text-zinc-500" />
            </Card>
          </div>
        </div>

        <div className="p-6 border-t border-white/10 bg-zinc-950">
          <div className="relative group">
            <Input
              placeholder="Ask AI to edit site..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="pr-12 bg-zinc-900 border-white/10 h-14 rounded-2xl focus:ring-primary focus:border-primary/50 transition-all placeholder:text-zinc-600"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2 text-primary hover:text-primary hover:bg-white/5 rounded-xl transition-all"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </aside>
    </div>
  )
}

function Card({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
  return <div onClick={onClick} className={cn(className)}>{children}</div>
}
