"use client";

import { useState, useTransition } from "react";
import { Bookmark } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toggleJobBookmark } from "@/app/(main-layouts)/actions";
import { toast } from "../ui/toast";
interface BookmarkButtonProps {
  jobId: string;
  initialBookmarked: boolean;
}

export function BookmarkButton({
  jobId,
  initialBookmarked,
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [isPending, startTransition] = useTransition();

  function handleBookmark() {
    startTransition(async () => {
      try {
        const result = await toggleJobBookmark(jobId);
        setBookmarked(result.bookmarked);

        toast.add({
            type:"success",
            title : result.bookmarked
            ? "Job bookmarked successfully"
            : "Bookmark removed"
        });
      } catch {
        toast.add({
            type : "error",
            title : "BookMark Unable"
        });
      }
    });
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleBookmark}
      disabled={isPending}
      aria-label={bookmarked ? "Remove Bookmark" : "Bookmark"}
      aria-pressed={bookmarked}
      title={bookmarked ? "Remove Bookmark" : "Bookmark"}
    >
      <Bookmark
        className={`size-4 ${
          bookmarked ? "fill-current text-primary" : ""
        }`}
      />
    </Button>
  );
}