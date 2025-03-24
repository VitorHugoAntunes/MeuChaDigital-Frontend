"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  onClick?: () => void;
  exact?: boolean;
}

export default function NavLink({
  href,
  children,
  variant = 'primary',
  icon,
  onClick,
  exact = true
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  const baseClasses = 'flex items-center space-x-2 transition-colors duration-300';

  let className = `${baseClasses} `;

  if (variant === 'primary') {
    className += 'text-text-primary hover:text-primary-light';
  } else {
    className += 'text-text-secondary hover:text-primary-light';
  }

  if (isActive) {
    className = `${baseClasses} text-primary-light font-semibold border-b-2 border-primary-light hover:text-primary-dark`;
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
    >
      <span>{children}</span>
      {icon && <span className="flex items-center justify-center">{icon}</span>}
    </Link>
  );
}