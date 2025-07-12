import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import { CodeBlock } from "@/components/ui/codeblock";
import { intel_one_mono } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "OPFS Extension Limitations in Firefox",
  date: "2025-07-10",
  description: "AKA: How is a user supposed to access OPFS files in Firefox.",
  lastUpdate: "2025-07-10",
};
export default function Post() {
  const code = `
    listDirectoryContents = async (directoryHandle, depth) => {
        depth = depth || 1;
        directoryHandle = directoryHandle || await navigator.storage.getDirectory();
        const entries = await directoryHandle.values();

        for await (const entry of entries) {
            const indentation = '    '.repeat(depth);
            if (entry.kind === 'directory') {
                console.log(\`\${indentation}\${entry.name}/\`);
                await listDirectoryContents(entry, depth + 1);
            } else {
                console.log(\`\${indentation}\${entry.name}\`);
            }
        }
    }
    `;
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />

      <div>{/* Content goes here */}</div>
      <div>
        <h3>Background</h3>
        <p>
          For the Bolt.new hackathon, I worked on{" "}
          <a href="inkproof.keshuac.com">Inkproof</a>, a epub editor which
          stores all project info in the Origin Private File System (OPFS).
          <br />I personally use Zen as my browser of choice despite my issues
          with how Firefox handles large amounts of tabs.
          <br />
          However, I was unable to find a good way to debug Inkproof in Zen as I
          could not browse the OPFS structure for debugging. so I used Vivaldi
          to debug using the{" "}
          <a href="https://github.com/tomayac/opfs-explorer">
            OPFS Explorer
          </a>{" "}
          extension.
        </p>
        <p>
          After the hackathon, I was confused to why there aren't any extensions
          to browse the OPFS in Firefox-based browsers, and so I decided to try
          port over an extension to Firefox.
          <br />
          I am now here to announce, after a lot of work...
          <br />I failed, I was unable to get any OPFS extensions to work in
          Firefox and this is why.
        </p>
      </div>
      <div>
        <h3>Extensions 101</h3>
        <blockquote>Necessary context on how Extensions work</blockquote>
        <p>
          In the browers extension world, you can register HTML and JS to run in
          certain contexts: (background, content, devtools, newtab, options,
          panel, popup).
          <br />
          For this article, the only contexts that are relevant are Background,
          Content and Devtools.
          <br />
        </p>
        <p>
          Background Scripts as implied, run in the background, their job is to
          monitor and respond to browser events.
          <br />
          e.g. there might be a background script which only triggers when you
          open a new tab.
          <br />
          Background scripts can either be ethereal and only loaded when an
          event happens or they can be persistent and run the entire time the
          browser has loaded a certain extension.
          <br />
        </p>
        <p>
          Content Scripts are intended to run on a webpage, they are used as
          they are able to read and modify the contents of a page. Hence Content
          Scripts are immensely powerful.
        </p>
        <p>
          Devtool Scripts are incredibly specialised, intended to run on a page
          in the browser's devtools.
        </p>
      </div>
      <div>
        <h3>Existing Solutions</h3>
        <div>
          <p>
            If you are in an Chromium browser, the best solution to view the
            contents of a OPFS is an extension:
          </p>
          <ul>
            <li>
              <a href="https://github.com/InsecureBeast/opfs-viewer">
                {" "}
                OPFS Viewer
              </a>
            </li>
            <li>
              or the previously mentioned{" "}
              <a href="https://github.com/tomayac/opfs-explorer">
                OPFS Explorer
              </a>
            </li>
          </ul>
          <h4>Extension Structures</h4>
          <div>
            <p>
              OPFS-Viewer is designed quite simply, it just has a Devtools Panel
              and Script and it uses the{" "}
              <code
                className={cn(
                  "rounded-md bg-slate-800 p-1 text-white",
                  intel_one_mono.className,
                )}
              >
                chrome.scripting.executeScript
              </code>{" "}
              api to be able to execute OPFS commands from the Content-Script
              context without needing a Content-script.
            </p>
            On the other hand OPFS Explorer is a bit more complex: it has three
            components in three different contexts
            <ol>
              <li>
                {" "}
                A Devtools script to render the interface for the user in the
                Devtools
              </li>
              <li>
                A Content script which runs the OPFS commands on the current tab
              </li>
              <li>
                A Background script which acts a communication bridge between
                the Content Script and the Devtools Panel
              </li>
            </ol>
          </div>
        </div>
      </div>
      <div>
        <h3>Why nothing works on Firefox</h3>
        <blockquote>
          Note: Firefox uses "browser" and not "chrome" as their api keyword,
          the rest of the article will reflect this
        </blockquote>
        <p>
          In Firefox, Content-Scripts are locked down to DOM apis and a subset
          of the full extension apis. <br />
          Similarly Devtools are also locked down, although they get access to
          some devtools apis.
        </p>
        <p>
          This immediately breaks OPFS-Viewer as its Devtools script loses
          access to all{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1 text-white",
              intel_one_mono.className,
            )}
          >
            browser.scripting
          </code>{" "}
          apis.
        </p>
        <p>
          You would think that OPFS-Explorer would then be fine, as it does its
          OPFS calls from the correct context through bridge.
          <br />
          But it breaks in an entirely different and frustrating way.
          <br />
        </p>
        <p>
          When run from a content-script, most of the OPFS apis work perfectly
          and without issue, but crucially the exception is the{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1 text-white",
              intel_one_mono.className,
            )}
          >
            FileSystemDirectoryHandle.values()
          </code>{" "}
          api which is needed to get the directory structure is broken.
          <br />
          On Firefox, this fetches an empty iterable which triggers an error.
          <CodeBlock hideCopyButton={true}>
            directoryHandle.values() is not iterable (TypeError)
          </CodeBlock>
        </p>
        <p>
          Through this, Firefox appears to have deliberately or unintentionally
          locked down the ability for extensions to access the OPFS directory
          listings as the other FileSystemDirectoryHandle APIS appear work fine
          (read, write, delete) and you can even check if a particular file
          exists through{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1 text-white",
              intel_one_mono.className,
            )}
          >
            getFileHandle()
          </code>{" "}
        </p>
      </div>
      <div>
        <h3>Conclusions</h3>
        In the end, it appears that Firefox has specifically locked down the
        ability to map the OPFS from extensions. As{" "}
        <code
          className={cn(
            "rounded-md bg-slate-800 p-1 text-white",
            intel_one_mono.className,
          )}
        >
          FileSystemDirectoryHandle.values()
        </code>{" "}
        works fine when using this script from{" "}
        <a href="https://shaneosullivan.wordpress.com/2023/11/28/how-to-list-all-files-in-a-browsers-origin-private-file-system/">
          Shane O'Sullivan's blog.
        </a>
        <a
          href="
            https://shaneosullivan.wordpress.com/2023/11/28/how-to-list-all-files-in-a-browsers-origin-private-file-system/"
        ></a>
        <CodeBlock>{code}</CodeBlock>
        <p>
          However, this script is fundamentally limited, as it needs to be
          re-run if you want to see latest state of the OPFS and it only shows
          you the OPFS structure, you cannot download, upload or modify the OPFS
          files.
          <br />
          And to that end, it appears that there will not be a good way to do so
          in Firefox unless the browser developers add a native way to do so in
          the devtools.
          <br />
          So it appears that I will be returning to using Vivaldi a bit longer,
          until I can finally debug Inkproof.
        </p>
      </div>
    </article>
  );
}
