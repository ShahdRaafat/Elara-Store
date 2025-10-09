"use client";
import { useCart } from "@/app/_contexts/CartContext";
import { Product } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
  size?: string;
  disabled?: boolean;
}

function AddToCartButton({
  product,
  quantity,
  size,
  disabled,
}: AddToCartButtonProps) {
  const { cart, addToCart } = useCart();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (disabled) return;
    addToCart(product, quantity, size);
    toast.success("Item was added successfully to cart");
  }

  return (
    <Button
      className=" rounded-lg w-full "
      onClick={handleClick}
      size="lg"
      disabled={disabled}
    >
      <span>
        <ShoppingCartIcon />
      </span>
      <span>Add to cart</span>
    </Button>
  );
}

export default AddToCartButton;
