"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete";
import { deleteProduct } from "@/app/_lib/actions";
import toast from "react-hot-toast";

function DeleteProduct({ productId }: { productId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDeleteClick() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  async function handleConfirmDelete() {
    try {
      setIsModalOpen(false);
      await deleteProduct(productId);
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete the product. Please try again.");
    }
  }
  return (
    <>
      <Button
        variant="icon"
        className="flex-1 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        onClick={handleDeleteClick}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
      <ConfirmDelete
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default DeleteProduct;
