import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host');

  if (hostname) {
    const domain = hostname.replace(/:\d+$/, '');

    const isLocalhost = domain.endsWith('.localhost');
    const isVercelApp = domain.endsWith('.meuchadigital.com');

    // Ignorar chamadas para a API
    if (req.nextUrl.pathname.startsWith('/api')) {
      return NextResponse.next();
    }

    if (isLocalhost || isVercelApp) {
      const subdomain = domain.split('.')[0];

      const newUrl = new URL(req.url);
      newUrl.pathname = `/subdomain/${subdomain}${req.nextUrl.pathname}`;
      return NextResponse.rewrite(newUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)' // Ignorar API e arquivos estáticos
  ]
};
