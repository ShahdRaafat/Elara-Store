"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  title: string;
  className?: string;
  onClick?: () => void;
}

function NavLink({ href, title, className, onClick }: NavLinkProps) {
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
      {title}
    </Link>
  );
}

export default NavLink;
