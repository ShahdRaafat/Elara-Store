import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-40 md:w-56 rounded-md border border-gray-200 bg-white/90 px-4 py-1 text-sm placeholder:text-gray-400 transition-all",
        "focus:border-primary focus:ring-2 focus:ring-primary/30 focus:outline-none",
        "dark:bg-gray-800/50 dark:border-gray-700 dark:placeholder:text-gray-500",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
}

export { Input };
