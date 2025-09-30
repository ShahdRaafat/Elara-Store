"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ensureProfile } from "@/app/_lib/actions";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function finishLogin() {
      try {
        await ensureProfile();

        router.push("/");
      } catch (err) {
        console.error(err);
        router.push("/login");
      }
    }

    finishLogin();
  }, [router]);

  return <p>Signing you in...</p>;
}
