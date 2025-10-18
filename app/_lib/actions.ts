"use server";
import { createClient } from "@/app/_lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { OrderData } from "../types/order";
import { getCurrentUser, insertOrder, insertOrderItems } from "./data-services";

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

export async function createCashOrder(formData: OrderData) {
  try {
    const user = await getCurrentUser();

    const orderData = {
      user_id: user?.id ?? null,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      governorate: formData.governorate,
      postal_code: formData.postalCode,
      payment_method: "cash" as const,
      total: formData.total,
      status: "processing",
      payment_status: "pending" as const,
    };

    const order = await insertOrder(orderData);

    // Insert order items
    await insertOrderItems(order.id, formData.cart);

    return order;
  } catch (error) {
    console.error("Cash order error:", error);
    throw error;
  }
}
