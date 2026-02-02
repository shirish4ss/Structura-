"use client"

import { useState, use } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Globe, CheckCircle2, Loader2, ArrowLeft } from "lucide-react"
import { updateCustomDomain } from "@/actions/site-actions"
import Link from "next/link"

export default function SettingsPage({ searchParams }: { searchParams: Promise<{ siteId: string }> }) {
  const { siteId } = use(searchParams)
  const [domain, setDomain] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleUpdateDomain = async () => {
    if (!siteId) return
    setIsUpdating(true)
    setSuccess(false)
    try {
      const res = await updateCustomDomain(siteId, domain)
      if (res.success) setSuccess(true)
    } catch (e) {
      console.error(e)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div className="p-10 bg-zinc-950 min-h-screen text-white">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="flex items-center gap-4">
          <Link href={`/dashboard/editor?siteId=${siteId}`}>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5 text-zinc-400">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
            <p className="text-zinc-500 text-sm">Manage your domains and site configuration.</p>
          </div>
        </header>

        <Card className="p-8 bg-white/5 border-white/10 rounded-3xl space-y-8">
          <div className="flex items-center gap-3 pb-6 border-b border-white/5">
            <div className="p-3 rounded-2xl bg-primary/10 text-primary">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-semibold">Custom Domain</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="domain">Domain Name</Label>
                <Input
                  id="domain"
                  placeholder="www.yourdomain.com"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="h-12 bg-zinc-900 border-white/10 focus:ring-primary"
                />
              </div>
              <Button
                className="w-full h-12 rounded-xl"
                onClick={handleUpdateDomain}
                disabled={isUpdating || !siteId}
              >
                {isUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Link Domain"}
              </Button>
              {success && (
                <p className="text-sm text-emerald-500 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Domain updated successfully.
                </p>
              )}
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">DNS Configuration</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold text-zinc-600 mb-1">A RECORD</p>
                  <div className="p-3 bg-black rounded-lg border border-white/5 flex justify-between items-center group">
                    <code className="text-xs text-primary">76.76.21.21</code>
                    <Button size="sm" variant="ghost" className="h-6 text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100">Copy</Button>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-600 mb-1">CNAME RECORD</p>
                  <div className="p-3 bg-black rounded-lg border border-white/5 flex justify-between items-center group">
                    <code className="text-xs text-primary">cname.lumina.com</code>
                    <Button size="sm" variant="ghost" className="h-6 text-[10px] text-zinc-500 opacity-0 group-hover:opacity-100">Copy</Button>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-zinc-600 italic">DNS changes can take up to 24 hours to propagate worldwide.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
