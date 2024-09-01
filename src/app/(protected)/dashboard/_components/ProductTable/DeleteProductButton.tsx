import React from "react";
import { deleteProductAction } from "../../_actions/delete-product";
import { useAction } from "next-safe-action/hooks";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
const DeleteProductButton = ({ id }: { id: string }) => {
  const { executeAsync, isExecuting, result } = useAction(deleteProductAction);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    await executeAsync({ productId: id });
    if (result.data?.error || result.serverError) {
      toast.error(`${result.data?.error || result.serverError}`);
    }
  };
  return (
    <button
      className="flex gap-3 items-center m-3 hover:bg-background/45"
      onClick={onSubmit}
    >
      {isExecuting ? "Deleting Product..." : "Delete Product"}
      <Trash2 size={20} />
    </button>
  );
};

export default DeleteProductButton;
