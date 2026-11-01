"use client";

import { useTransition } from "react";
import { toast } from "@/components/ui/toast";
import { Button } from "../ui/button";
import { deleteCompanyAction } from "@/app/(organization)/employer/profile/actions";
import { useRouter } from "next/navigation";

interface Props {
  companyId: string;
}

export function DeleteCompanyButton({ companyId }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteCompanyAction(companyId);

      if (result.status === "success") {
        toast.add({
          type: "success",
          title: result.message,
        });
        router.push("/");
        router.refresh();
      } else {
        toast.add({
          type: "error",
          title: result.message,
        });
      }
    });
  }

  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? "Deleting..." : "Delete Company"}
    </Button>
  );
}