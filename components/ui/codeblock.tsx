"use client";
import * as React from "react";

import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { intel_one_mono } from "@/lib/fonts";
import { CheckIcon, CopyIcon } from "lucide-react";

const codeBlockVariants = cva("group inline-flex items-center space-x-2", {
  variants: {
    variant: {
      default:
        "border-2 border-gray-700 px-3 shadow-sm dark:border-gray-300 italic rounded-xl size-fit text-base",
      no_outline: "px-1 text-lg",
      no_outline_italic: "px-1 text-lg italic",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function CodeBlock({
  className,
  variant,
  children,
  hideCopyButton,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof codeBlockVariants> & {
    children: React.ReactNode;
    hideCopyButton?: boolean;
  }) {
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
    <span className={cn(codeBlockVariants({ variant, className }), "")}>
      <span
        className={cn(
          "font-bold tracking-tighter",
          intel_one_mono.className,
          className,
        )}
        {...props}
      >
        {children}
      </span>
      {!hideCopyButton && (
        <>
          <span className="min-h-4 border border-gray-700 dark:border-gray-300"></span>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-accent hover:text-accent-foreground size-6 transition-opacity"
            onClick={handleCopy}
          >
            {copied ? (
              <CheckIcon className="size-4" />
            ) : (
              <CopyIcon className="size-4" />
            )}{" "}
          </Button>
        </>
      )}
    </span>
  );
}

export { CodeBlock };
