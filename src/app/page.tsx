"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import { Sparkles, ArrowRight, ShieldCheck, Zap, Globe } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center font-bold text-lg">L</div>
            <span className="text-xl font-bold tracking-tight">Lumina</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#showcase" className="hover:text-white transition-colors">Showcase</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/onboarding">
              <Button className="rounded-full px-6">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/20 blur-[120px] rounded-full opacity-50 z-0" />

        <div className="container relative z-10 mx-auto px-6 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-primary"
          >
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Website Builder</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]"
          >
            Build the future of your <span className="text-primary italic">business</span> in seconds.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-zinc-400 max-w-2xl mx-auto"
          >
            Lumina uses advanced AI to generate stunning, multi-page websites tailored to your brand. No code, no limits, just results.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/onboarding">
              <Button size="lg" className="h-14 px-8 rounded-2xl text-lg shadow-2xl shadow-primary/20 group">
                Create Your Site <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="h-14 px-8 rounded-2xl text-lg border-white/10 hover:bg-white/5">
              View Showcase
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section id="features" className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 p-10 rounded-3xl border border-white/10 bg-white/5 overflow-hidden relative group">
            <Zap className="w-10 h-10 text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-4">Instant Generation</h3>
            <p className="text-zinc-400 max-w-md">Our AI analyzes your business description and generates a complete structure including copy, images, and layout in under 30 seconds.</p>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />
          </div>

          <div className="p-10 rounded-3xl border border-white/10 bg-white/5">
            <Globe className="w-10 h-10 text-emerald-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Multi-Tenant</h3>
            <p className="text-zinc-400">Launch unlimited subdomains or connect your custom domains with one click.</p>
          </div>

          <div className="p-10 rounded-3xl border border-white/10 bg-white/5">
            <ShieldCheck className="w-10 h-10 text-blue-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">SECURE & FAST</h3>
            <p className="text-zinc-400">Built on Next.js 15, ensuring your sites are blazingly fast and SEO optimized by default.</p>
          </div>

          <div className="md:col-span-2 p-10 rounded-3xl border border-white/10 bg-white/5 flex items-center justify-between">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-4">High-End Aesthetics</h3>
              <p className="text-zinc-400">Every component is crafted with &quot;Silicon Valley&quot; standards in mind – clean lines, subtle borders, and smooth animations.</p>
            </div>
            <div className="hidden sm:block w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-zinc-800 rotate-12" />
          </div>
        </div>
      </section>

      <footer className="py-20 border-t border-white/5 text-center text-zinc-500 text-sm">
        <p>© 2024 Lumina AI. All rights reserved.</p>
      </footer>
    </div>
  )
}
