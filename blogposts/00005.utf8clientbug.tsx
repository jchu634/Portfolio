import { CodeBlock } from "@/components/ui/codeblock";
import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import { intel_one_mono } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title:
    "Application error: a client-side exception has occurred while loading localhost",
  date: "2025-06-04",
  description:
    "Documenting a server-side bug which occured when migrating from Next.js 15.1.x",
  lastUpdate: "2025-07-11",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />

      <div>
        <h3>TLDR</h3>
        <p>
          The Windows server sent a UTF-8 encoded file with CP-1252 encoding
          instead.
        </p>
      </div>

      <div>
        <h3>Background</h3>
        <p>
          This occured when I was developing{" "}
          <a
            href="https://subtextapp.cc"
            target="_blank"
            rel="noopener noreferrer"
          >
            Subtext
          </a>
          .<br />
          Subtext uses a custom Python FastAPI setup for hosting the Frontend
          which is a static Next.js site. <br />
          Until this bug I hadn't had any issues with this setup.
        </p>
      </div>
      <div>
        <h3>The Bug</h3>
        <p>
          When I was updating Subtext, I wanted to bump the Next.js version, if
          only to stop the annoying dependabot{" "}
          <a
            href="https://nvd.nist.gov/vuln/detail/CVE-2025-29927"
            target="_blank"
            rel="noopener noreferrer"
          >
            CVE-2025-29927
          </a>{" "}
          warnings.
          <br />
          So I did, and nothing went wrong, and everything worked perfectly in{" "}
          <span className="font-bold">dev</span>. <br />
          Then I sent it to the build server and the bug happened: every build
          would build without issues. <br />
          But when running the builds, I would get this error:{" "}
          <span className="italic">
            Application error: a client-side exception has occurred while
            loading localhost (see the browser console for more information).
          </span>
          <br />
          and there would be three errors in the console
        </p>
        <blockquote>
          <span className="italic">No group found for id "«Rufb»"</span>
          <br />
          <span className="italic">No group found for id "«Rfb»"</span>
          <br />
          <span className="italic">
            Uncaught Error: No group found for id "«Rufb»"
          </span>
        </blockquote>
      </div>
      <div>
        <h3>Debugging</h3>
        <p>
          When I searched Google, very fortunately the{" "}
          <a
            href="https://github.com/bvaughn/react-resizable-panels/issues/204"
            target="_blank"
            rel="noopener noreferrer"
          >
            first result
          </a>{" "}
          was relevant.
          <br />
          It revealed that this issue had occured before in the
          react-resizable-panels package before.
          <br />
          Since I was using react-resizable-panels through the ShadCN Resizable
          element, through some testing, I was able to isolate this bug to some
          interaction with the Resizable component.
        </p>
        <p>
          I then made a barebones create-next-app application, with only a
          ShadCN Resizable component and was able to recreate the issue when the
          application was exported and hosted via my backend.
          <br />
          Since this only occured when the application was exported and hosted
          and not in dev, I spun up a NGINX vm for debugging with the exact same
          build that was causing issues.
          <br />I had expected to encounter the exact same bug again, but it
          worked flawlessly.
        </p>
        <p>
          This meant that it was my FastAPI backend which caused this error.
          <br />
          I first compared the FastAPI and NGINX requests against the same file
          in the network tab, and there were no obvious differences, no file
          fetches failed and each file fetched was the same size.
          <br />
          I then spun up a script which queried the same file from both servers
          and diffed them.
          <br />
          This script then flagged <span className="italic">index.html </span>
          which showed that NGINX returned{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1.5 text-white",
              intel_one_mono.className,
            )}
          >
            <span className="italic">data-panel-id="Â«R6fbÂ»"</span>
          </code>{" "}
          while FastAPI returned{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1.5 text-white",
              intel_one_mono.className,
            )}
          >
            <span className="italic"> data-panel-group-id="«Rfb»"</span>
          </code>
        </p>
      </div>
      <div>
        <h3>Conclusion</h3>
        <p>
          Eventually, I found the root cause of the bug: In{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1.5 text-white",
              intel_one_mono.className,
            )}
          >
            open()
          </code>
          , if
          <span className="italic"> encoding</span> is not set to anything, by
          default Python will use the default system encoding:{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1.5 text-white",
              intel_one_mono.className,
            )}
          >
            locale.getencoding()
          </code>
          <br />
          On Windows, this returns CP-1252. When Python opened and read the
          UTF-8 file using CP-1252, it stripped some UTF-8 characters from
          data-panel-id (Â, 6) which broke the application as React could no
          longer find the element.
        </p>
        <p>
          The upgrade to Next.js 15.2.x or 15.3.x is what triggered the bug as
          previously in 15.1.x, the exported html had a data-panel-group-id of{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1.5 text-white italic",
              intel_one_mono.className,
            )}
          >
            :R2ftb:
          </code>
          .<br />
        </p>
        <h4>Buggy Code</h4>
        <CodeBlock hideCopyButton={true} className="prose-pre:m-0">
          return HTMLResponse(open(static_file_path, "r").read())
        </CodeBlock>
        <h4>Fixed Code</h4>
        <CodeBlock hideCopyButton={true} className="prose-pre:m-0">
          return HTMLResponse(open(static_file_path, "r",
          encoding="utf-8").read())
        </CodeBlock>

        <p></p>

        <p>
          Note: If anyone finds it useful, they can find the testing repo here:{" "}
          <a
            href="https://github.com/jchu634/next-export-test"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://github.com/jchu634/next-export-test
          </a>
        </p>
      </div>
    </article>
  );
}
