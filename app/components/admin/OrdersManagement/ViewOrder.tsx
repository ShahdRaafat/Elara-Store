"use client";
import { Order } from "@/app/types/order";
import { Eye } from "lucide-react";
import { useState } from "react";
import OrderViewModal from "./OrderViewModal";
import { Button } from "@/components/ui/button";

function ViewOrder({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-center">
        <Button
          variant="icon"
          onClick={() => setOpen(true)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>
      <OrderViewModal
        open={open}
        onClose={() => setOpen(false)}
        order={order}
      />
    </>
  );
}

export default ViewOrder;
