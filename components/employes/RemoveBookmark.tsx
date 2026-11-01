"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Loader2, Trash } from "lucide-react";
import { toast } from "../ui/toast";
import { GetBookmarkedDeleteJobs } from "@/app/(main-layouts)/actions";

interface IAppProps {
  jobId: string;
}

export function RemoveBookmarkButton({ jobId }: IAppProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDeleteFunction() {
    startTransition(async () => {
      try {
        await GetBookmarkedDeleteJobs(jobId);

        toast.add({
             type : "success",
             title : "Deleted Successfully"
        });

        router.refresh();
      } catch {
         toast.add({
            type : "error",
            title : "Failed Deleted"
         })
      }
    });
  }

  return (
    <Button
      type="button"
      onClick={handleDeleteFunction}
      disabled={isPending}
      variant="destructive"
      size="icon"
      aria-label="Remove bookmark"
    >
      {isPending ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Trash className="size-4" />
      )}
    </Button>
  );
}