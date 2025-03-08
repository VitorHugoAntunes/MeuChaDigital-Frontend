import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const hostname = req.headers.get('host'); // Exemplo: "teste.localhost:3000"

  if (hostname) {
    const parts = hostname.split('.');
    if (parts.length >= 2 && parts[1] === 'localhost') {
      const subdomain = parts[0]; // "teste" em "teste.localhost"

      // Redireciona para uma rota específica no frontend
      const newUrl = new URL(req.url);
      newUrl.pathname = `/subdomain/${subdomain}`;
      return NextResponse.rewrite(newUrl);
    }
  }

  return NextResponse.next();
}
