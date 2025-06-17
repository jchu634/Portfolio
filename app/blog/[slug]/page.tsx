import React from "react";
import { roboto_slab } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";

interface PostData {
  slug: string;
  title?: string;
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const currentPostFileName = slug.replace(/\.tsx$/, "");

    const postsDirectory = path.join(process.cwd(), "blogposts");
    const allPostFiles = fs.readdirSync(postsDirectory);

    const allPostsData: PostData[] = [];

    for (const file of allPostFiles) {
      if (file.endsWith(".tsx")) {
        const postSlug = file.replace(/\.tsx$/, "");
        try {
          const blogModule = await import(`@/blogposts/${postSlug}`);
          allPostsData.push({
            slug: postSlug,
            title: blogModule.metadata?.title,
          });
        } catch (e) {
          console.error(`Error importing metadata for ${postSlug}:`, e);
          allPostsData.push({ slug: postSlug });
        }
      }
    }

    allPostsData.sort((a, b) => a.slug.localeCompare(b.slug));
    allPostsData.reverse();

    const currentIndex = allPostsData.findIndex(
      (p) => p.slug === currentPostFileName,
    );

    const chronologicallyPreviousPostData: PostData | null =
      currentIndex < allPostsData.length - 1 && currentIndex !== -1
        ? allPostsData[currentIndex + 1]
        : null;
    const chronologicallyNextPostData: PostData | null =
      currentIndex > 0 && currentIndex !== -1
        ? allPostsData[currentIndex - 1]
        : null;

    const PostContent = (await import(`@/blogposts/${currentPostFileName}`))
      .default;

    return (
      <div className={cn("h-full w-full p-10", roboto_slab.className)}>
        <PostContent />

        {/* Navigation Buttons */}
        <div className="my-8 flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
          {chronologicallyPreviousPostData ? (
            <Button
              asChild
              className="justify-start overflow-hidden bg-[#122c23] py-8 text-left text-ellipsis dark:bg-white"
            >
              <Link
                href={`/blog/${chronologicallyPreviousPostData.slug}`}
                className="text-blue-600 hover:underline dark:text-blue-800"
              >
                &larr; Previous post:
                <br />
                {chronologicallyPreviousPostData.title ||
                  chronologicallyPreviousPostData.slug}
              </Link>
            </Button>
          ) : (
            <div /> // Placeholder for spacing
          )}

          {chronologicallyNextPostData ? (
            <Button
              asChild
              className="justify-start overflow-hidden bg-[#122c23] py-8 text-left text-ellipsis dark:bg-white"
            >
              <Link
                href={`/blog/${chronologicallyNextPostData.slug}`}
                className="text-blue-600 hover:underline dark:text-blue-800"
              >
                Next Post: &rarr;
                <br />
                {chronologicallyNextPostData.title ||
                  chronologicallyNextPostData.slug}
              </Link>
            </Button>
          ) : (
            <div /> // Placeholder for spacing
          )}
        </div>

        <div className="prose lg:prose-xl dark:prose-invert prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none">
          <Separator className="bg-black dark:bg-white"></Separator>

          <div className="flex flex-row items-center justify-end pb-15 text-right md:pb-0">
            This work is licensed under{" "}
            <Link
              href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
              className="flex h-16 flex-row items-center space-x-2 pl-2"
            >
              <p className="text-base md:text-xl">CC BY 4.0</p>

              <Image
                src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
                className="size-8"
                width="8"
                height="8"
                alt="Creative Commons Icon"
              />
              <Image
                src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
                className="size-8"
                width="8"
                height="8"
                alt="Creative Commons BY Icon"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(`Error importing ${slug}:`, error);
    return notFound();
  }
}
