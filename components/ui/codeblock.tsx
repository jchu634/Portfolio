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
      navigator.clipboard.writeText(children).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500); // Reset icon after 1.5s
      });
    } else {
      hideCopyButton = true;
    }
  };

  return (
    <div
      className={cn(
        "relative m-0 rounded-md bg-gray-800 text-gray-200",
        className,
      )}
    >
      <pre className="m-0 overflow-auto whitespace-pre-wrap">
        <code className={cn(intel_one_mono.className)} {...props}>
          {children}
        </code>
      </pre>

      {!hideCopyButton && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 size-8 transition-opacity hover:bg-gray-700 hover:text-white"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? (
            <CheckIcon className="size-4" />
          ) : (
            <CopyIcon className="size-4" />
          )}{" "}
        </Button>
      )}
    </div>
  );
}

export { CodeBlock };
