"use client"

import { Card } from "@/components/ui/card"
import { BarChart, Users, ArrowUpRight, TrendingUp } from "lucide-react"

export function AnalyticsDashboard({ totalViews }: { totalViews: number }) {
  return (
    <Card className="p-8 bg-zinc-900 border-white/10 rounded-3xl space-y-6 overflow-hidden relative group">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Site Traffic</p>
          <h3 className="text-3xl font-bold tracking-tighter">{totalViews.toLocaleString()}</h3>
          <p className="text-xs text-emerald-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +12% from last week
          </p>
        </div>
        <div className="p-3 rounded-2xl bg-white/5 text-primary">
          <BarChart className="w-5 h-5" />
        </div>
      </div>

      <div className="h-20 flex items-end gap-1 px-1">
        {[40, 70, 45, 90, 65, 80, 50, 85, 30, 60, 75, 40].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-colors"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-white/5">
         <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Users className="w-3 h-3" /> Unique Visitors: <span className="text-white font-medium">{Math.floor(totalViews * 0.7)}</span>
         </div>
         <ArrowUpRight className="w-4 h-4 text-zinc-600" />
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
    </Card>
  )
}
