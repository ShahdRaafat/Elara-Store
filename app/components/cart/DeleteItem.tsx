import { CartItemType } from "@/app/types/cart";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteItemProps {
  item: CartItemType;
  onDelete: (id: string, size?: string) => void;
}

function DeleteItem({ item, onDelete }: DeleteItemProps) {
  function handleClick() {
    onDelete(item.id, item.size);
    toast.success("Item was deleted successfullyy");
  }

  return (
    <Button
      size="sm"
      variant="ghost"
      className="text-red-500 hover:bg-red-100 rounded-full"
      onClick={handleClick}
    >
      <Trash />
    </Button>
  );
}

export default DeleteItem;
