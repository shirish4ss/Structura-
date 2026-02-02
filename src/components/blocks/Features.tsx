"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FeaturesSection } from "@/types/site"
import { cn } from "@/lib/utils"
import * as LucideIcons from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sparkles, Loader2 } from "lucide-react"
import { useSiteStore } from "@/store/useSiteStore"

export function Features({ id, content, style }: FeaturesSection) {
  const { title, subtitle, features } = content
  const { updateSection } = useSiteStore()
  const [isRewriting, setIsRewriting] = useState(false)

  const handleRewrite = async (text: string, featureIndex: number) => {
    setIsRewriting(true)
    try {
      const res = await fetch("/api/ai/rewrite", {
        method: "POST",
        body: JSON.stringify({ text, tone: "compelling" }),
      })
      const data = await res.json()

      const newFeatures = [...features]
      newFeatures[featureIndex] = { ...newFeatures[featureIndex], description: data.text }

      updateSection("index", id, { features: newFeatures })
    } catch (error) {
      console.error("Rewrite failed", error)
    } finally {
      setIsRewriting(false)
    }
  }

  return (
    <section className={cn(
      "px-6 py-24 bg-background",
      style?.glassmorphism && "backdrop-blur-md bg-white/5"
    )}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-20">
          {title && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold tracking-tight"
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const iconName = (feature.icon || "Zap") as keyof typeof LucideIcons;
            const IconComponent = (LucideIcons[iconName] as React.ElementType) || LucideIcons.Zap

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative p-8 rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
              >
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {feature.description}
                </p>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full opacity-0 group-hover:opacity-100 transition-opacity border border-white/5 rounded-xl text-xs"
                  onClick={() => handleRewrite(feature.description, index)}
                  disabled={isRewriting}
                >
                  {isRewriting ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Sparkles className="w-3 h-3 mr-2 text-primary" />}
                  AI Refine Text
                </Button>
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
