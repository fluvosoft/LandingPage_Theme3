import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const path = searchParams.get('path') || '/'
    const referrer = searchParams.get('referrer') || ''
    const customerId = searchParams.get('customerId')

    if (!customerId) {
      return NextResponse.json(
        { error: 'customerId is required' },
        { status: 400 }
      )
    }

    // Prefer server-side env vars (more secure), fallback to public vars
    const apiBaseUrl =
      process.env.API_BASE_URL ||
      process.env.NEXT_PUBLIC_API_BASE_URL ||
      'http://88.222.245.134:8080/api'

    const url = new URL(`${apiBaseUrl}/customers/${customerId}/visit`)
    url.searchParams.set('path', path)
    if (referrer) {
      url.searchParams.set('referrer', referrer)
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      cache: 'no-cache',
    })

    // Return success even if the backend doesn't respond
    // Visit tracking should be fire-and-forget
    return NextResponse.json(
      { success: true },
      { status: response.ok ? response.status : 200 }
    )
  } catch (error: any) {
    // Silently fail - don't break the page if tracking fails
    console.debug('Visit tracking failed:', error)
    return NextResponse.json({ success: false }, { status: 200 })
  }
}
