"use client";
import * as React from "react";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { intel_one_mono } from "@/lib/fonts";
import { CheckIcon, CopyIcon } from "lucide-react";

function CodeBlock({
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { children: React.ReactNode }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof children === "string") {
      // Ensure children is a string
      navigator.clipboard.writeText(children).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Reset icon after 1.5s
      });
    }
  };

  return (
    <span className="group inline-flex size-fit items-center space-x-2 rounded-xl border-2 border-gray-700 px-3 py-1 shadow-sm dark:border-gray-300">
      <div
        className={cn(
          "text-base font-bold tracking-tighter italic",
          "",
          intel_one_mono.className,
          className,
        )}
        {...props}
      >
        {children}
      </div>
      <Separator
        orientation="vertical"
        className="mx-0 min-h-5 min-w-[1.5px] bg-gray-700 dark:border-gray-300"
      />
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-accent hover:text-accent-foreground size-8 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? (
          <CheckIcon className="size-4" />
        ) : (
          <CopyIcon className="size-4" />
        )}{" "}
      </Button>
    </span>
  );
}

export { CodeBlock };
