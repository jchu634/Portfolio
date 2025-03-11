import { intel_one_mono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
function NotFoundPage() {
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        intel_one_mono.className,
      )}
    >
      <h1 className="text-4xl font-bold"> 404 PAGE NOT FOUND</h1>
    </div>
  );
}

export default NotFoundPage;
