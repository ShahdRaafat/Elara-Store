"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartIcon, LogOutIcon, UserIcon } from "lucide-react";
import CartIcon from "./CartIcon";
import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/client";
import { User } from "@supabase/supabase-js";

export default function NavIcons() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
  }

  return (
    <div className="flex items-center gap-1">
      <Button size="icon" variant="icon" asChild>
        <Link href="/account">
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
        <Button size="sm" variant="icon" onClick={handleLogout} title="Logout">
          <LogOutIcon className="size-4 mr-1" />
        </Button>
      )}
    </div>
  );
}
