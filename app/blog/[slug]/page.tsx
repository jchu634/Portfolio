import React from "react";
import { roboto_slab } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

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
        <div className="prose lg:prose-xl dark:prose-invert prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none">
          <Separator className="bg-black dark:bg-white"></Separator>

          <div className="flex flex-row items-center justify-end pb-15 text-right md:pb-0">
            This work is licensed under{" "}
            <Link
              href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
              className="flex h-16 flex-row items-center space-x-2 pl-2"
            >
              <p>CC BY 4.0</p>

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
