"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import NavIcons from "./NavIcons";
import Search from "../Search";
import { useState } from "react";
import { MenuIcon, X } from "lucide-react";

const categories = [
  { name: "All", slug: "" },
  { name: "Clothes", slug: "clothes" },
  { name: "Bags", slug: "bags" },
  { name: "Shoes", slug: "shoes" },
  { name: "Accessories", slug: "accessories" },
];

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="relative">
      {/* Mobile Menu Button */}
      <Button
        size="icon"
        variant="icon"
        className="md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MenuIcon className="size-6" />
      </Button>

      {/* Desktop Nav */}
      <ul className="hidden md:flex flex-row gap-4 md:gap-8 xl:gap-12 items-center justify-between">
        <li>
          <Link
            href="/"
            className={`hover:text-brand-400 transition-colors ${
              pathname === "/" ? "text-brand-400" : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className={`hover:text-brand-400 ${
                  pathname.includes("/products") ? "text-brand-400" : ""
                }`}
                variant="ghost"
              >
                Products
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.slug} asChild>
                  <Link href={`/products/${cat.slug}`}>{cat.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <Link
            href="/contact"
            className={`hover:text-brand-400 transition-colors ${
              pathname.includes("/contact") ? "text-brand-400" : ""
            }`}
          >
            Contact
          </Link>
        </li>

        <li>
          <Search />
        </li>
        <li>
          <NavIcons />
        </li>
      </ul>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={closeMenu}
          />

          {/* Mobile Menu */}
          <div className="fixed top-0 left-0 w-full bg-white shadow-lg z-50 md:hidden p-4">
            <div className="flex justify-end mb-4">
              <Button size="icon" variant="icon" onClick={closeMenu}>
                <X className="size-6" />
              </Button>
            </div>

            {/* Mobile Menu Items */}
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  onClick={closeMenu}
                  className={`block py-2 text-lg hover:text-brand-400 transition-colors ${
                    pathname === "/" ? "text-brand-400" : ""
                  }`}
                >
                  Home
                </Link>
              </li>

              <li>
                <div className="py-2">
                  <span
                    className={`text-lg ${
                      pathname.includes("/products") ? "text-brand-400" : ""
                    }`}
                  >
                    Products
                  </span>
                  <ul className="mt-2 ml-4 space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <Link
                          href={`/products/${cat.slug}`}
                          onClick={closeMenu}
                          className="block py-1 text-gray-600 dark:text-gray-300 hover:text-brand-400 transition-colors"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className={`block py-2 text-lg hover:text-brand-400 transition-colors ${
                    pathname.includes("/contact") ? "text-brand-400" : ""
                  }`}
                >
                  Contact
                </Link>
              </li>

              <li className="pt-4 border-t dark:border-gray-700">
                <Search />
              </li>

              <li className="pt-4">
                <div onClick={closeMenu}>
                  <NavIcons />
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navigation;
