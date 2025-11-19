"use client";
import Link from "next/link";
import { MenuIcon, Package, PlusIcon, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { name: "Add Product", icon: <PlusIcon />, href: "/admin" },
  { name: "Products List", icon: <ShoppingBag />, href: "/admin/products" },
  { name: "Orders Management", icon: <Package />, href: "/admin/orders" },
];

function SidebarNavigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Mobile menu button */}
      <div className="lg:hidden flex justify-between items-center   ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md hover:bg-primary-900 transition-colors"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-primary-200" />
          ) : (
            <MenuIcon className="h-6 w-6 text-primary-200" />
          )}
        </button>
      </div>
      <nav
        className={`
        border-r border-primary-900 
        lg:block 
        ${isOpen ? "block" : "hidden"}
        absolute lg:relative 
        md:top-[100%]
        lg:top-0
        left-0 
        w-full lg:w-auto 
        bg-white lg:bg-transparent 
        z-50 lg:z-auto
        shadow-lg lg:shadow-none
      `}
      >
        <div>
          <ul className="flex flex-col gap-2 h-full text-base sm:text-lg p-4 lg:p-0">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={`${link.href}`}
                  className={`flex gap-4 px-5 py-3 hover:bg-brand-500 hover:text-white transition-colors items-center rounded-md text-gray-700
                  ${pathname === link.href ? "bg-brand-500 text-white" : ""}
                  `}
                >
                  {link.icon}
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/*overlay*/}
      <div
        className={`
        lg:hidden
        ${isOpen ? "block" : "hidden"}
        fixed
        inset-0
        bg-black
        opacity-50
        z-40
      `}
        onClick={() => setIsOpen(false)}
      ></div>
    </div>
  );
}

export default SidebarNavigation;
