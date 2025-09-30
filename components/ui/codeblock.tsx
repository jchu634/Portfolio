"use client";
import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { intel_one_mono } from "@/lib/fonts";
import { CheckIcon, CopyIcon } from "lucide-react";

// Syntax Highlighting
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import powershell from "react-syntax-highlighter/dist/esm/languages/prism/powershell";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

type Languages = "jsx" | "tsx" | "javascript" | "python" | "powershell";

function CodeBlock({
  className,
  children,
  code,
  hideCopyButton,
  language = "jsx",
  ...props
}: React.ComponentProps<"div"> & {
  children?: React.ReactNode;
  code?: string;
  hideCopyButton?: boolean;
  language?: Languages;
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
  SyntaxHighlighter.registerLanguage("jsx", jsx);
  SyntaxHighlighter.registerLanguage("tsx", tsx);
  SyntaxHighlighter.registerLanguage("javascript", javascript);
  SyntaxHighlighter.registerLanguage("python", python);
  SyntaxHighlighter.registerLanguage("powershell", powershell);

  return (
    <div
      className={cn(
        "relative m-0 rounded-md bg-[#1e1e1e] p-2 text-gray-200",
        className,
      )}
    >
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          fontFamily: `${intel_one_mono.style.fontFamily}, monospace`,
          margin: "0",
        }}
      >
        {typeof children === "string" ? children : (code ?? "")}
      </SyntaxHighlighter>

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
