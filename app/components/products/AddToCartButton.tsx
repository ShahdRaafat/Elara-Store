"use client";
import { useCart } from "@/app/_contexts/CartContext";
import { Product } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import React from "react";

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
  size?: string;
}

function AddToCartButton({ product, quantity, size }: AddToCartButtonProps) {
  const { cart, addToCart } = useCart();
  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    addToCart(product, quantity, size);
    // toast.success("Item was added successfully to cart");
  }
  return (
    <Button className=" rounded-lg w-full " onClick={handleClick} size="lg">
      <span>
        <ShoppingCartIcon />
      </span>
      <span>Add to cart</span>
    </Button>
  );
}

export default AddToCartButton;
