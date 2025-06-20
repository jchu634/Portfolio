import { Metadata } from "@/lib/blogType";
import { Separator } from "@/components/ui/separator";
interface BlogHeaderProps {
  header_metadata: Metadata;
}

export default function BlogHeader({ header_metadata }: BlogHeaderProps) {
  return (
    <div className="space-y-1">
      {/* Header */}
      <h1>{header_metadata.title}</h1>

      <h4 className="text-xl font-bold">
        First Published: {header_metadata.date}
      </h4>
      <h4 className="text-xl font-bold">
        Last Updated: {header_metadata.lastUpdate}
      </h4>
      <blockquote> {header_metadata.description}</blockquote>
      <Separator className="my-4 bg-black dark:bg-white" />
    </div>
  );
}
