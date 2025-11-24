import { CartItemType } from "../types/cart";
import { OrderInsert } from "../types/order";
import { ProductInsert, ProductVariantInsert } from "../types/product";
import { createPublicClient } from "./supabase/public";
import { createClient } from "./supabase/server";
export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    console.log(user);
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
export async function getProductsWithVariants() {
  const supabase = await createClient();

  const { data: products, error } = await supabase.from("products").select(`
      *,
      product_variants (*)
    `);

  if (error) throw new Error(error.message);
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

export async function getVariantId(productId: string, size: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_variants")
    .select("id")
    .eq("product_id", productId)
    .eq("size", size)
    .single();

  if (error) throw new Error(error.message);
  return data.id;
}

export async function getOrder(orderId: string) {
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select("*, order_items(*, products(name, image_url))")
    .eq("id", orderId)
    .single();
  if (error) throw new Error(error.message);
  return order;
}

export async function insertOrderItems(
  orderId: string,
  cartItems: CartItemType[]
) {
  const supabase = await createClient();

  const orderItems = await Promise.all(
    cartItems.map(async (item) => {
      let variant_id: string | null = null;
      if (item.has_variants) {
        variant_id = await getVariantId(item.id, item.size ?? "");
      }
      return {
        order_id: orderId,
        product_id: item.id,
        variant_id,
        quantity: item.quantity,
        price: item.price,
      };
    })
  );

  const { error } = await supabase.from("order_items").insert(orderItems);
  if (error) throw new Error(error.message);
}

// Insert order in database
export async function insertOrder(orderData: OrderInsert) {
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .insert([orderData])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return order;
}

//Insert new product in database
export async function insertProduct(productData: ProductInsert) {
  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from("products")
    .insert([productData])
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return product;
}
export async function insertProductVariants(
  productVariantsData: ProductVariantInsert[]
) {
  const supabase = await createClient();

  const { data: productVariants, error } = await supabase
    .from("product_variants")
    .insert(productVariantsData)
    .select("*");

  if (error) throw new Error(error.message);
  return productVariants;
}

export async function uploadProductImage(imageFile: File): Promise<string> {
  const supabase = await createClient();

  const fileName = imageFile.name;

  const { error: uploadError } = await supabase.storage
    .from("products")
    .upload(fileName, imageFile, {
      cacheControl: "3600",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Failed to upload image: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from("products").getPublicUrl(fileName);

  return data.publicUrl;
}
export async function getOrders() {
  const supabase = await createClient();
  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "*, order_items(*, products(name, image_url),product_variants(size))"
    )
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return orders;
}
