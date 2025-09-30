import supabase from "@/app/_lib/supabase";
import { redirect } from "next/navigation";

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;

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

  //save user to profiles table
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
}

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  redirect("/");
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/");
}

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  console.log(data);
  if (error) {
    throw new Error(error.message);
  }
}
