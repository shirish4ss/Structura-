"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Share2, Loader2, Sparkles, Copy, Check } from "lucide-react"

export function SocialGenerator({ siteName, description }: { siteName: string, description: string }) {
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const generatePosts = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/ai/social", {
        method: "POST",
        body: JSON.stringify({ siteName, description }),
      })
      const data = await res.json()
      setPosts(data.posts)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!posts) return
    navigator.clipboard.writeText(posts)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="p-8 bg-white/5 border-white/10 rounded-3xl space-y-6">
      <div className="flex justify-between items-start">
        <div>
           <h3 className="text-xl font-bold flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-500" /> Viral Launch Kit
           </h3>
           <p className="text-zinc-500 text-sm">Generate AI posts to promote your new site.</p>
        </div>
        {!posts ? (
           <Button onClick={generatePosts} disabled={loading} className="rounded-full">
              {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
              Generate Posts
           </Button>
        ) : (
           <Button variant="outline" onClick={copyToClipboard} className="rounded-full border-white/10">
              {copied ? <Check className="w-4 h-4 text-emerald-500 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? "Copied!" : "Copy All"}
           </Button>
        )}
      </div>

      {posts && (
         <div className="bg-zinc-900 rounded-2xl p-6 border border-white/5 whitespace-pre-wrap text-sm text-zinc-300 leading-relaxed font-mono">
            {posts}
         </div>
      )}
    </Card>
  )
}
