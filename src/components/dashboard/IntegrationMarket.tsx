"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Zap,
  MessageSquare,
  Share2,
  Lock,
  Plus
} from "lucide-react"

export function IntegrationMarket() {
  const integrations = [
    { name: "Mailchimp", description: "Email marketing automation", icon: Mail, color: "text-[#FFE01B]" },
    { name: "Zapier", description: "Connect to 5,000+ apps", icon: Zap, color: "text-[#FF4A00]" },
    { name: "WhatsApp", description: "Floating contact button", icon: MessageSquare, color: "text-[#25D366]" },
    { name: "Social Links", description: "Dynamic social icons", icon: Share2, color: "text-blue-500" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-xl font-semibold">Integration Market</h3>
          <p className="text-sm text-muted-foreground mt-1">Connect your site to the world.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((item) => (
          <Card key={item.name} className="p-6 bg-white/5 border-white/10 rounded-3xl hover:bg-white/10 transition-colors group">
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className={cn("p-3 rounded-2xl bg-white/5", item.color)}>
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <Button size="sm" variant="ghost" className="rounded-full hover:bg-white/10">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}

        <Card className="p-6 bg-primary/5 border border-dashed border-primary/20 rounded-3xl flex flex-col items-center justify-center text-center gap-2 group cursor-pointer hover:bg-primary/10 transition-colors">
          <Lock className="w-5 h-5 text-primary/50" />
          <p className="text-sm font-medium">Custom Code Block</p>
          <p className="text-xs text-muted-foreground">Pro Feature</p>
        </Card>
      </div>
    </div>
  )
}

function cn(...inputs: (string | boolean | undefined)[]) {
  return inputs.filter(Boolean).join(" ")
}
