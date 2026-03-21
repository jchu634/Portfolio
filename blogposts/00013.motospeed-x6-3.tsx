import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import { CodeBlock } from "@/components/ui/codeblock";
import FigureWithCaption from "@/components/ui/captioned-image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerShell,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Motospeed X6 Reverse engineering - Mouse Remapping",
  date: "2026-03-06",
  description: "Motospeed X6 writeup part 3",
  lastUpdate: "2026-03-06",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />
      <div>
        <div>
          <h2>Intro</h2>
          This is the 3rd and final part of reverse engineering the Motospeed
          X6, where I am covering how it handles macros and how it fetches the
          mouse's current settings.
        </div>
      </div>
      <div>
        <div>
          <h2>Fetching Settings from Mouse</h2>
          The packet you send to request a settings packet is really simple, but
          has an enormous amount of padding (62 bytes for a 64 byte packet).
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b3 06 00 00 00 00 ... 00
`}
          </CodeBlock>
          The settings packet you receive on the other hand is enormous and
          data-dense. (Note also padded to total of 64 bytes)
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b4 06 00 22 22 02 90 01 20 03 b0 04 80 0c c0 12 0d 05 05 01 2e 00 00 00 00 00 ... 00 00
│        └┬─┘  │  └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘ │     │  │     └───── padding ... ────┘
│         │    │    └ 1   2     3     4   5 ┘   │     │  └ Sleep Time
│         │    │      └ DPI Slot Values ─┘      │     └ Debounce Time
│         │    └ Current DPI Slot               └ Settings Byte
│         └ Polling Rate
└ 0xb4 (Report ID)
`}
          </CodeBlock>
          The Settings byte's internal structure is as such (where 1 = On, 0 =
          Off)
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`0 0 0 1 1 1 1 0
│ │   │ │ │ └┬┘
│ │   │ │ │  └ Lift Off Distance (High:01, Low:10)
│ │   │ │ └ Motion Sync
│ │   │ └ Angle Snap
│ │   └ Ripple
│ └ Scroll Direction
└ Esports Mode
`}
          </CodeBlock>
          There were a couple of interesting things of note:
          <ul>
            <li>
              The polling rate uses two repeated bytes and the first 4 bits of
              each byte are used to communicate the Polling rate.
              <br />
              It is the only setting that repeats its data.
            </li>
            <li>
              Additionally, RGB settings are not transmitted, the official app
              apparently stores the last modified state in an internal database
              instead.
              <br />
              What is strange is that this is a 64 byte packet, hence there
              looks like there is plenty of space to add it, but IDK, I'm not a
              firmware developer/chipset designer.
            </li>
          </ul>
        </div>
        <div>
          <h2>Remapping Controls</h2>A quite interesting quirk about the
          Remapping packets, are that they are 64 bytes, larger than the
          standard 21 bytes of the other packets.
          <br />
          Quite interesting is that Remapping packets are unusally large, unlike
          with the data fetching packet where I could imagine that it needs a 64
          byte packet as it needs a large return packet to hold all the data,
          the remapping packet and responses are quite small.
          <h4>Key Remapping Packet</h4>
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b3 52 03 00 01 02 00 00 00 00 00 00 00 ... 00 00
│  │  │     │  └──┬───┘  └──── padding ... ────┘
│  │  │     │     └─ Features codes
│  │  │     └ Feature to change
│  │  └ Key to remap
│  └ 0x52 (Remapping Command)
└ 0xb3 (Report ID)`}
          </CodeBlock>
          <h3>Features + Feature Codes</h3>
          <p>These are dropdown menus, click/tap to see more info</p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1 m-0" className="[&_h3]:m-0 [&_ul]:m-0">
              <AccordionTriggerShell className="m-0 text-xl">
                Mouse Features Map Codes (01) ˅
              </AccordionTriggerShell>
              <AccordionContent className="text-lg">
                <ul>
                  <li>
                    <code>0x010000</code>: Left Click
                  </li>
                  <li>
                    <code>0x020000</code>: Right Click
                  </li>
                  <li>
                    <code>0x040000</code>: Middle Click
                  </li>
                  <li>
                    <code>0x080000</code>: Forward
                  </li>
                  <li>
                    <code>0x100000</code>: Backward
                  </li>
                  <li>
                    <code>0x800000</code>: Double-Click
                  </li>
                  <li>
                    <code>0x000200</code>: Scroll Up
                  </li>
                  <li>
                    <code>0x00fe00</code>: Scroll Down
                  </li>
                  <li>
                    <code>0x0000fe</code>: Scroll Left
                  </li>
                  <li>
                    <code>0x000002</code>: Scroll Right
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1 m-0" className="[&_h3]:m-0 [&_ul]:m-0">
              <AccordionTriggerShell className="text-xl">
                Sensitivity Codes (05) ˅
              </AccordionTriggerShell>
              <AccordionContent className="text-lg">
                <ul>
                  <li>
                    <code>0x010000</code>: DPI Loop
                  </li>
                  <li>
                    <code>0x020000</code>: DPI +
                  </li>
                  <li>
                    <code>0x030000</code>: DPI -
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1 m-0" className="[&_h3]:m-0 [&_ul]:m-0">
              <AccordionTriggerShell className="text-xl">
                Multimedia Map Codes (03) ˅
              </AccordionTriggerShell>
              <AccordionContent className="text-lg">
                Note, these generally map to HID Multimedia Usage Codes
                <br />
                Player meanings launching the media player and its code is part
                of the Consumer Control.
                <ul>
                  <li>
                    <code>0xe90000</code>: Volume +
                  </li>
                  <li>
                    <code>0xea0000</code>: Volume -
                  </li>
                  <li>
                    <code>0xe20000</code>: Mute
                  </li>
                  <li>
                    <code>0x830100</code>: Player
                  </li>
                  <li>
                    <code>0xcd0000</code>: Play/Pause
                  </li>

                  <li>
                    <code>0xb60000</code>: Previous
                  </li>
                  <li>
                    <code>0xb50000</code>: Next
                  </li>
                  <li>
                    <code>0xb70000</code>: Stop
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1 m-0" className="[&_h3]:m-0 [&_ul]:m-0">
              <AccordionTriggerShell className="text-xl">
                System Shortcuts Map Codes (08) ˅
              </AccordionTriggerShell>
              <AccordionContent className="text-lg">
                Links:{" "}
                <a href="https://learn.microsoft.com/en-us/windows-hardware/drivers/hid/display-brightness-control">
                  Brightness Control
                </a>
                ,{" "}
                <a href="https://download.microsoft.com/download/1/6/1/161ba512-40e2-4cc9-843a-923143f3456c/translate.pdf">
                  HID Code table
                </a>
                <ul>
                  <li>
                    <code>0x0c6f00</code>: Screen Brightness + (0c prefix = HID
                    Usage Page)
                  </li>
                  <li>
                    <code>0x0c7000</code>: Screen Brightness -
                  </li>
                  <li>
                    <code>0x0c9201</code>: Calculator
                  </li>
                  <li>
                    <code>0x0c9401</code>: My Computer (Opens File Explorer)
                  </li>
                  <li>
                    <code>0x0c2302</code>: Website (Opens new instance of
                    default browser)
                  </li>
                  <li>
                    <code>0x0c8a01</code>: Mail
                  </li>
                  <li>
                    <code>0x07003e</code>: Refresh (F5) (07 = keyboard page)
                  </li>
                  <li>
                    <code>0x07042b</code>: Switch Application (Alt + Tab)
                  </li>
                  <li>
                    <code>0x070106</code>: Copy (CTRL + C)
                  </li>
                  <li>
                    <code>0x07011b</code>: Cut (CTRL + X)
                  </li>
                  <li>
                    <code>0x070119</code>: Paste (CTRL + V)
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1 m-0" className="[&_h3]:m-0 [&_ul]:m-0">
              <AccordionTriggerShell className="text-xl">
                RGB Effect Control Map Codes (06) ˅
              </AccordionTriggerShell>
              <AccordionContent className="text-lg">
                <ul>
                  <li>
                    <code>0x010000</code>: Light Effect Switch
                  </li>
                  <li>
                    <code>0x020000</code>: Speed Switch
                  </li>
                  <li>
                    <code>0x030000</code>: Colour Switch
                  </li>
                  <li>
                    <code>0x040000</code>: Brightness +
                  </li>
                  <li>
                    <code>0x050000</code>: Brightness -
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1 m-0" className="[&_h3]:m-0 [&_ul]:m-0">
              <AccordionTriggerShell className="text-xl">
                Disable Key Code (09) ˅
              </AccordionTriggerShell>
              <AccordionContent className="text-lg">
                <ul>
                  <li>
                    <code>0x000000</code>: disable
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <div>
        <h2>Macro Packets</h2>
        Heres where we get into the most complex feature of the mouse.
        <br />
        There are two different packet structures for small and large macros
        respectively and frankly, I don't still fully understand the large
        packet structure.
        <h4>Short Packet</h4>
        <CodeBlock hideCopyButton={true} className="my-2 w-fit" language="bash">
          {`                                         Instructions
                                       ┌───┐       ┌───┐
