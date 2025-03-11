import React from "react";

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  try {
    // Remove the .tsx extension for the import
    const fileName = slug.replace(/\.tsx$/, "");

    // Await the dynamic import and get the default export (the post component)
    const PostContent = (await import(`@/blogposts/${fileName}`)).default;

    return (
      <article className="prose prose-slate max-w-none">
        <PostContent />
      </article>
    );
  } catch (error) {
    console.error(`Error importing ${slug}:`, error);
    return (
      <div>
        <h1>Error</h1>
        <p>Could not load blog post.</p>
      </div>
    );
  }
}
