"use server";
import { createClient } from "@/app/_lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function signUpAction(
  email: string,
  password: string,
  fullName: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
      },
    },
  });

  if (error) throw new Error(error.message);

  // Save user to profiles table
  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert([
        { id: data.user.id, email: data.user.email, full_name: fullName },
      ]);
    if (profileError) {
      throw new Error(profileError.message);
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInAction(email: string, password: string) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signOutAction() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signInWithGoogleAction() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `http://localhost:3000//auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data.url) {
    redirect(data.url);
  }
}
