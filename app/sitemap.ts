// This file configures the sitemap for the Next.js application,
// providing search engines with information about the site's pages.
import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

// Helper function to dynamically import blog post metadata
async function getPostMetadata(filePath: string) {
  try {
    const postModule = await import(
      `@/blogposts/${filePath.replace(/\.tsx$/, "")}`
    );
    return postModule.metadata;
  } catch (error) {
    console.error(`Error importing metadata for ${filePath}:`, error);
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const postsDirectory = path.join(process.cwd(), "blogposts");
  const filenames = fs.readdirSync(postsDirectory);

  const postPromises = filenames
    .filter((filename) => filename.endsWith(".tsx"))
    .map(async (filename) => {
      const slug = filename.replace(/\.tsx$/, "");
      const metadata = await getPostMetadata(filename);
      const lastModified = metadata?.lastUpdate
        ? new Date(metadata.lastUpdate)
        : new Date();

      return {
        url: `https://keshuac.com/blog/${slug}`,
        lastModified: lastModified,
        changeFrequency: "weekly" as unknown as "weekly",
        priority: 0.7,
      };
    });

  const posts = await Promise.all(postPromises);

  return [
    {
      url: "https://keshuac.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: "https://keshuac.com/projects",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://keshuac.com/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: "https://keshuac.com/projects/games/Fakman",
      lastModified: new Date(1740999600),
      changeFrequency: "never",
      priority: 0.5,
    },
    ...posts.filter((post) => post !== null),
  ];
}
