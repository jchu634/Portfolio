"use client";
import Giscus from "@giscus/react";

export default function CommentSection({ blogtitle }: { blogtitle: string }) {
  console.log(blogtitle);
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
      theme="purple_dark"
      lang="en"
      loading="lazy"
    />
  );
}
