import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import { CodeBlock } from "@/components/ui/codeblock";

export const metadata: Metadata = {
  title: "Setting up Vlans by port on the ICX6430-C12",
  date: "2026-01-30",
  description: "Yay vlans",
  lastUpdate: "2026-01-30",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />

      <div>
        <div>
          <h2>Intro</h2>
          This blogpost assumes that the switch is fully up to date and that you
          have cli access.
          <a href="https://fohdeesha.com/docs/icx6430.html">
            <sup>(Instructions Here)</sup>
          </a>
          .
        </div>
        <div>
          <h2>CLI Commands</h2>
          This entire blogpost assumes that you have enabled editing.
          <CodeBlock className="w-fit pr-10" language="bash">
            {`enable
configure terminal`}
          </CodeBlock>
          <h3>Creating a VLAN</h3>
          Command:
          <CodeBlock className="w-fit pr-10" language="bash">
            vlan &lt;VLAN_ID&gt; name &lt;OPTIONAL_NAME&gt; by port
          </CodeBlock>
          <br />
          Note that VLAN 1 is the default VLAN and that ports are implicitly
          untagged in VLAN 1.
          <h3>Tagging a interface</h3>
          Firstly, open the vlan for editing, (it should already be open if you
          just created the vlan)
          <CodeBlock className="w-fit pr-10" language="bash">
            vlan &lt;VLAN_ID&gt;
          </CodeBlock>
          Then tag the interface e.g. Interface 1
          <CodeBlock className="w-fit pr-10" language="bash">
            tagged ethernet 1/1/1
          </CodeBlock>
          or an range e.g. Interface 1-5
          <CodeBlock className="w-fit pr-10" language="bash">
            tagged ethernet 1/1/1 to 1/1/5
          </CodeBlock>
          <h3>Dual-mode (a.k.a. allowing untagged+tagged vlan traffic)</h3>
          If you want an interface to accept and transmit both tagged/untagged
          traffic, you will need to set it to dual-mode. Firstly open the
          interface (e.g. interface 1)
          <CodeBlock className="w-fit pr-10" language="bash">
            interface ethernet 1/1/1/
          </CodeBlock>
          Then mark it as dual-mode
          <CodeBlock className="w-fit pr-10" language="bash">
            dual-mode 1
          </CodeBlock>
          Note: you can specify a different vlan as the default in dual mode by
          changing the vlan_id: e.g. <code>dual-mode 10</code>
        </div>
        <div>
          <h3>Conclusion</h3>
          <div>
            That&apos;s it, if you want to read more in depth, the documentation
            in the Fastiron Ethernet Switch Platform and Layer 2 Switching guide
            is quite good, you can find it in Foodeesha&apos; Master Zip
            <a href="https://fohdeesha.com/docs/brocade-overview.html">
              {" "}
              here.
            </a>
            <br />
          </div>
        </div>
      </div>
    </article>
  );
}
