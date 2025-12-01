"use client";
import { signInWithGoogleAction } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

function GoogleLogin() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogleAction();
    } catch (error) {
      console.error("Google sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="mt-4 w-full py-2 rounded-lg transition disabled:opacity-50"
    >
      <span className="mr-2">
        <Image width={20} height={20} src="/Google.webp" alt="Google Logo" />
      </span>
      {isLoading ? "Redirecting..." : "Sign in with Google"}
    </Button>
  );
}

export default GoogleLogin;
