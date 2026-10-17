import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";

export const metadata: Metadata = {
  title: "Ryzen AI Setup",
  date: "2000-01-01",
  description: "Placeholder",
  lastUpdate: "2000-01-01",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />

      <div>
        Installing RyzenAI software
        <div>
          Issues with conda () conda not found. please install conda. This
          occurs because of several reasons. - conda not being on the SYSTEM
          PATH, conda may work fine on the user path but it will not install if
          it isn't on the system path - You can check this using `where conda`
          in an elevated command prompt, if it doesn't show then it isn't in the
          system path - conda install includes a space in its PATH - I don't
          know why such issues still exist in 2025, but they do, so you have to
          install conda in a path without any spaces - Note: for those like me
          who have a space in their username, you can bypass this issue by using
          subst to point your user dir to another drive letter, which should
          elimate the empty space.
        </div>
      </div>
    </article>
  );
}
