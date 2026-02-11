"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ShieldCheck } from "lucide-react"

export function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) setShow(true)
  }, [])

  const accept = () => {
    localStorage.setItem("cookie-consent", "true")
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-50"
        >
          <div className="bg-zinc-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl space-y-4">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl text-primary">
                   <ShieldCheck className="w-5 h-5" />
                </div>
                <p className="text-sm font-bold text-white tracking-tight">Cookie Policy</p>
             </div>
             <p className="text-xs text-zinc-400 leading-relaxed">
                We use cookies to enhance your experience and analyze our traffic. By clicking &quot;Accept&quot;, you consent to our use of cookies.
             </p>
             <div className="flex gap-3">
                <Button size="sm" className="flex-1 rounded-xl" onClick={accept}>Accept</Button>
                <Button size="sm" variant="outline" className="flex-1 rounded-xl border-white/10 hover:bg-white/5" onClick={() => setShow(false)}>Decline</Button>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
