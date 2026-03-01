import Link from "next/link";
import fs from "fs";

import { Metadata } from "@/lib/blogType";

import { roboto_slab } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

interface BlogPostData {
  slug: string;
  metadata?: Metadata;
}

const BlogIndexPage = async () => {
  const fileNames = fs.readdirSync("./blogposts");

  const postData: BlogPostData[] = [];

  for (const file of fileNames) {
    try {
      // Remove the .tsx extension for the import
      const fileName = file.replace(/\.tsx$/, "");

      // Await the dynamic import
      const blogModule = await import(`@/blogposts/${fileName}`);

      postData.push({
        slug: fileName,
        metadata: blogModule.metadata,
      });
    } catch (error) {
      console.error(`Error importing ${file}:`, error);
    }
  }
  postData.reverse();

  return (
    <div className={cn("p-10", roboto_slab.className)}>
      <h1 className="text-4xl font-bold text-[#122c23] dark:text-orange-400">
        Blog Posts:
      </h1>
      <div className="space-y-2 pt-4">
        {postData.map((post) => (
          <div key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <h4 className="text-2xl font-semibold">{post.metadata?.title}</h4>
              <p>{post.metadata?.description}</p>
              <div className="flex">
                <p className="font-semibold whitespace-pre">Last Updated: </p>
                <p>{post.metadata?.lastUpdate}</p>
              </div>
              <div className="flex">
                <p className="font-semibold whitespace-pre">
                  First Published:{" "}
                </p>
                <p>{post.metadata?.date}</p>
              </div>
            </Link>
            <Separator className="my-4 bg-black dark:bg-white" />
          </div>
        ))}
      </div>
      <div>
        These blogposts are licensed under{" "}
        <Link
          href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
          className="inline-flex items-center space-x-2"
        >
          <p className="font-bold">CC BY 4.0</p>

          <Image
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
            className="size-8"
            width={32}
            height={32}
            alt="Creative Commons Icon"
          />
          <Image
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
            className="size-8"
            width={32}
            height={32}
            alt="Creative Commons BY Icon"
          />
        </Link>
      </div>
    </div>
  );
};

export default BlogIndexPage;
