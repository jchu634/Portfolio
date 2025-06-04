import { Separator } from "@/components/ui/separator";
import { CodeBlock } from "@/components/ui/codeblock";
import { Metadata } from "@/lib/blogType";

export const metadata: Metadata = {
  title:
    "Application error: a client-side exception has occurred while loading localhost",
  date: "2025-06-04",
  description:
    "Documenting a server-side bug which occured when migrating from Next.js 15.1",
  lastUpdate: "2025-06-04",
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
      <div>
        <h3>TLDR</h3>
        <p>
          The server sent a UTF-8 encoded file with CP-1252 encoding instead.
        </p>
      </div>

      <div>
        <h3>Background</h3>
        <p>
          This occured when I was developing{" "}
          <a href="https://subtextapp.cc">Subtext</a>.<br />
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
          <a href="https://nvd.nist.gov/vuln/detail/CVE-2025-29927">
            CVE-2025-29927
          </a>{" "}
          warnings.
          <br />
          So I did, and nothing went wrong, and everything worked perfectly in{" "}
          <span className="font-bold">dev</span>. <br />
          Then I sent it to the build server and the bug happened: every build
          would build without issues. <br />
          Except when running the builds, I would get this error:{" "}
          <span className="italic">
            Application error: a client-side exception has occurred while
            loading localhost (see the browser console for more information).
          </span>
          <br />
          and there would be three errors in the console <br />
          <span className="italic">"No group found for id "«Rufb»""</span>
          <br />
          <span className="italic">"No group found for id "«Rfb»""</span>
          <br />
          <span className="italic">
            "Uncaught Error: No group found for id "«Rufb»" ""
          </span>
        </p>
      </div>
      <div>
        <h3>Debugging</h3>
        <p>
          When I searched Google, very fortunately the{" "}
          <a href="https://github.com/bvaughn/react-resizable-panels/issues/204">
            first result
          </a>{" "}
          was relevant.
          <br />
          It revealed that this issue had occured before in the
          react-resizable-panels package before.
          <br />
          Since I was using react-resizable-panels through the ShadCN Resizable
          element, through some testing on my own, I was able to confirm that
          this bug was caused by some interaction with the Resizable component.
        </p>
        <p>
          I then made a barebones test website with create-next-app, which I
          initialised ShadCN on and installed Resizable on.
          <br />I was able to recreate the issue when I exported the test
          website and hosted it via my backend.
          <br />
          Since this only occured when the application was exported and hosted
          and not in dev, I spun up a NGINX vm for debugging and SSHed over the
          exact same build that was causing issues.
          <br />I had expected to encounter the exact same bug again, but it
          worked flawlessly.
        </p>
        <p>
          From there I tried to debug why my FastAPI backend caused this error.
          <br />
          After spending a unspecified (long) amount of time comparing the
          FastAPI and NGINX requests against the same file in the network tab,
          <br />I got Gemini 2.5 flash to spin up a script which queried the
          same file from both servers and diffed them to see if they were
          different and reported if they were different.
          <br />
          This script then flagged <span className="italic">index.html</span>
          which showed that NGINX returned{" "}
          <span className="italic">data-panel-id="Â«R6fbÂ»"</span> while FastAPI
          returned <span className="italic"> data-panel-group-id="«Rfb»"</span>
        </p>
      </div>
      <div>
        <h3>The Cause and the fix</h3>
        <p>
          The root cause of the bug was my original FastAPI code:
          <CodeBlock variant="no_outline">
            return HTMLResponse(open(static_file_path, "r",
            encoding="utf-8").read())
          </CodeBlock>
          The fix to the backend that caused the
        </p>
      </div>
    </article>
  );
}
