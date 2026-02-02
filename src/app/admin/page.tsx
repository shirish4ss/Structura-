"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  Globe,
  CreditCard,
  Activity,
  Trash2,
  ShieldAlert,
  Search
} from "lucide-react"

export default function AdminPage() {
  const stats = [
    { label: "Total Users", value: "1,284", icon: Users, color: "text-blue-500" },
    { label: "Active Sites", value: "3,492", icon: Globe, color: "text-emerald-500" },
    { label: "Monthly Revenue", value: "$42,850", icon: CreditCard, color: "text-amber-500" },
    { label: "AI Usage", value: "84%", icon: Activity, color: "text-purple-500" },
  ]

  return (
    <div className="p-10 bg-zinc-950 min-h-screen text-white space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Admin Control</h1>
          <p className="text-muted-foreground mt-2">Manage your high-end SaaS platform.</p>
        </div>
        <Button className="rounded-full bg-primary hover:bg-primary/90">
          <ShieldAlert className="w-4 h-4 mr-2" /> System Health
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6 bg-white/5 border-white/10 rounded-3xl overflow-hidden relative group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={cn("p-3 rounded-2xl bg-white/5", stat.color)}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 p-8 bg-white/5 border-white/10 rounded-3xl">
          <h3 className="text-xl font-semibold mb-6">Power Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button variant="outline" className="h-24 rounded-2xl border-white/10 bg-white/5 flex flex-col gap-2 hover:bg-white/10">
              <Search className="w-6 h-6 text-primary" />
              User Impersonation
            </Button>
            <Button variant="outline" className="h-24 rounded-2xl border-white/10 bg-white/5 flex flex-col gap-2 hover:bg-white/10">
              <Trash2 className="w-6 h-6 text-destructive" />
              Asset Clean-up
            </Button>
          </div>
        </Card>

        <Card className="p-8 bg-white/5 border-white/10 rounded-3xl">
          <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4 text-sm">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs">JD</div>
                <div>
                  <p className="font-medium text-white">John Doe generated a site</p>
                  <p className="text-muted-foreground text-xs">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(" ")
}
