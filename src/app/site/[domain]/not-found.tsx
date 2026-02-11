import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function SiteNotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="space-y-2">
        <h1 className="text-9xl font-black text-white/5 tracking-tighter">404</h1>
        <h2 className="text-3xl font-bold tracking-tight -mt-16">Page Not Found</h2>
        <p className="text-zinc-500 max-w-sm">The page you are looking for doesn&apos;t exist or has been moved.</p>
      </div>

      <Link href="/">
        <Button className="rounded-full px-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>
      </Link>

      <p className="text-[10px] text-zinc-700 uppercase font-bold tracking-[0.2em] pt-12">
        Lumina AI Website Builder
      </p>
    </div>
  )
}
