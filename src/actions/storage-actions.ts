"use server"

import { supabase } from "@/lib/storage"

export async function uploadImage(file: File) {
  try {
    const fileName = `${Date.now()}-${file.name}`
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file)

    if (error) throw error

    const { data: { publicUrl } } = supabase.storage
      .from("images")
      .getPublicUrl(data.path)

    return { success: true, url: publicUrl }
  } catch (error) {
    console.error("Upload error:", error)
    return { success: false, error: "Upload failed." }
  }
}
