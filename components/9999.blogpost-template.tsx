import { Separator } from "@/components/ui/separator";
import { Metadata } from "@/lib/blogType";

export const metadata: Metadata = {
  title: "Blogpost-Template",
  date: "2000-01-01",
  description: "Placeholder",
  lastUpdate: "2000-01-01",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <div className="space-y-1">
        {/* Header */}
        <h1>{metadata.title}</h1>

        <h4 className="text-xl font-bold">First Published: {metadata.date}</h4>
        <h4 className="text-xl font-bold">
          Last Updated: {metadata.lastUpdate}
        </h4>
        <blockquote> {metadata.description}</blockquote>
      </div>

      <Separator className="my-4 bg-black dark:bg-white" />
      <div>{/* Content goes here */}</div>
    </article>
  );
}
