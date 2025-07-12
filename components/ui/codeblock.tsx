"use client";
import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { intel_one_mono } from "@/lib/fonts";
import { CheckIcon, CopyIcon } from "lucide-react";

function CodeBlock({
  className,
  children,
  hideCopyButton,
  ...props
}: React.ComponentProps<"div"> & {
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
