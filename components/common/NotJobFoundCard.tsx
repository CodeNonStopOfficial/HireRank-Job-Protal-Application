"use client";

import { SearchX, RotateCcw } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { TLSSocket } from "node:tls";

interface IAppProps {
  onClearFilters?: () => void;
  title?: string;
}

export function NoJobsFound({ onClearFilters, title }: IAppProps) {
  return (
    <Card className="w-full border-dashed shadow-none">
      <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center">
        {/* Icon */}
        <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-muted">
          <SearchX
            className="size-10 text-muted-foreground"
            aria-hidden="true"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold tracking-tight">
          {title ? title : "Not Job Found"}
        </h2>

        {/* Description */}
        <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
          We couldn't find any jobs matching your search. Try changing your
          filters or using different keywords to discover more opportunities.
        </p>

        {/* Action */}
        {onClearFilters && (
          <Button
            onClick={onClearFilters}
            variant="outline"
            className="mt-6 px-4 py-4"
          >
            <RotateCcw data-icon="inline-start" />
            Clear all filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
