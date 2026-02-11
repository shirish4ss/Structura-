"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function AnnouncementBar({ content }: { content: { text: string, link?: string } }) {
  if (!content.text) return null

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-primary text-white py-2 px-6 text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-3 cursor-pointer group"
      onClick={() => content.link && window.open(content.link, "_blank")}
    >
      <span>{content.text}</span>
      {content.link && <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />}
    </motion.div>
  )
}
