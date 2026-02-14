'use client'
import { useEffect } from 'react'

interface UseVisitTrackerOptions {
  customerId: string
  path?: string
  referrer?: string
  backendUrl?: string
}

export function useVisitTracker({
  customerId,
  path = typeof window !== 'undefined' ? window.location.pathname : '/',
  referrer = typeof document !== 'undefined' ? document.referrer : '',
  backendUrl,
}: UseVisitTrackerOptions) {
  useEffect(() => {
    if (!customerId) return

    const trackVisit = async () => {
      try {
        // Use Next.js API route proxy to avoid mixed content issues
        const url = new URL('/api/visit', window.location.origin)
        url.searchParams.set('path', path)
        url.searchParams.set('customerId', customerId)
        if (referrer) url.searchParams.set('referrer', referrer)

        await fetch(url.toString(), {
          method: 'GET',
          cache: 'no-cache',
        })
      } catch (error) {
        // Silently fail - don't break the page if tracking fails
        console.debug('Visit tracking failed:', error)
      }
    }

    trackVisit()
  }, [customerId, path, referrer])
}
