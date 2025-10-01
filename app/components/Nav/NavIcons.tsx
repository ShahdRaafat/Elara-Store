import { Button } from "@/components/ui/button";
import { HeartIcon, LogOutIcon, UserIcon } from "lucide-react";
import CartIcon from "./CartIcon";
import Link from "next/link";
import { getCurrentUser } from "@/app/_lib/data-services";
import { signOutAction } from "@/app/_lib/actions";

async function NavIcons() {
  const user = await getCurrentUser();

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

      {!user ? (
        <Button size="sm" asChild>
          <Link href="/login">Login</Link>
        </Button>
      ) : (
        <form action={signOutAction}>
          <Button size="sm" type="submit">
            <LogOutIcon className="size-4 mr-1" />
          </Button>
        </form>
      )}
    </div>
  );
}

export default NavIcons;
