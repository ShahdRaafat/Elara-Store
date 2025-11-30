"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  title?: string;
}

function NavLink({ href, children, className, onClick, title }: NavLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={`hover:text-brand-500 transition-colors ${
        pathname === href ? "text-brand-500" : ""
      }
    ${className ? className : ""}
    `}
      onClick={onClick}
    >
      {children ? children : null}
      {title ? title : null}
    </Link>
  );
}

export default NavLink;
