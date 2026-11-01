"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";

interface iAppPros {
  data: string;
}

export default function Resume({ data }: iAppPros) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        Preview Resume
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl h-[90vh] rounded-xl p-3">
            <div className="flex justify-between mb-3">
              <h2 className="font-bold text-gray-900">My Resume</h2>

              <Button variant="destructive" onClick={() => setOpen(false)}>
                <X />
              </Button>
            </div>

            {data ? (
              <iframe
                src={data}
                className="w-full h-[calc(100%-40px)]"
                title="Resume Preview"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-2xl font-bold">No resume available</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
