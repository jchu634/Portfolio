import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import { CodeBlock } from "@/components/ui/codeblock";
import { intel_one_mono } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerShell,
} from "@/components/ui/accordion";
import { ChevronDownIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Documenting Firefox Extension OPFS APIs",
  date: "2025-07-10",
  description: "This wasn't supposed to work...",
  lastUpdate: "2025-07-12",
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
          <br />I was unable to debug it easily in Zen, so I decided I wanted to
          port over or make my own extension to debug OPFS.
        </p>
        <p>
          That is where my things diverge from my original draft of this
          article.
          <br />
          I was originally stuck and unable to get anything to work, and was
          frustrated enough to write an article, but I decided to try one more
          extension API, and... it worked.
          <br />
          So this article is an attempt to salvage the content from my original
          article and to document what in the OPFS works or doesn't on Firefox
          Addons.
        </p>
      </div>
      <div>
        <h3>Extensions 101</h3>
        <blockquote>Optional context on how Extensions work</blockquote>
        <Accordion type="single" collapsible className="not-prose">
          <AccordionItem value="item-1" className="prose-pre:m-0">
            <AccordionTriggerShell className="text-2xl font-semibold">
              Content (Click to show)
              <ChevronDownIcon />
            </AccordionTriggerShell>

            <AccordionContent className="prose-pre:m-0 space-y-2 text-xl/9">
              <p>
                In the browers extension world, you can register HTML and JS to
                run in certain contexts: (background, content, devtools, newtab,
                options, panel, popup).
                <br />
                For this article, the only contexts that are relevant are
                Background, Content and Devtools.
                <br />
                <br />
              </p>
              <p>
                Background Scripts as implied, run in the background, their job
                is to monitor and respond to browser events.
                <br />
                e.g. there might be a background script which only triggers when
                you open a new tab.
                <br />
                Background scripts can either be ethereal and only loaded when
                an event happens or they can be persistent and run the entire
                time the browser has loaded a certain extension.
                <br />
                <br />
              </p>
              <p>
                Content Scripts are intended to run on a webpage, they are used
                as they are able to read and modify the contents of a page.
                Hence Content Scripts are immensely powerful.
                <br />
                Devtool Scripts are incredibly specialised, intended to run on a
                page in the browser's devtools.
              </p>
              <br />
              <p>
                Unlike Background scripts which have full access to the suite of
                Web-Extension APIs, Devtool and Content Scripts only get access
                to a subset of the Web-Extension APIs.
                <br />
                This is because Background scripts do not get direct access to
                the DOM which restricts it somewhat. <br />
                Devtool Scripts also get exclusive access to the Devtool APIs.
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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
        <h3>Why these don't work on Firefox</h3>
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
          OPFS calls from the correct context through a bridge.
          <br />
          But it breaks in an entirely different way.
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
        </p>
        <CodeBlock hideCopyButton={true}>
          directoryHandle.values() is not iterable (TypeError)
        </CodeBlock>
        <p>
          Through this, Firefox appears to have no way for most extensions to
          access the OPFS directory listings as the other
          FileSystemDirectoryHandle APIS appear work fine (read, write, delete)
          and you can even check if a particular file exists through{" "}
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
        <h3>My Approach</h3>
        <p>
          So if the most important OPFS apis are locked down from being called
          in extensions, how did I get it to work.
        </p>
        <CodeBlock hideCopyButton={true}>
          devtools.inspectedWindow.eval() // Referred to as eval() from now on
          eval()
        </CodeBlock>
        <p>
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1 text-white",
              intel_one_mono.className,
            )}
          >
            eval()
          </code>{" "}
          acts very similarly to{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1 text-white",
              intel_one_mono.className,
            )}
          >
            tabs.executeScript()
          </code>
          , but most importantly it reads the current state of the page, unlike
          Content-Scripts which are isolated from changes made to the page by
          page scripts.
          <br />
          This is most likely the reason why{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1 text-white",
              intel_one_mono.className,
            )}
          >
            eval()
          </code>{" "}
          is uniquely able to access the OPFS correctly.
        </p>
        <p>
          However, an issue is that any script run by{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1 text-white",
              intel_one_mono.className,
            )}
          >
            eval()
          </code>{" "}
          must return a JSON representable value.
          <br />
          This caused all sorts of headache, as the OPFS api is asynchronous and
          would return a JSON promise and not JSON, which I could not get{" "}
          <code
            className={cn(
              "rounded-md bg-slate-800 p-1 text-white",
              intel_one_mono.className,
            )}
          >
            eval()
          </code>{" "}
          to resolve at all.
          <br />
          Ultimately, I was unable to get it to work and my solution was to
          instead give up on a clean Devtools only script and to architect the
          extension so that
        </p>
        <ol>
          <li>
            Devpanel executes OPFS commands via{" "}
            <code
              className={cn(
                "rounded-md bg-slate-800 p-1 text-white",
                intel_one_mono.className,
              )}
            >
              eval()
            </code>
          </li>
          <li>OPFS Results are written to an element in the DOM</li>
          <li>
            A Content-Script picks up the results and sends it to the background
            script
          </li>
          <li>The background script forwards the results to the Devpanel</li>
        </ol>
      </div>
      <div>
        <h3>Conclusions</h3>
        <p>
          Although I wish I could have gotten the devpanels only architecture
          working, ultimately the extension does work. <br />
          Overall, the native Devtools should really get some native OPFS
          capabilities, but I don't think that is coming anytime soon.
          <br />
          Here's hoping that day will come sooner than later, but until then,
          3rd-party extensions work fine enough.
        </p>
      </div>
    </article>
  );
}
