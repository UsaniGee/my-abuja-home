import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Optimizes Cloudinary image URLs by adding transformation parameters
 * @param url - Original Cloudinary URL
 * @param width - Optional width constraint (default: 1200)
 * @returns Optimized URL with auto format, quality, and width
 */
export function optimizeCloudinaryUrl(url: string, width: number = 1200): string {
  if (!url.includes('res.cloudinary.com')) return url
  
  if (url.includes('f_auto') || url.includes('q_auto')) return url
  
  return url.replace(
    '/upload/',
    `/upload/f_auto,q_auto,w_${width}/`
  )
}
