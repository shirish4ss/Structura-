"use client"

import { useEffect, useRef } from "react"
import { useSiteStore } from "@/store/useSiteStore"
import { updatePage } from "@/actions/site-actions"

export function useAutoSave() {
  const { config, isDirty, setSaved } = useSiteStore()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isDirty || !config) return

    // Debounce saving
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(async () => {
      console.log("Auto-saving changes...")

      try {
        const promises = config.pages.map(page => {
          return updatePage(page.id, page.sections as object)
        })

        const results = await Promise.all(promises)
        const allSuccessful = results.every(r => r.success)

        if (allSuccessful) {
          console.log("Auto-save successful.")
          setSaved()
        } else {
          console.error("Auto-save failed for some pages.")
        }
      } catch (error) {
        console.error("Auto-save error:", error)
      }
    }, 3000)

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [config, isDirty, setSaved])
}
