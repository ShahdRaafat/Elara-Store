import { signInWithGoogle } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function GoogleLogin() {
  return (
    <form action={signInWithGoogle}>
      <Button
        variant="outline"
        type="submit"
        className="mt-4 w-full  py-2 rounded-lg transition"
      >
        <span>
          <Image width={20} height={20} src="/Google.png" alt="Google Logo" />
        </span>
        Sign in with Google
      </Button>
    </form>
  );
}

export default GoogleLogin;
