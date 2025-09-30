import { Button } from "@/components/ui/button";
import { HeartIcon, LogIn, LogInIcon, UserIcon } from "lucide-react";
import CartIcon from "./CartIcon";
import Link from "next/link";

function NavIcons() {
  return (
    <div className="flex items-center gap-1">
      <Button size="icon" variant="icon" asChild>
        <Link href="/profile">
          <UserIcon className="size-4.5" />
        </Link>
      </Button>
      <Button size="icon" variant="icon" asChild>
        <Link href="/wishlist">
          <HeartIcon className="size-4.5" />
        </Link>
      </Button>
      <Button size="icon" variant="icon" asChild>
        <Link href="/cart" className="relative">
          <CartIcon />
        </Link>
      </Button>

      <Button size="sm" asChild>
        <Link href="/login" className="relative">
          Login
        </Link>
      </Button>
    </div>
  );
}

export default NavIcons;
