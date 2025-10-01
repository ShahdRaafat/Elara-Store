import { createClient } from "@/app/_lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  if (code) {
    const supabase = await createClient();

    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code:", error);
      return NextResponse.redirect(`${origin}/login?error=auth_error`);
    }

    // Get user info
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Create/update profile
    if (user) {
      const { error: profileError } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          email: user.email,
          full_name:
            user.user_metadata.full_name || user.user_metadata.name || "",
        },
        {
          onConflict: "id",
        }
      );

      if (profileError) {
        console.error("Profile error:", profileError);
      }
    }
  }

  // Redirect to home page
  return NextResponse.redirect(`${origin}/`);
}
