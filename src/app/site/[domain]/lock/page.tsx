"use client"

import { useState, use } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Lock, ArrowRight, Loader2 } from "lucide-react"

export default function LockPage({ params }: { params: Promise<{ domain: string }> }) {
  const { domain } = use(params)
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // In real app, call action to verify and set cookie
    setTimeout(() => {
       document.cookie = `site_auth_${domain}=true; path=/`
       window.location.href = `/`
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="max-w-sm w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto text-primary">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Protected Site</h1>
          <p className="text-zinc-500 text-sm italic">This site is private. Please enter the password to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 bg-white/5 border-white/10 text-center text-lg tracking-[0.5em]"
            autoFocus
          />
          <Button className="w-full h-12 rounded-xl group" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Unlock Site <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" /></>}
          </Button>
        </form>

        <p className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest pt-8">
          Powered by Lumina AI
        </p>
      </div>
    </div>
  )
}
