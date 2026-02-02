"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Users, Gift, Check, Loader2 } from "lucide-react"
import { getUserReferralStats } from "@/actions/user-actions"

export function ReferralCard() {
  const [stats, setStats] = useState<{ referralCode: string | null, referralCount: number, referralCredits: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    async function loadStats() {
      const data = await getUserReferralStats()
      if (data) setStats({
        referralCode: data.referralCode || null,
        referralCount: data.referralCount,
        referralCredits: data.referralCredits || 0,
      })
      setLoading(false)
    }
    loadStats()
  }, [])

  const copyLink = () => {
    if (!stats?.referralCode) return
    const link = `${window.location.origin}/onboarding?ref=${stats.referralCode}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return <div className="h-40 flex items-center justify-center bg-white/5 rounded-3xl animate-pulse"><Loader2 className="w-6 h-6 animate-spin text-primary" /></div>

  return (
    <Card className="p-8 bg-gradient-to-br from-primary/10 via-transparent to-transparent border-white/10 rounded-3xl relative overflow-hidden group">
      <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
        <div className="space-y-4 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
            <Gift className="w-3 h-3" /> Growth Rewards
          </div>
          <h3 className="text-2xl font-bold tracking-tight">Refer & Earn Months</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Invite your friends to Lumina. When they upgrade to PRO, we&apos;ll add <span className="text-white font-medium">30 days of free credit</span> to your account.
          </p>

          <div className="flex items-center gap-3 pt-4">
             <div className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-xl font-mono text-primary font-bold">
                {stats?.referralCode || "------"}
             </div>
             <Button variant="outline" size="sm" className="rounded-xl border-white/10 hover:bg-white/5" onClick={copyLink}>
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span className="ml-2">{copied ? "Copied!" : "Copy Link"}</span>
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center space-y-1 group-hover:bg-white/10 transition-colors">
            <Users className="w-5 h-5 text-blue-500 mb-2" />
            <p className="text-2xl font-bold">{stats?.referralCount}</p>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Total Referrals</p>
          </div>
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center space-y-1 group-hover:bg-white/10 transition-colors">
            <Gift className="w-5 h-5 text-emerald-500 mb-2" />
            <p className="text-2xl font-bold">{stats?.referralCredits} mo</p>
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Credits Earned</p>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -mr-32 -mt-32 opacity-50 pointer-events-none" />
    </Card>
  )
}
