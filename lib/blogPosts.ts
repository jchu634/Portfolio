import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";
import type { Metadata } from "@/lib/blogType";

interface BlogPostModule {
  default: ComponentType;
  metadata?: Metadata;
}

export function getBlogPosts({
  includeDrafts = process.env.NODE_ENV === "development",
}: { includeDrafts?: boolean } = {}) {
  const postsDirectory = path.join(process.cwd(), "blogposts");
  const directories = includeDrafts ? ["", "drafts"] : [""];
  const posts = new Map<string, { slug: string; importPath: string }>();

  for (const directory of directories) {
    const directoryPath = path.join(postsDirectory, directory);
    if (!fs.existsSync(directoryPath)) continue;

    for (const file of fs.readdirSync(directoryPath, { withFileTypes: true })) {
      if (!file.isFile() || !file.name.endsWith(".tsx")) continue;
      const slug = file.name.replace(/\.tsx$/, "");
      // Published posts take precedence if a draft has the same slug.
      if (!posts.has(slug)) {
        posts.set(slug, {
          slug,
          importPath: directory ? `${directory}/${slug}` : slug,
        });
      }
    }
  }

  return [...posts.values()].sort((a, b) => b.slug.localeCompare(a.slug));
}

export async function importBlogPost(slug: string): Promise<BlogPostModule> {
  const post = getBlogPosts().find((post) => post.slug === slug);
  if (!post) throw new Error(`Unknown blog post: ${slug}`);

  return import(`@/blogposts/${post.importPath}`);
}
