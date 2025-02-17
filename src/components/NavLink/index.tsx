import Link from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
}

export default function NavLink({ href, children, variant, icon }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-2 transition-colors duration-300 ${variant === 'primary'
        ? 'text-primary-light hover:text-primary-dark'
        : 'text-text-primary hover:text-primary-light'
        }`}
    >
      <span>{children}</span>
      <span className="flex items-center justify-center">{icon}</span>
    </Link>
  );
}