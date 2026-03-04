import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import { CodeBlock } from "@/components/ui/codeblock";
import FigureWithCaption from "@/components/ui/captioned-image";

export const metadata: Metadata = {
  title: "Reverse engineering a bit of the Motospeed X6",
  date: "2026-03-01",
  description:
    "Writeup on reverse engineering the Motospeed X6 battery reporting mechanisms.",
  lastUpdate: "2026-03-04",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />

      <div>
        <div>
          <h2>Background</h2>
          After years (semi)happily using a Razer Basilisk Ultimate for many
          years, I finally switched mice when I moved for my studies.
          <br />
          Since, I was quite timestarved, I switched to a Motospeed X6 that I
          had on hand, having picked it up new for ~$30 NZD quite a while ago.
          <br /> Since then it has surprised me as I quite enjoy using it.
          <br />
          My only nitpick is that I don&apos;t like having to open their
          software to check the battery level.
          <br />I also hated this with the Razer Basilisk, but I tolerated that
          as I needed Razer's Synapse software to have working keybinds.
          <br />
          The motospeed however doesn't need the software to operate the
          keybinds once set, so I now what can I do?
        </div>
        <div>
          <h2>The solution</h2>
          Reverse engineer the mouse communications and write my own app. So off
          I went.
          <br />
          I first did some preliminary research, there doesn&apos;t seem to be
          anyone else reverse engineering these things.
          <br />
          Taking a look at the official software with DIE (Detect It Easy), it
          appears to be written in C++, and with a quick look at the machine
          code in Ghidra, I notice that it looks like a lot of painful work and
          a giant red flag to try something else first.
          <br />
        </div>
        <div>
          <h2>USB Internals</h2>
          Taking a look at it using UsbPCap and Wireshark instead, there appears
          to be some interesting stuff.
          <br />
          Firstly, as I am using the 2.4ghz, the mouse appears with the name
          &quot;Dongle 8K&quot; and apparently they re-use this dongle a bit, as
          the dongle&apos;s firmware shows Darmoshark as the manufacturer,
          (which appears to be a Motoshark sub-brand)
          <br />
          The dongle appears as a USB composite device with 7 subdevices, likely
          done so to support different features and interestingly, it has a
          keyboard-subdevice which is likely how the mouse can assign keyboard
          keys to the side buttons.
          <CodeBlock hideCopyButton={true} className="my-2 w-fit">
            {`[Port 2] USB Composite Device
  USB Input Device
    HID-compliant mouse
  USB Input Device
    HID Keyboard Device
    HID-compliant consumer control device
  USB Input Device
    HID-compliant vendor-defined device
    HID-compliant vendor-defined device
  USB Input Device
    HID-compliant bar code badge reader
  USB Input Device
    HID-compliant vendor-defined device`}
          </CodeBlock>
          Now taking a look at the HID communication packets.
          <FigureWithCaption
            src={"/blogs/11/packets.png"}
            aspectRatio={"aspect-4/3"}
            className="not-prose block"
            figureWidth="w-150"
            caption={"Exerpt of packets"}
          />
          There are a lot of packets which appear constantly from 2.6.1,
          according to the device tree, these come from the HID mouse, so as
          mouse packets they can be safely ignored, similarly packets from 2.6.2
          can be ignored.
          <br />
          Whats left is a a small amount of packets.
          <FigureWithCaption
            src={"/blogs/11/packets_filtered.png"}
            aspectRatio={"aspect-4/3"}
            className="not-prose block"
            figureWidth="w-150"
            caption={"Exerpt of packets"}
          />
          If I search the packets for the currently reported battery level (53%)
          in hex (0x35), there is a packet that shows up from the 5th interface:
          a HID vendor-defined device.
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`0000   1b 00 10 50 31 97 04 87 ff ff 00 00 00 00 09 00
0010   01 02 00 06 00 85 01 40 00 00 00 b4 06 00 22 22
0020   02 90 01 20 03 b0 04 80 0c c0 12 15 05 04 01 35
0030   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0040   00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
0050   00 00 00 00 00 00 00 00 00 00 00`}
          </CodeBlock>
          Stripping away the wireshark headers, we can see that the 21st byte
          holds the battery level.
          <br />
          Note: this was verified after watching the battery drop battery level
          and verifying the byte changed to the correct value.
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`Hex View  00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F

00000000  B4 06 00 22 22 02 90 01  20 03 B0 04 80 0C C0 12
00000010  15 05 04 01 35 00 00 00  00 00 00 00 00 00 00 00
00000020  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00
00000030  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  `}
          </CodeBlock>
          After a lot of trial and error (Replaying packets until the battery
          packet is sent), I finally somewhat understand and can consistently
          repeat the communication flow to get a battery packet.
        </div>
        <div>
          <h2>Communication Flow</h2>
          <h3>Host SET_REPORT</h3>
          Firstly the Host needs to send a special SET_REPORT to EP0, the root
          of the composite device.
          <br />
          This is special as it appears Motospeed is utilising EP0 and
          SET_REPORT to send commands to the mouse like a private command
          channel with no need for custom drivers.
          <br />
          The SET_REPORT packet has these properties:
          <div className="lg:flex lg:items-center">
            <CodeBlock
              hideCopyButton={true}
              className="h-fit w-fit"
              language="bash"
            >
              {`Hex View  00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F

00000000  21 09 B5 02 04 00 15 00  B5 03 00 00 00 00 00 00
00000010  00 00 00 00 00 00 00 00  00 10 00 00 00 00 00     `}
            </CodeBlock>
            <ul className="my-0">
              <li>
                <code>bmRequestType: 0x21</code>, <code>bRequest: 0x09</code>
              </li>

              <li>
                <code>wValue: 0x02b5</code>, <code>wIndex: 4</code>
              </li>

              <code>
                data: b5 06 00 00 00 00 00 00 00 00
                <br />
                00 00 00 00 00 00 00 00 00 00 00
              </code>
            </ul>
          </div>
          <h3>Device Battery Report</h3>
          After the device receives the SET_REPORT, it sends a 64-byte HID
          interrupt IN report on EP5 (Vendor Defined HID Device).
          <br />
          <div className="lg:flex lg:items-center">
            <CodeBlock
              hideCopyButton={true}
              className="my-2 w-fit"
              language="bash"
            >
              {`Hex View  00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F

00000000  B4 06 00 22 22 02 90 01  20 03 B0 04 80 0C C0 12
00000010  15 05 04 01 35 00 00 00  00 00 00 00 00 00 00 00
00000020  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00
00000030  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00  `}
            </CodeBlock>
            <ul className="my-0">
              <li>
                Offset <code>0x00</code>, Value:<code>B4</code> (Report ID)
              </li>

              <li>
                Offset <code>0x14</code>, Value:<code>35</code> (Battery Level
                (53%))
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3>Charging</h3>
          There aren't many changes when the mouse is charging, but still
          connected wirelessly, you still send the <code>SET_REPORT</code> and
          the packet received is almost identical. <br />
          The only difference is that it sets the first bit to indicate charging.
          <br />
          e.g. If it is charging and it is at 31% <code>(0x1F)</code>, it would
          set the first bit to <code>1</code> hence returning 159%{" "}
          <code>(0x9F)</code>
          <div className="flex gap-x-2">
            <CodeBlock
              hideCopyButton={true}
              className="my-2 w-fit"
              language="bash"
            >
              0001 1111 (Not Charging)
            </CodeBlock>
            <CodeBlock
              hideCopyButton={true}
              className="my-2 w-fit"
              language="bash"
            >
              1001 1111 (Charging)
            </CodeBlock>
          </div>
          <h3>Plugged in</h3>
          When it is plugged in however, there are some changes.
          <br />
          Firstly the firmware reports the manufacturer as Motospeed instead of
          Darmoshark and the device is reported as "MOTOSPEED' - 'X6"
          <br />
          Secondly, although the USB device tree is identical to the dongle,
          while the VID is identical, the PID changes.
          <br />
          Lastly, the battery packet no longer returns useful information.
          <br />
          <br />
          In this example you can see that when plugged in directly, it reports
          an entirely wrong battery level.
          <div className="flex w-[55rem] justify-between">
            <p>
              Dongle (Not Charging)
              <br />
              Battery HEX: <code>0x3E</code> (62%)
              <br />
              Battery Actual: 62% (Not Charging)
            </p>
            <CodeBlock
              hideCopyButton={true}
              className="my-2 w-fit"
              language="bash"
            >
              {`Hex View  00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F

00000000  B4 06 00 22 22 02 90 01  20 03 B0 04 80 0C C0 12
00000010  15 05 04 01 3E 00 00 00  00 00 00 00 00 00 00 00
00000020  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00
00000030  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00`}
            </CodeBlock>
          </div>
          <div className="flex w-[55rem] justify-between">
            <p>
              Dongle (Charging)
              <br />
              Battery HEX: <code>0xBE</code> (190%)
              <br />
              Battery Actual: 62% (Charging)
            </p>
            <CodeBlock
              hideCopyButton={true}
              className="my-2 w-fit"
              language="bash"
            >
              {`Hex View  00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F

00000000  B4 06 00 22 22 02 90 01  20 03 B0 04 80 0C C0 12
00000010  15 05 04 01 BE 00 00 00  00 00 00 00 00 00 00 00
00000020  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00
00000030  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00`}
            </CodeBlock>
          </div>
          <div className="flex w-[55rem] justify-between">
            <p>
              Plugged in directly
              <br />
              Battery: <code>0xA4</code> (164%)
              <br />
              Battery Actual: IDK
            </p>
            <CodeBlock
              hideCopyButton={true}
              className="my-2 w-fit"
              language="bash"
            >
              {`Hex View  00 01 02 03 04 05 06 07  08 09 0A 0B 0C 0D 0E 0F

00000000  B4 06 00 22 22 02 90 01  20 03 B0 04 80 0C C0 12
00000010  15 05 04 01 A4 00 00 00  00 00 00 00 00 00 00 00
00000020  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00
00000030  00 00 00 00 00 00 00 00  00 00 00 00 00 00 00 00`}
            </CodeBlock>
          </div>
          <div>
            <CodeBlock
              hideCopyButton={true}
              className="my-2 h-fit w-fit"
              language="bash"
            >
              {`Dongle (Not Charging) 0011 1110
Dongle (Charging)     1011 1110
Plugged In            1010 0100
                `}
            </CodeBlock>
          </div>
          Since even the binary is so different from the rest, I have no idea
          how the battery is reported when the mouse is plugged in.
          <br />
          Additionally, I could not find any Wireshark packets that had some hex
          that reflected the battery when it was plugged in.
          <br />
          Finally, I have no idea if the battery level is even reported at all
          when plugged in, as the official software never actually shows the
          battery level when charging, just that it is charging.
        </div>
        <div>
          <h3>Conclusion</h3>
          Not much more to say.
          <br />
          I plan to do some more follow-on research, and reverse engineer how
          their button-remapping, RGB, dpi and macros work. So if you are
          interested, check back here.
          <br />
          Ultimately, I completed my goal and discovered how the Motospeed X6
          reports its battery levels and if it is charging. <br />
          Based on this research I made a system tray utility that shows your
          current battery and charge status, available now{" "}
          <a href="https://github.com/jchu634/motospeed-x6-Utilities">here.</a>
          <br />
          And for those who want to take a look at the POC code, it is available{" "}
          <a href="https://github.com/jchu634/motospeed-x6-reverse-engineering">
            here
          </a>
        </div>

        <div>
          <h4>AI Use Disclaimer</h4>
          AI was used as a learning resource to help understand the USB packet
          flow, write some code and as a psuedo search engine.
          <br />
          This article was <p className="inline font-bold">NOT</p> written with
          AI.
          <br />
        </div>
      </div>
    </article>
  );
}
