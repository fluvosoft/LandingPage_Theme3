'use client'
import { useEffect } from 'react'

interface VisitTrackerProps {
  customerId: string
  path?: string
  backendUrl?: string
}

export function VisitTracker({
  customerId,
  path = typeof window !== 'undefined' ? window.location.pathname : '/',
  backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://88.222.245.134:8080/api',
}: VisitTrackerProps) {
  useEffect(() => {
    if (!customerId) return

    const referrer =
      typeof document !== 'undefined' ? document.referrer : ''
    const url = new URL(`${backendUrl}/customers/${customerId}/visit`)
    url.searchParams.set('path', path)
    if (referrer) url.searchParams.set('referrer', referrer)

    // Use image pixel method (most reliable, no CORS issues)
    const img = new Image()
    img.src = url.toString()
    img.width = 1
    img.height = 1
    img.style.position = 'absolute'
    img.style.visibility = 'hidden'

    // Optional: Add to body temporarily
    if (typeof document !== 'undefined') {
      document.body.appendChild(img)
      setTimeout(() => {
        if (document.body.contains(img)) {
          document.body.removeChild(img)
        }
      }, 100)
    }
  }, [customerId, path, backendUrl])

  return null // This component renders nothing
}

export default VisitTracker
