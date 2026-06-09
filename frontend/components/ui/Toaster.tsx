"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      theme="dark"
      position="top-right"
      gap={10}
      toastOptions={{
        classNames: {
          toast: "rounded-2xl !text-sm",
          title: "font-medium",
          description: "!text-[#4A6358]",
          closeButton:
            "!bg-white/5 !border-white/10 !text-[#4A6358] hover:!text-[#F5FAF7] hover:!bg-white/10",
          actionButton: "!bg-primary !text-white !rounded-lg",
          cancelButton: "!bg-white/10 !text-[#F5FAF7] !rounded-lg",
        },
      }}
    />
  );
}
