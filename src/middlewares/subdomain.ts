import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host');

  if (hostname) {
    const domain = hostname.replace(/:\d+$/, '');

    const isLocalhost = domain.endsWith('.localhost');
    const isVercelApp = domain.endsWith('.meu-cha-digital-frontend.vercel.app');

    if (isLocalhost || isVercelApp) {
      const subdomain = domain.split('.')[0];

      const newUrl = new URL(req.url);
      newUrl.pathname = `/subdomain/${subdomain}`;
      return NextResponse.rewrite(newUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ]
};