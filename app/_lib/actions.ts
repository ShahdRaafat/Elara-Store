"use server";
import { createClient } from "@/app/_lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { OrderData } from "../types/order";
import {
  getCurrentUser,
  insertOrder,
  insertOrderItems,
  insertProduct,
  insertProductVariants,
  uploadProductImage,
} from "./data-services";
import { ProductFormInputs } from "../components/admin/NewProduct/NewProductForm";

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

  const { error } = await supabase.auth.signInWithPassword({
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

export async function getUserInfo() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const supabase = await createClient();
  const { data: userInfo, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw new Error(error.message);
  return userInfo;
}

export async function updateUserInfo(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const supabase = await createClient();
  const updates = {
    full_name: formData.get("full_name"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    city: formData.get("city"),
  };

  const { error } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (error) throw new Error(error.message);

  revalidatePath("/account");
}

export async function getUserOrders() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(name, image_url))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function addNewProduct(formData: ProductFormInputs) {
  try {
    let totalStock = 0;

    if (formData.hasVariants) {
      const variants = formData.variants || [];
      totalStock = variants.reduce((sum, v) => sum + Number(v.stock), 0);
    } else {
      totalStock = Number(formData.stock || 0);
    }

    const image_url = await uploadProductImage(formData.image[0]);

    const ProductData = {
      name: formData.name as string,
      price: Number(formData.price),
      description: formData.description as string,
      category: formData.category as string,
      image_url: image_url,
      stock: totalStock,
      has_variants: formData.hasVariants === true,
    };

    const product = await insertProduct(ProductData);

    if (formData.hasVariants === true) {
      const variants = formData.variants || [];
      const productVariantsData = variants.map((variant) => {
        return {
          product_id: product.id,
          size: variant.size,
          stock: Number(variant.stock),
        };
      });
      await insertProductVariants(productVariantsData);
    }
    return product;
  } catch (error) {
    console.error("Add new product error:", error);
    throw error;
  }
}
