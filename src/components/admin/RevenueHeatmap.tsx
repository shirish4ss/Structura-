"use client"

import { Card } from "@/components/ui/card"
import { Globe, DollarSign } from "lucide-react"

export function RevenueHeatmap({ data }: { data: { name: string, count: number, revenue: number }[] }) {
  return (
    <Card className="p-8 bg-white/5 border-white/10 rounded-3xl space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-500" /> Revenue Heatmap
        </h3>
        <span className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Global Distribution</span>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <p className="text-sm text-zinc-500 italic text-center py-10">No revenue data available yet.</p>
        ) : (
          data.map(country => (
            <div key={country.name} className="space-y-2">
               <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-zinc-300">{country.name}</span>
                  <span className="text-white font-bold">${country.revenue}</span>
               </div>
               <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{ width: `${Math.min(100, (country.revenue / 1000) * 100)}%` }}
                  />
               </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-xs text-zinc-500">
         <DollarSign className="w-3 h-3" /> Total Global Revenue: <span className="text-white font-bold">${data.reduce((acc, c) => acc + c.revenue, 0)}</span>
      </div>
    </Card>
  )
}
