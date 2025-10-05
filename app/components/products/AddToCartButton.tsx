"use client";
import { Product } from "@/app/types/product";
import { Button } from "@/components/ui/button";
import { ShoppingCartIcon } from "lucide-react";
import React from "react";

interface AddToCartButtonProps {
  product: Product;
}

function AddToCartButton({ product }: AddToCartButtonProps) {
  return (
    <Button
      className=" rounded-lg w-full "
      onClick={(e) => e.preventDefault()}
      size="lg"
    >
      <span>
        <ShoppingCartIcon />
      </span>
      <span>Add to cart</span>
    </Button>
  );
}

export default AddToCartButton;
