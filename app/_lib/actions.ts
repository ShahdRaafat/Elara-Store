"use server";
import { createClient } from "@/app/_lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { OrderData } from "../types/order";
import { getCurrentUser, getVariantId } from "./data-services";

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

export async function createOrder(formData: OrderData) {
  const supabase = await createClient();

  const user = await getCurrentUser();

  const { data: order, error: OrderError } = await supabase
    .from("orders")
    .insert([
      {
        user_id: user?.id ?? null,
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        governorate: formData.governorate,
        postal_code: formData.postalCode,
        payment_method: formData.paymentMethod,
        total: formData.total,
        status: "processing",
        payment_status: formData.paymentMethod === "cash" ? "pending" : "paid",
      },
    ])
    .select()
    .single();
  if (OrderError) throw new Error(OrderError.message);

  const orderItems = await Promise.all(
    formData.cart.map(async (item) => {
      let variant_id: string | null = null;

      if (item.has_variants) {
        variant_id = await getVariantId(item.id, item.size ?? "");
      }
      return {
        order_id: order.id,
        product_id: item.id,
        variant_id,
        quantity: item.quantity,
        price: item.price,
      };
    })
  );

  const { error: OrderItemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (OrderItemsError) throw new Error(OrderItemsError.message);

  return order;
}
