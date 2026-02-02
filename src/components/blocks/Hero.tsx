"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HeroSection } from "@/types/site"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Hero({ content, style }: HeroSection) {
  const { title, subtitle, primaryCtaText, secondaryCtaText, image } = content
  const variant = style?.variant || "minimal"

  return (
    <section className={cn(
      "relative min-h-[80vh] flex items-center justify-center overflow-hidden px-6 py-24",
      style?.glassmorphism && "backdrop-blur-md bg-white/5",
      variant === "luxury" ? "bg-zinc-950 text-white" : "bg-background text-foreground"
    )}>
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,#ffffff33,transparent)]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            {primaryCtaText && (
              <Button size="lg" className="rounded-full px-8 text-lg h-12 shadow-lg shadow-primary/20">
                {primaryCtaText}
              </Button>
            )}
            {secondaryCtaText && (
              <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-12 border-white/10 hover:bg-white/5">
                {secondaryCtaText}
              </Button>
            )}
          </motion.div>
        </div>

        {image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="mt-16 rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 z-10" />
            <Image
              src={image}
              alt={title}
              width={1200}
              height={800}
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
