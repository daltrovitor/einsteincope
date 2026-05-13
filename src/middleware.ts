import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /_static (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)',
  ],
}

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const hostname = req.headers.get('host') || ''

  // Define domains we want to handle
  // In production, these would be your actual domains
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000'
  
  // Extract subdomain
  const subdomain = hostname.replace(`.${rootDomain}`, '')

  // Handle subdomains
  if (subdomain === 'rifas' || hostname.startsWith('rifas.')) {
    return NextResponse.rewrite(new URL(`/_sites/rifas${url.pathname}`, req.url))
  }

  if (subdomain === 'admin' || hostname.startsWith('admin.')) {
    return NextResponse.rewrite(new URL(`/_sites/admin${url.pathname}`, req.url))
  }

  // Default path for root domain
  return NextResponse.next()
}
