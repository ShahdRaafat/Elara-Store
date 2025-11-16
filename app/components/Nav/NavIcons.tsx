"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HeartIcon,
  LogOutIcon,
  UserIcon,
  LayoutDashboardIcon,
} from "lucide-react";
import CartIcon from "./CartIcon";
import Link from "next/link";
import { createClient } from "@/app/_lib/supabase/client";
import { User } from "@supabase/supabase-js";

export default function NavIcons() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>("");
  console.log(role);
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

  useEffect(() => {
    async function fetchUserRole() {
      if (!user) {
        setRole("");
        return;
      }

      const supabase = createClient();
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      console.log(data);
      if (data && !error) {
        setRole(data.role);
      }
    }

    fetchUserRole();
  }, [user]);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    setRole("");
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
        <>
          <Button
            size="sm"
            variant="icon"
            onClick={handleLogout}
            title="Logout"
          >
            <LogOutIcon className="size-4 mr-1" />
          </Button>

          {role === "admin" && (
            <Button size="sm" variant="outline" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          )}
        </>
      )}
    </div>
  );
}
