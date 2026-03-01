import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";

export const metadata: Metadata = {
  title: "Interesting Blogposts/videos",
  date: "2026-03-01",
  description: "Great information from around the web",
  lastUpdate: "2026-03-01",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />
      <h2>Technical Blogs</h2>
      <ul>
        <li>
          <h4>
            Understanding WebHID and WebUSB: A Guide from Configur.io{" "}
            <a
              href={
                "https://blog.jonathanlau.io/posts/understanding-webhid-and-webusb-configur/"
              }
            >
              (Link)
            </a>
          </h4>
          <p>
            An great introduction into HID, USB and their web api
            counterparts.{" "}
          </p>
        </li>
        <li>
          <h4>
            Reverse engineering Realtek RTL8761B* Bluetooth chips, to make
            better Bluetooth security tools & classes{" "}
            <a href={"https://darkmentor.com/publication/2025-11-hardweario/"}>
              (Article Link)
            </a>
            <a href={"https://www.youtube.com/watch?v=mncR3_HOh-0"}>
              (Video Link)
            </a>
          </h4>
          <p>
            An interesting talk on the process of how Xeno Kovah reverse
            engineered how to send custom packets for MITM using modern realtek
            chips.{" "}
          </p>
        </li>
      </ul>

      <div></div>
    </article>
  );
}
