import React from "react";
import { roboto_slab } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    // Remove the .tsx extension for the import
    const fileName = slug.replace(/\.tsx$/, "");

    // Await the dynamic import and get the default export (the post component)
    const PostContent = (await import(`@/blogposts/${fileName}`)).default;

    return (
      <div className={cn("h-full w-full p-10", roboto_slab.className)}>
        <PostContent />
      </div>
    );
  } catch (error) {
    console.error(`Error importing ${slug}:`, error);
    return notFound();
  }
}
