import Link from "next/link";
import fs from "fs";

import { Metadata } from "@/lib/blogType";

import { roboto_slab } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

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
    </div>
  );
};

export default BlogIndexPage;
