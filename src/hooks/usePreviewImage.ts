import { ChangeEvent, useEffect, useState } from "react"

export function usePreviewImage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [image, setImage] = useState<File | null>(null)

  const handlePartnerImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      setPreviewImage(null)
      setImage(null)
      return
    }

    const file = e.target.files[0]
    const previewURL = URL.createObjectURL(file)
    setPreviewImage(previewURL)
    setImage(file)

    useEffect(() => {
      return () => {
        if (previewImage) {
          URL.revokeObjectURL(previewImage)
        }
      }
    }, [previewImage])
  }

  return { previewImage, handlePartnerImageChange, image }
}
