import { auth } from "@clerk/nextjs/server"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Globe, Settings, Edit3, CreditCard } from "lucide-react"
import Link from "next/link"
import { ReferralCard } from "@/components/dashboard/ReferralCard"
import { AnalyticsDashboard } from "@/components/dashboard/AnalyticsDashboard"
import { SocialGenerator } from "@/components/dashboard/SocialGenerator"

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const sites = await prisma.site.findMany({
    where: { userId },
    include: { pages: true, analytics: true }
  })

  const totalViews = sites.reduce((acc, site) => acc + site.analytics.length, 0)

  return (
    <div className="p-10 bg-zinc-950 min-h-screen text-white space-y-12">
      <header className="flex justify-between items-end">
        <div>
           <h1 className="text-4xl font-bold tracking-tight">Your Dashboard</h1>
           <p className="text-zinc-500 mt-2">Manage your AI-powered web presence.</p>
        </div>
        <Link href="/onboarding">
           <Button className="rounded-full shadow-lg shadow-primary/20">
              <Plus className="w-4 h-4 mr-2" /> New Site
           </Button>
        </Link>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sites.length === 0 ? (
                 <Card className="col-span-2 p-20 border-dashed border-white/10 bg-white/5 flex flex-col items-center text-center gap-4 rounded-3xl">
                    <div className="p-4 bg-primary/10 rounded-full text-primary">
                       <Globe className="w-8 h-8" />
                    </div>
                    <div>
                       <h3 className="text-xl font-bold">No sites yet</h3>
                       <p className="text-zinc-500 max-w-xs mx-auto">Build your first high-end website with Lumina AI.</p>
                    </div>
                    <Link href="/onboarding">
                       <Button variant="outline" className="rounded-xl border-white/10 hover:bg-white/5">Start Generating</Button>
                    </Link>
                 </Card>
              ) : (
                sites.map(site => (
                  <Card key={site.id} className="p-6 bg-white/5 border-white/10 rounded-3xl hover:bg-white/10 transition-all group">
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                           {site.subdomain.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <Link href={`/dashboard/settings?siteId=${site.id}`}>
                              <Button size="icon" variant="ghost" className="rounded-xl hover:bg-white/5"><Settings className="w-4 h-4" /></Button>
                           </Link>
                           <Link href={`/dashboard/editor?siteId=${site.id}`}>
                              <Button size="icon" variant="ghost" className="rounded-xl hover:bg-white/5 text-primary"><Edit3 className="w-4 h-4" /></Button>
                           </Link>
                        </div>
                     </div>
                     <h3 className="text-lg font-bold mb-1">{site.subdomain}.lumina.com</h3>
                     <p className="text-xs text-zinc-500">{site.pages.length} Pages • {site.isPublished ? "Published" : "Draft"}</p>
                  </Card>
                ))
              )}
           </div>

           {sites.length > 0 && (
             <SocialGenerator
               siteName={sites[0].subdomain}
               description="High-end AI powered business website."
             />
           )}
        </div>

        <div className="space-y-8">
           <AnalyticsDashboard totalViews={totalViews} />
           <ReferralCard />

           <Card className="p-8 bg-zinc-900 border-white/10 rounded-3xl space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-2">
                 <CreditCard className="w-4 h-4 text-primary" /> Billing & Plan
              </h3>
              <div className="space-y-1">
                 <p className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Current Plan</p>
                 <p className="text-xl font-bold">Lumina Free</p>
              </div>
              <Link href="/dashboard/billing">
                 <Button className="w-full rounded-xl bg-white text-black hover:bg-zinc-200">Upgrade to Pro</Button>
              </Link>
           </Card>
        </div>
      </div>
    </div>
  )
}
