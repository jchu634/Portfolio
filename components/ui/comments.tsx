"use client";
import Giscus from "@giscus/react";
import { useTheme } from "next-themes";

export default function CommentSection({ blogtitle }: { blogtitle: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <Giscus
      id="comments"
      repo="jchu634/portfolio"
      repoId="R_kgDOLHqxYg"
      category="Announcements"
      categoryId="DIC_kwDOLHqxYs4CrxOp"
      mapping="specific"
      term={blogtitle}
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={theme == "dark" ? "purple_dark" : "light_tritanopia"}
      lang="en"
      loading="lazy"
    />
  );
}
