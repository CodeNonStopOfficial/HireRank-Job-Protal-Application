"use client";

import { Trash, Loader2 } from "lucide-react";
import { useTransition, ReactNode } from "react";
import { Button } from "../ui/button";

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  title?: string;
  icon?: ReactNode;
  className?: string;
}

export function DeleteButton({
  onDelete,
  title = "Delete",
  icon,
  className,
}: DeleteButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      await onDelete();
    });
  }

  return (
    <Button
      variant="destructive"
      className={className}
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        icon ?? <Trash className="size-4" />
      )}

      {isPending ? "Deleting..." : title}
    </Button>
  );
}