b3 54 01 00 0e 00 01 01 40 00 00 02 00 81 04 00 00 01 04 00 00 00 00 00 ... 00 00
│  │  │     └─┬─┘ └─┬─┘ │  └─┬─┘ └─┬─┘                   └──── padding  ... ────┘
│  │  │       │     │   │    │     └ Instruction Count
│  │  │       │     │   │    └ Time Delay
│  │  │       │     │   └ Loop Type
│  │  │       │     └─ No. Loops
│  │  │       └ Payload Length
│  │  └ Key to remap
│  └ 0x54 (Remapping Macro Command)
└ 0xb3 (Report ID)`}
        </CodeBlock>
        <h4>Large Packet (First of a multi-packet sequence)</h4>
        <CodeBlock hideCopyButton={true} className="my-2 w-fit" language="bash">
          {`                                                 Instructions
                                                ┌───┐       ┌───┐
B3 71 03 3A 54 03 00 B2 00 01 01 00 00 00 2B 00 81 17 00 00 0F 5E 00 00 ... D2 2F
│  │        └─┬─┘ └─┬─┘ │  └─┬─┘ └─┬─┘                                      └─┬─┘
│  │          │     │   │    │     └ Instruction Count? Always empty          └ End of Packet Indicator
│  │          │     │   │    └ Time Delay
│  │          │     │   └ Loop Type
│  │          │     └─ No. Loops
│  │          └ Payload Length
│  └ 0x71 (Remapping Large Macro Command)
└ 0xb3 (Report ID)`}
        </CodeBlock>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1 m-0" className="[&_h3]:m-0 [&_ul]:m-0">
            <AccordionTriggerShell className="text-xl">
              Loop Types ˅
            </AccordionTriggerShell>
            <AccordionContent className="text-lg">
              <ul>
                <li>
                  <code>0x00</code>: Don&apos;t Loop
                </li>
                <li>
                  <code>0x20</code>: Loop until stop pressing
                </li>
                <li>
                  <code>0x40</code>: Loop until any click
                </li>
                <li>
                  <code>0x60</code>: Loop until trigger key is pressed again
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <h3>Instruction Structure</h3>
        The instructions first start with a SubPacket header
        <ul>
          <li>
            <code>0x81</code>: HID key up
          </li>
          <li>
            <code>0x01</code>: HID key down
          </li>
          <li>
            <code>0x0f</code>: Delay
          </li>
          <li>
            <code>0x88</code>: Mouse Down
          </li>
          <li>
            <code>0x08</code>: Mouse Up
          </li>
          <li>
            <code>0x05</code>: Mouse Scroll
          </li>
          <li>
            <code>0x09</code>: Mouse Move
          </li>
        </ul>
        and from there the payload depends on the subpacket type:
        <h4>Subpacket payloads</h4>
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-mouse-click m-0"
            className="[&_h3]:m-0 [&_ul]:m-0"
          >
            <AccordionTriggerShell className="text-xl">
              MouseClick ˅
            </AccordionTriggerShell>
            <AccordionContent className="text-lg">
              <ul>
                <li>
                  <code>0x01</code>: left click
                </li>
                <li>
                  <code>0x02</code>: right click
                </li>
                <li>
                  <code>0x04</code>: middle click
                </li>
                <li>
                  <code>0x10</code>: forward
                </li>
                <li>
                  <code>0x08</code>: backward
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-mouse-scroll m-0"
            className="[&_h3]:m-0 [&_ul]:m-0"
          >
            <AccordionTriggerShell className="text-xl">
              MouseScroll ˅
            </AccordionTriggerShell>
            <AccordionContent className="text-lg">
              <ul>
                <li>
                  <code>0x03</code>: scroll_up
                </li>
                <li>
                  <code>0xFD</code>: scroll_down
                </li>
              </ul>
              Note: Unlike many other events this is a toggle.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-sub-hid m-0"
            className="[&_h3]:m-0 [&_ul]:m-0"
          >
            <AccordionTriggerShell className="text-xl">
              HID ˅
            </AccordionTriggerShell>
            <AccordionContent className="text-lg">
              HID keys use the the <code>u8</code> code for the hid_key and is
              followed by a <code>u8</code> padding
              <br />
              You can find a really good list{" "}
              <a href="https://gist.github.com/MightyPork/6da26e382a7ad91b5496ee55fdc73db2">
                here
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-sub-delay m-0"
            className="[&_h3]:m-0 [&_ul]:m-0"
          >
            <AccordionTriggerShell className="text-xl">
              Delay ˅
            </AccordionTriggerShell>
            <AccordionContent className="text-lg">
              Delay is represented in a <code>u16</code> Little Endian number
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-sub-mouse-move m-0"
            className="[&_h3]:m-0 [&_ul]:m-0"
          >
            <AccordionTriggerShell className="text-xl">
              Mouse Move ˅
            </AccordionTriggerShell>
            <AccordionContent className="text-lg">
              Mouse Movements are represented using a set of x and y movements
              <br />
              They are represented as a signed <code>s8 </code> int
              <br />
              They do have a quirk where Y is reversed as positive = down,
              negative = up)
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <h3>Analysis</h3>
        What generally makes the short packet different from the large packets
        is the headers, large packets forgo the instruction count and the byte
        that used to be the remap key seems to be used for something else.
        <br />
        <br />
        What is notable about the packets is that after each instruction, they
        have 2 bytes of padding, and in large packets, since the end of packet
        indicator gets in the way of padding, the next packet's instruction area
        will start with two bytes of padding before continuing.
      </div>

      <div>
        <div>
          <h3>Conclusion</h3>
          I apologise for the relatively short explanation and the lack of
          details.
          <br />
          Nearing the end of the large packet analysis, I started to lose a bit
          of steam as I started getting a bit bored and distracted, and had to
          take a break, and writing this article was rather difficult as I
          started finding it difficult to remember the fine details of my
          research .
          <br />
          It is really fascinating how they engineered the macros, but it is
          unfortunately really tedious to understand and reverse engineer it.
          <br />
          <br />
          I may come back in the future and modify this blogpost with better
          information if I ever get the motivation to research this again, but I
          am quite tired of messing around with this mouse for now.
          <br />
          As an aside, I made a webHID utility based on this 3 part series, and
          it is available now{" "}
          <a href="https://x6-utility.keshuac.com/"> here.</a>
          <br />
          <br />I really hope you try it out if you own this mouse.
          <br />I hope this series has been interesting and you learnt something
          from it.
        </div>
      </div>
    </article>
  );
}
