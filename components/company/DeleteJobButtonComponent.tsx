
"use client";

import { Trash, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { ReactNode, useTransition } from "react";
import { tryCatch } from "@/hooks/try-catchs";
import { deleteJobByIdMethod } from "@/app/(organization)/employer/post-jobs/actions";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";

interface IAppPropsButtonDelete {
  jobId: string;
  title?: string;
  icon?: ReactNode;
  className?: string;
}

export function DeleteJobButton({
  jobId,
  title = "Delete Job",
  icon,
  className,
}: IAppPropsButtonDelete) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDeleteJobById() {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        deleteJobByIdMethod(jobId)
      );

      if (error) {
        toast.add({
          type: "error",
          title: "Something went wrong. Please try again.",
        });
        return;
      }

      if (data?.status === "success") {
        toast.add({
          type: "success",
          title: data.message,
        });
        router.push("/employer/manage-jobs");
        router.refresh()
      } else if (data?.status === "error") {
        toast.add({
          type: "error",
          title: data.message,
        });
      } else {
        toast.add({
          type: "error",
          title: "Invalid delete response",
        });
      }
    });
  }

  return (
    <div className="max-w-fit">
      <Button
        variant="destructive"
        className={className}
        onClick={handleDeleteJobById}
        disabled={isPending}
      >
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          icon ?? <Trash className="size-4" />
        )}

        {isPending ? "Deleting..." : title}
      </Button>
    </div>
  );
}
