import Link from "next/link";
import { Package, PlusIcon, ShoppingBag } from "lucide-react";

const navLinks = [
  { name: "Add Product", icon: <PlusIcon />, href: "/admin" },
  { name: "Products List", icon: <ShoppingBag />, href: "/admin/products" },
  { name: "Orders Management", icon: <Package />, href: "/admin/orders" },
];

function SidebarNavigation() {
  return (
    <nav
      className={`
        border-r border-primary-900 
        lg:block 
        
        absolute lg:relative 
        md:top-[100%]
        lg:top-0
        left-0 
        w-full lg:w-auto 
        bg-primary-950 lg:bg-transparent 
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
                className="flex gap-4 px-5 py-3 hover:bg-brand-500 hover:text-white transition-colors items-center rounded-md text-gray-700"
              >
                {link.icon}
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default SidebarNavigation;
