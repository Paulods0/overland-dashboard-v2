import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function renameImageName(image: string) {
  const regex = /[^\w\s]/g
  const imageName = image.split(".")
  const ext = imageName[imageName.length - 1]
  const name = imageName[0]
  const rawName = new Date().getTime() + "-" + name
  const rawNameWithouNonAlphaNumeric = rawName.replace(regex, "")
  const filename = rawNameWithouNonAlphaNumeric.concat(`.${ext}`)

  return filename
}