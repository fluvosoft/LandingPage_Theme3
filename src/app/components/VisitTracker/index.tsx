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
  backendUrl,
}: VisitTrackerProps) {
  useEffect(() => {
    if (!customerId) return

    const referrer =
      typeof document !== 'undefined' ? document.referrer : ''

    // Use Next.js API route proxy to avoid mixed content issues
    const url = new URL('/api/visit', window.location.origin)
    url.searchParams.set('path', path)
    url.searchParams.set('customerId', customerId)
    if (referrer) url.searchParams.set('referrer', referrer)

    // Use fetch to call the API proxy route
    fetch(url.toString(), {
      method: 'GET',
      cache: 'no-cache',
    }).catch((error) => {
      // Silently fail - don't break the page if tracking fails
      console.debug('Visit tracking failed:', error)
    })
  }, [customerId, path])

  return null // This component renders nothing
}

export default VisitTracker
