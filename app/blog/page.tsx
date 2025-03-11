import React from "react";
import Link from "next/link";
import fs from "fs";
import { Metadata } from "@/lib/blogType";

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
  console.log(postData);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {postData.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.metadata?.title}</Link>
            <p>{post.metadata?.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogIndexPage;
