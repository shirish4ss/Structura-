"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Globe,
  CreditCard,
  Activity,
  Trash2,
  ShieldAlert,
  Search,
  Loader2,
  Ban
} from "lucide-react"
import { cn } from "@/lib/utils"
import { getAdminStats, banUser, impersonateUser, getOrphanedAssets, getRevenueByLocation } from "@/actions/admin-actions"
import { RevenueHeatmap } from "@/components/admin/RevenueHeatmap"

export default function AdminPage() {
  const [stats, setStats] = useState<{ totalUsers: number, activeSites: number, revenue: number, isDbHealthy: boolean } | null>(null)
  const [loading, setLoading] = useState(true)
  const [orphanedImages, setOrphanedImages] = useState<string[]>([])
  const [revenueData, setRevenueData] = useState<{ name: string, count: number, revenue: number }[]>([])

  useEffect(() => {
    async function loadData() {
      const data = await getAdminStats()
      const revenue = await getRevenueByLocation()
      setStats(data)
      setRevenueData(revenue)
      setLoading(false)
    }
    loadData()
  }, [])

  const handleImpersonate = async () => {
    const userId = prompt("Enter User ID to impersonate:")
    if (userId) await impersonateUser(userId)
  }

  const handleBan = async () => {
    const userId = prompt("Enter User ID to ban:")
    if (userId) {
      await banUser(userId)
      alert("User Banned")
    }
  }

  const handleCleanup = async () => {
    const orphaned = await getOrphanedAssets()
    setOrphanedImages(orphaned)
  }

  if (loading || !stats) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  const statCards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-500" },
    { label: "Active Sites", value: stats.activeSites, icon: Globe, color: "text-emerald-500" },
    { label: "Monthly Revenue", value: `$${stats.revenue}`, icon: CreditCard, color: "text-amber-500" },
    { label: "DB Health", value: stats.isDbHealthy ? "Online" : "Offline", icon: Activity, color: stats.isDbHealthy ? "text-emerald-500" : "text-destructive" },
  ]

  return (
    <div className="p-10 bg-zinc-950 min-h-screen text-white space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Admin Control</h1>
          <p className="text-muted-foreground mt-2">Manage your high-end SaaS platform with real-time data.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={cn(
            "flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium uppercase tracking-widest",
            stats.isDbHealthy ? "border-emerald-500/20 text-emerald-500" : "border-destructive/20 text-destructive"
          )}>
            <div className={cn("w-2 h-2 rounded-full", stats.isDbHealthy ? "bg-emerald-500 animate-pulse" : "bg-destructive")} />
            System {stats.isDbHealthy ? "Healthy" : "Critical"}
          </div>
          <Button className="rounded-full bg-white text-black hover:bg-zinc-200">
            <ShieldAlert className="w-4 h-4 mr-2" /> Security Log
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.label} className="p-6 bg-white/5 border-white/10 rounded-3xl overflow-hidden relative group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-tight">{stat.label}</p>
                <p className="text-3xl font-bold mt-2 tracking-tighter">{stat.value}</p>
              </div>
              <div className={cn("p-4 rounded-2xl bg-white/5", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8 bg-white/5 border-white/10 rounded-3xl">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Management Power Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-20 rounded-2xl border-white/10 bg-white/5 flex items-center justify-start px-6 gap-4 hover:bg-white/10 hover:border-primary/50 transition-all group"
                onClick={handleImpersonate}
              >
                <Search className="w-6 h-6 text-blue-500 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="font-semibold">User Impersonation</p>
                  <p className="text-xs text-muted-foreground">Login as any user.</p>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full h-20 rounded-2xl border-white/10 bg-white/5 flex items-center justify-start px-6 gap-4 hover:bg-white/10 hover:border-destructive/50 transition-all group"
                onClick={handleBan}
              >
                <Ban className="w-6 h-6 text-destructive group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="font-semibold">Ban User</p>
                  <p className="text-xs text-muted-foreground">Restrict platform access.</p>
                </div>
              </Button>
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-20 rounded-2xl border-white/10 bg-white/5 flex items-center justify-start px-6 gap-4 hover:bg-white/10 hover:border-amber-500/50 transition-all group"
                onClick={handleCleanup}
              >
                <Trash2 className="w-6 h-6 text-amber-500 group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <p className="font-semibold">Asset Clean-up</p>
                  <p className="text-xs text-muted-foreground">Identify orphaned images.</p>
                </div>
              </Button>
            </div>
          </div>

          {orphanedImages.length > 0 && (
            <div className="mt-8 p-6 rounded-2xl bg-amber-500/5 border border-amber-500/10">
              <p className="text-sm font-semibold text-amber-500 mb-4 uppercase tracking-wider">Orphaned Assets Detected:</p>
              <div className="space-y-2 max-h-40 overflow-auto">
                {orphanedImages.map(img => (
                  <div key={img} className="text-xs text-zinc-500 font-mono truncate">{img}</div>
                ))}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-8 bg-white/5 border-white/10 rounded-3xl border-l-4 border-l-primary">
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" /> Live Pulse
          </h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold border border-white/10 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">JD</div>
                <div>
                  <p className="font-medium text-zinc-200">Site Generated</p>
                  <p className="text-muted-foreground text-xs">User #82{i} • 2m ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <RevenueHeatmap data={revenueData} />
      </div>
    </div>
  )
}
