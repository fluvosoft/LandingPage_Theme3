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
  backendUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://88.222.245.134:8080/api',
}: UseVisitTrackerOptions) {
  useEffect(() => {
    if (!customerId) return

    const trackVisit = async () => {
      try {
        const url = new URL(`${backendUrl}/customers/${customerId}/visit`)
        if (path) url.searchParams.set('path', path)
        if (referrer) url.searchParams.set('referrer', referrer)

        // Use fetch with no-cors mode for cross-origin requests
        await fetch(url.toString(), {
          method: 'GET',
          mode: 'no-cors', // Important: prevents CORS errors
          cache: 'no-cache',
        })
      } catch (error) {
        // Silently fail - don't break the page if tracking fails
        console.debug('Visit tracking failed:', error)
      }
    }

    trackVisit()
  }, [customerId, path, referrer, backendUrl])
}
