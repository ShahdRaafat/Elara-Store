"use server";

import { CartItemType } from "../types/cart";
import { OrderData } from "../types/order";
import { getCurrentUser, insertOrder, insertOrderItems } from "./data-services";
import { stripe } from "./stripe";
import { createClient } from "./supabase/server";

export async function createStripeSession(formData: OrderData) {
  try {
    const lineItems = formData.cart.map((item: CartItemType) => ({
      price_data: {
        currency: "egp",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/ordersuccess?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      metadata: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        governorate: formData.governorate,
        postalCode: formData.postalCode || "",
        cartItems: JSON.stringify(
          formData.cart.map((item) => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            size: item.size,
            has_variants: item.has_variants,
          }))
        ),
      },
    });

    return { url: session.url };
  } catch (error) {
    console.error("Stripe session error:", error);
    throw new Error("Failed to create Stripe session");
  }
}

export async function createOrderFromStripeSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verify payment was successful
    if (session.payment_status !== "paid") {
      throw new Error("Payment not completed");
    }

    if (!session.metadata) {
      throw new Error("Missing order metadata");
    }

    const supabase = await createClient();

    // Check if order already exists (idempotency)
    const { data: existingOrder } = await supabase
      .from("orders")
      .select("id")
      .eq("stripe_session_id", sessionId)
      .single();

    if (existingOrder) {
      return existingOrder;
    }

    const user = await getCurrentUser();

    // Create order data
    const orderData = {
      user_id: user?.id ?? null,
      first_name: session.metadata.firstName,
      last_name: session.metadata.lastName,
      email: session.metadata.email,
      phone: session.metadata.phone,
      address: session.metadata.address,
      city: session.metadata.city,
      governorate: session.metadata.governorate,
      postal_code: session.metadata.postalCode,
      payment_method: "card" as const,
      total: (session.amount_total ?? 0) / 100,
      status: "processing",
      payment_status: "paid" as const,
      stripe_session_id: sessionId,
    };

    // Insert order
    const order = await insertOrder(orderData);

    // Insert order items
    const cartItems = JSON.parse(session.metadata.cartItems || "[]");
    await insertOrderItems(order.id, cartItems);

    return order;
  } catch (error) {
    console.error("Error processing Stripe payment:", error);
    throw error;
  }
}
