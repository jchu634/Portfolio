import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import { CodeBlock } from "@/components/ui/codeblock";

export const metadata: Metadata = {
  title: "EdGo Writeup Pt 2.",
  date: "2026-06-11",
  description: "EdGo's technical Architecture",
  lastUpdate: "2026-06-15",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />
      <div>
        <h2>About</h2>
        This is pt2 in a writeup about the EdGo app, which is an unofficial app
        client for the EdDiscussion platform, explaining the technical
        architecture and decisions.
      </div>
      <div>
        <h2>Tech Stack</h2>
        Firstly a small background, EdDiscussion is a web-based forum platform
        with no native apps. Because of this, I chose to write it in React
        Native (Expo) as it was a great fit for EdDiscussion&apos;s API with a
        good balance between native performance and web API compatibility.
        <br />
        As a side note, I attempted a Sparkling+Lynx stack, but it is very much
        in beta and it did not compile at all on Windows.
        <br />
        <br />
        For database operations, the primary DB utilises Expo-Sqlite interfaced
        through DrizzleORM due to its developer experience, although DrizzleORM
        has been patched to support asynchronous operations, which will be
        elaborated on later. Additionally, react-native-mmkv is used as a
        persistent KV store, and expo-secure-store is used for sensitive data
        (API Keys).
        <br />
        For styling, I wanted a Tailwind-like experience, and chose uniwind over
        nativewind as it was far easier to install and integrate, in addition to
        apparently better performance.
        <br />
        Finally, Effect-ts is used, it handles most business logic and data
        fetching. This was a mistake as this meant I was learning both Effect-ts
        and React-Native simultaneously and this made for a cliff of a learning
        curve.
      </div>
      <div>
        <h2>Local First</h2>
        The core of the EdGo&apos;s technical architecture is that the app
        should be local-first, where the local DB results are treated as the
        source of truth, and API calls are used to sync the DB.
        <br />
        In practice, this means a heavy use of the <code>
          useLiveQuery
        </code>{" "}
        hook, which returns data from a query and automatically retriggers a
        rerender when query results change. <br />
        So when a user opens a screen, it triggers a API fetch, in the meantime,
        the screen renders the DB results, when the API fetch is resolved, it
        updates the db, which triggers a rerender with the updated results.
        <br />
        To prevent extremely large queries, data fetches are paginated, which
        showed a significant flaw, as when loading a new chunk of data, the UI
        would be stuck waiting for API queries to resolve despite only fetching
        data. This didn't occur when the user was offline.
        <br />
        This was eventually root-caused to be a limitation in DrizzleORM itself
        as its Expo-Sqlite driver is synchronous, and it turns out that the new
        page fetch was queued behind the previous page sync operation, which was
        waiting on the API results. When offline, the API call would fail almost
        immediately which terminated the sync and unblocked the next page sync.{" "}
        <br />
        This is still an issue, and my "fix" was adopting a hacky patch to
        support asynchronous operations, while waiting for the Drizzle driver to
        be updated to be asynchronous.
        <a href="https://github.com/drizzle-team/drizzle-orm/issues/5240">
          (Github Issue).
        </a>
      </div>
      <div>
        <h2>Rendering Threads</h2>
        One of the other big technical hurdles was rendering threads and
        comments, as EdDiscussion returns these through a custom HTML-like XML
        schema which caused a couple of issues.
        <br />
        Firstly, TurboXML (XML parsing library) did not support self-closing
        tags, which EdDiscussion used for line breaks. TurboXML had to be
        patched to support this and to lightly restructure the returned data to
        be more easily parsed.
        <br />
        Secondly, the largest difficulty with the rendering is the text node
        merging. React-Native does not support copying text from across
        different <code>Text</code> nodes, hence a core part of the XML
        rendering was to collect all consecutive text nodes and merge them into
        a single <code>Text</code> node.
        <br />
        Additionally, as part of the XML schema, each text formatting (bold,
        italics, underline etc.) had its own node.
        <br />
        To solve this, the root XML tree firstly runs as expected until a
        paragraph node is hit, as EdDiscussion used that tag as a container for
        all text-based nodes.
        <br />
        Then each child is recursively searched for text children until it hits
        a leaf, before moving back up the tree merging the text nodes as we go.
        <br />
        Finally by the time we get back to the root paragraph node, it is parsed
        as a single <code>Text</code> node, with subnodes for text formatting.
      </div>
      <div>
        <h3>Storage Layer</h3>
        For storage, it is quite simple, the database is used as the source of
        truth, while a react-native-mmkv keystore acts as a caching layer,
        particular for XML parsed threads and comments.
      </div>
      <div>
        <h2>Conclusion</h2>
        The creation of EdGo was a really good learning opportunity.
        <br />
        After this experience, given the choice I would use React-Native (Expo)
        again, Effect-ts if an application fit its usecase, but likely not
        DrizzleORM on mobile, until its Expo-Sqlite driver properly supports
        asynchronous operations.
      </div>
      <div>
        <h3>Thanks</h3>A special thanks to smartspot2 (Alec Li) for his work
        documenting most of the Ed Discussion API{" "}
        <a href="https://github.com/smartspot2/edapi/blob/9199e1001eb04b86bb8f68d0c5f9042453cd1387/docs/api_docs.md">
          here.
        </a>
      </div>
      <div>
        <h3>Addendum: Additional API documentation</h3>
        As an aside, I had to reverse engineer more of the Ed API to get some
        features to work.
        <br />
        <h4>Region (GET)</h4>
        <code>https://edstem.org/api/region</code>
        <br />
        This returns <code>country_code, default_region</code>, which are both 2
        character country codes e.g. (us, au)
        <h4>Voting (POST)</h4>
        <code>https://edstem.org/api/threads/&#123;threadId&#125;/upvote</code>
        <br />
        <code>https://edstem.org/api/threads/&#123;threadId&#125;/unvote</code>
        <br />
        <h4>Search (GET)</h4>
        <code>
          https://edstem.org/api/courses/&#123;courseId&#125;/threads/search?&#123;params&#125;
        </code>
        <br />
        Where the parameters are <code>query, sort, limit, offset</code>, sort,
        limit and offset are already documented by smartspot2, and query is
        simply a string that you want to query from, it returns a standard
        thread response.
        <h3>WebSocket API</h3>
        <code>wss://edstem.org/api/stream</code>
        <br />
        Ed's WebSocket API isn't particularly complex, but it has a couple of
        things you need to get right.
        <br />
        <h4>Authentication</h4>
        Similar to the HTTP endpoints, the WebSocket can be authenticated using
        a bearer token, however, the standard WebSocket API does not support
        headers.
        <br /> Afaik there is no way to authenticate using an API token on the
        browser, as the X-token used to authenticate seems to be different from
        the API token.
        <br />
        Alternative WebSocket implementations such as NodeJS do support headers
        on the Websocket handshake and will work, e.g. React-Native WebSockets{" "}
        <CodeBlock>
          {`const Ws = WebSocket as unknown as new (
  url: string,
  protocols: string[],
  options: { headers?: Record<string, string>},
) => WebSocket;`}
        </CodeBlock>
        <h4>API Request Formatting</h4>
        Ed's WebSocket API works by sending a key-value pair{" "}
        <code>{`{ id: 1, type: "" },`}</code>, where ID is a incremental
        identifier which resets on every WebSocket connection and type is the
        WebSocket API request type.
      </div>
      <div>
        <h4>Unread Message Counts (WebSocket)</h4>
        Note: This is the only WebSocket request type I reverse engineered,
        there are more, I just didn't need them. <br />
        <code>{`{ id: {ID}, type: "thread.unreadCounts" },`}</code>
        <br />
        It returns the unread counts in this format
        <CodeBlock>
          {`{
  "id": {ID},
  "type": "thread.unreadCounts",
  "data": {
    "{COURSE_ID}": {
      "unread": UNREAD_COUNT
    },
    ...
    "{COURSE_ID}": {
      "unread": UNREAD_COUNT
    },
  }
}`}
        </CodeBlock>
      </div>
    </article>
  );
}
