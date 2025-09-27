"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import NavIcons from "./NavIcons";
import NavLink from "./NavLink";
import Search from "./Search";

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
          <NavLink href="/" title="Home" />
        </li>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className={`hover:text-brand-500 ${
                  pathname.includes("/products") ? "text-brand-500" : ""
                }`}
                variant="ghost"
              >
                Products
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((cat) => (
                <DropdownMenuItem key={cat.slug} asChild>
                  <NavLink
                    href={`/products/${cat.slug}`}
                    title={`${cat.name}`}
                  />
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <NavLink href="/contact" title="Contact" />
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
                <NavLink
                  href="/"
                  title="Home"
                  onClick={closeMenu}
                  className="block py-2 text-lg"
                />
              </li>

              <li>
                <div className="py-2">
                  <span
                    className={`text-lg ${
                      pathname.includes("/products") ? "text-brand-500" : ""
                    }`}
                  >
                    Products
                  </span>
                  <ul className="mt-2 ml-4 space-y-2">
                    {categories.map((cat) => (
                      <li key={cat.slug}>
                        <NavLink
                          href={`/products/${cat.slug}`}
                          onClick={closeMenu}
                          title={`${cat.name}`}
                          className="block py-1 text-gray-600 dark:text-gray-300"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              <li>
                <NavLink
                  href="/contact"
                  onClick={closeMenu}
                  title="Contact"
                  className="block py-2 text-lg"
                />
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
