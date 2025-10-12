import { createClient } from "./supabase/server";
import { createPublicClient } from "./supabase/public";
export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }

    return user;
  } catch (error) {
    console.error("Unexpected error in getCurrentUser:", error);
    return null;
  }
}

export async function getProducts(sortBy?: string) {
  const supabase = createPublicClient();

  // Default sort
  let column = "created_at";
  let ascending = true;

  if (sortBy) {
    const [col, dir] = sortBy.split("-");
    column = col;
    ascending = dir === "asc";
  }

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order(column, { ascending });

  if (error) {
    console.error(error);
    return [];
  }

  return products;
}
export async function getProductsByCategory(category: string) {
  const supabase = createPublicClient();
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category);

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }
  return products;
}
export async function getProduct(productId: string) {
  const supabase = createPublicClient();
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId)
    .single();

  if (error) {
    throw new Error("Product is not found");
  }

  return product;
}

export async function getProductVariants(productId: string) {
  const supabase = createPublicClient();
  const { data: productVariants, error } = await supabase
    .from("product_variants")
    .select("*")
    .eq("product_id", productId);

  if (error) throw new Error("Couldn't find variants");

  return productVariants;
}
