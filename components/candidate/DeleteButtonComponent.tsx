"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

import {
  DeleteExprienceFormMethod,
  DeleteEducationFormMethod,
} from "@/app/(organization)/candidate/profile/actions";

type Props = {
  deleteId: string;
  description?: string;
  type: "education" | "exprience";
};

export function DeleteButtonComponent({ deleteId, type, description }: Props) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    startTransition(async () => {
      const result =
        type === "exprience"
          ? await DeleteExprienceFormMethod(deleteId)
          : await DeleteEducationFormMethod(deleteId);

      if (result.status === "success") {
        toast.add({
          type: "success",
          title: result.message,
        });

        setOpen(false);
        router.refresh();
      } else {
        toast.add({
          type: "error",
          title: result.message,
        });
      }
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={
          <Button
            variant="destructive"
            className="flex w-full items-center justify-start gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Permanently?</AlertDialogTitle>

          <AlertDialogDescription>
            {description ??
              "This action cannot be undone. This record will be permanently deleted."}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
