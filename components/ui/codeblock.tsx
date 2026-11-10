"use client";
import { cn } from "cn";
import { CheckIcon, CopyIcon } from "lucide-react";
import type * as React from "react";
import { useState } from "react";
// Syntax Highlighting
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import ini from "react-syntax-highlighter/dist/esm/languages/prism/ini";
import javascript from "react-syntax-highlighter/dist/esm/languages/prism/javascript";
import jsx from "react-syntax-highlighter/dist/esm/languages/prism/jsx";
import powershell from "react-syntax-highlighter/dist/esm/languages/prism/powershell";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import tsx from "react-syntax-highlighter/dist/esm/languages/prism/tsx";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/ui/button";

type Languages =
  | "jsx"
  | "tsx"
  | "javascript"
  | "python"
  | "powershell"
  | "bash"
  | "ini";

function CodeBlock({
  className,
  children,
  code,
  hideCopyButton,
  language = "jsx",
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
  SyntaxHighlighter.registerLanguage("bash", bash);
  SyntaxHighlighter.registerLanguage("ini", ini);

  return (
    <div
      className={cn(
        "relative m-0 rounded-md bg-[#1e1e1e] p-2 font-intel text-gray-200",
        className,
      )}
    >
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        codeTagProps={{ style: { fontFamily: "inherit" } }}
        customStyle={{
          fontFamily: "inherit",
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
