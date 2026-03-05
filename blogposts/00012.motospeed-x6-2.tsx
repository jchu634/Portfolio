import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import { CodeBlock } from "@/components/ui/codeblock";
import FigureWithCaption from "@/components/ui/captioned-image";

export const metadata: Metadata = {
  title: "Motospeed X6 Reverse engineering - Lighting, Settings",
  date: "2026-03-05",
  description: "Motospeed X6 writeup part 2",
  lastUpdate: "2026-03-06",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />
      <div>
        <div>
          <h2>Intro</h2>
          After writing the first article, I got pretty nerdsniped into reverse
          engineering the rest of the mouse's features.
          <br />
          After finding the battery request in Part 1, it got much easier as I
          now know what to do and where to look.
        </div>
        <br />
        At its core, the API still sends SET_REPORTs with custom payloads to EP0
        to act as a private command, and it is pretty easy to reverse by just
        toggling stuff and seeing what in the payload changes.
        <br />
        Note: I assume that byte 2 in general acts as a command identifier,
        although it is pure conjecture, it lines up pretty well. (In this same
        vein, Lighting commands have an byte 3 additional sub-command
        identifier)
      </div>
      <div>
        <div>
          <h2>Lighting</h2>
          There are 4 lighting 'modes': (Nothing, Static, Breathing and
          Rainbow), byte 3 communicates the mode.
          <br /> Apart from that, there isn't particularly anything interesting
          to say about lighting packets, as the mode byte is followed by the
          brightness and speed bytes, and finally the RGB bytes and padding.
          <br />
          <h4>No Lighting packet</h4>
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b5 24 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
│  │  │  └──────────────────padding──────────────────────────┘
│  │  └─ 0x00 (No Lighting Mode)
│  └ 0x24 (Lighting Command)
└ 0xb5 (Report ID)`}
          </CodeBlock>
          <h4>Static Lighting packet Example:</h4>
          Colour: RGB(255,51,50) and (brightness=255)
          <br />
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b5 24 01 ff 80 ff 33 32 00 00 00 00 00 00 00 00 00 00 00 00 00
│  │  │  │  │  │  │  │  └───────────────padding───────────────┘
│  │  │  │  │  └R └G └B
│  │  │  │  └ Unused
│  │  │  └ Brightness
│  │  └ 0x01 (Static Lighting Mode)
│  └ 0x24 (Lighting Command)
└ 0xb5 (Report ID)`}
          </CodeBlock>
          <h4>Breathing Lighting packet Example:</h4>
          Colour: RGB(0,255,6), (brightness=255) and (Speed=204)
          <br />
          Note: Speed = Breathing animation speed
          <br />
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b5 24 02 ff cc 00 ff 06 00 00 00 00 00 00 00 00 00 00 00 00 00
│  │  │  │  │  │  │  │  └───────────────padding──────────────┘
│  │  │  │  │  └R └G └B
│  │  │  │  └ Speed
│  │  │  └ Brightness
│  │  └ 0x02 (Breathing Lighting Mode)
│  └ 0x24 (Lighting Command)
└ 0xb5 (Report ID)`}
          </CodeBlock>
          <h4>Rainbow Lighting packet Example:</h4>
          Colour: (brightness=121) and (Speed=255)
          <br />
          Side note, I have no idea why byte 6 is set to FF (byte 6 is R in
          other modes)
          <br />
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b5 24 03 79 ff ff 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
│  │  │  │  │  │  └──────────────────padding─────────────────┘
│  │  │  │  │  └ Unknown
│  │  │  │  └ Speed
│  │  │  └ Brightness
│  │  └ 0x03 (Rainbow Lighting Mode)
│  └ 0x24 (Lighting Command)
└ 0xb5 (Report ID)`}
          </CodeBlock>
        </div>

        <div>
          <h2>Settings</h2>
          The settings packets are in comparison quite a bit more interesting,
          they cram all the settings into one payload, and more importantly
          there are two unused bytes which appear before Esports mode,
          indicating there might be some hidden settings which are disabled if
          following convention.
          <br /> If I were to speculate, I would assume that they used to be
          used to set the debounce and sleep time, before they were spun out
          into their own packets, as the debounce and sleep packets are
          remarkably empty.
          <br />
          <h4>General Settings packet Example:</h4>
          Lift Up Distance = High, Ripple = on, Angle Snap = Off, Motion Sync =
          Off, Esports Mode = Closed
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b5 42 02 01 02 01 00 01 01 00 00 00 00 00 00 00 00 00 00 00 00
│  │  │  │  │  │  └─┬─┘  │  └────────────padding──────────────┘
│  │  │  │  │  │    │    └ Esports Mode (01 = Closed, 02 = Open)
│  │  │  │  │  │    └ Unknown
│  │  │  │  │  │
│  │  │  │  │  └ Motion Sync (01 = On, 02 = Off)
│  │  │  │  └ Angle Snap (01 = On, 02 = Off)
│  │  │  └ Ripple (01 = On, 02 = Off)
│  │  └─ Lift Up Distance Flag (01=low, 02=high)
│  └ 0x42 (General Settings Command)
└ 0xb5 (Report ID)`}
          </CodeBlock>
          <br />
          <h4>Debounce time packet Example:</h4>
          Debounce = 7ms
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b5 43 07 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
│  │  │  └─────────────────────padding───────────────────────┘
│  │  └─ Debounce Time (ms) (Application Limit is 0-20)
│  └ 0x43 (Debounce Time Command)
└ 0xb5 (Report ID)`}
          </CodeBlock>
          <h4>Sleep Time packet Example:</h4>
          Sleep Time = 1 minute
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b5 0a 01 01 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
│  │  │  │  └────────────────────padding─────────────────────┘
│  │  │  └─ Sleep time (minutes)
│  │  └─ Unknown (Untested suspicion is that it changes the time units)
│  └ 0x0a (Sleep Time Command)
└ 0xb5 (Report ID)`}
          </CodeBlock>
          <br />
          <h3>Crammed Packets</h3>
          The DPI packet is quite remarkable in how much they managed to cram
          into one packet.
          <br />
          Motospeed uses the same packet to change DPI values, which DPI slot is
          currently being used and even how many DPI slots are active.
          <br /> Byte 4 changes the currently active slots, <br />
          Bytes 6-15 act as pairs to form a "bucket" that stores the
          slots&apos;s dpi in little-endian format, <br />
          and finally byte 16 changes the number of active slots.
          <br />
          <h4>DPI packet Example:</h4>
          Currently selected DPI Slot: 4 (0-indexed), Slot 0 DPI: 400, Slot 1
          DPI: 800, Slot 2 DPI: 1200, Slot 3 DPI: 3200, Slot 4 DPI: 26000, DPI
          Count: 5
          <br />
          Notes: DPI is stored in little endian format. (e.g.
          <code>0x04b0</code> would be stored as <code>b0 04</code>)<br />
          Max DPI is 26000
          <br />
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b5 40 ff 04 ff 90 01 20 03 b0 04 80 0c 90 65 05 00 00 00 00 00
│  │      │    └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘  │ └──padding───┘
│  │      │      │     │     │     │     │    └ DPI Count (Max 5)
│  │      │      │     │     │     │     └ Slot 4 DPI
│  │      │      │     │     │     └ Slot 3 DPI
│  │      │      │     │     └ Slot 2 DPI
│  │      │      │     └ Slot 1 DPI
│  │      │      └ Slot 0 DPI
│  │      └─ Selected DPI Slot
│  └ 0x40 (DPI Command)
└ 0xb5 (Report ID)`}
          </CodeBlock>
          <br />
          The dongle polling rate packet is extremely similar to the DPI packet,
          with the difference in that it has 1 index/slot more than DPI.
          <br />
          What may warrant further research is the fact that Motospeed does not
          expose the ability to change the polling rates.
          <br />I suspect things might start to either break, start doing
          interesting things, or quietly nothing changes if you change those
          values when sending to the mouse.
          <br /> I leave this as an exercise to the reader, as I don&apos;t want
          to break my one and only mouse.
          <h4>Polling packet Rate Example:</h4>
          Polling rate index 3 (2000hz)
          <br />
          <CodeBlock
            hideCopyButton={true}
            className="my-2 w-fit"
            language="bash"
          >
            {`b5 41 ff 03 ff 7d 00 f4 01 e8 03 d0 07 a0 0f 40 1f 00 00 00 00
│  │      │    └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘ └─┬─┘ └─padding─┘
│  │      │      │     │     │     │     │     └ Index 5 8000hz
│  │      │      │     │     │     │     └ Index 4 4000hz
│  │      │      │     │     │     └ Index 3 2000hz
│  │      │      │     │     └ Index 2 1000hz
│  │      │      │     └ Index 1 500hz
│  │      │      └ Index 0 125hz
│  │      └─ Currently selected index
│  └ 0x41 (Polling Rate Command)
└ 0xb5 (Report ID)`}
          </CodeBlock>
        </div>
        <div>
          <h3>Additional Details</h3>
          The software saturation slider in the lighting controls is purely
          software based, all it does is change the RGB values in the command,
          it does not have its own byte. <br />
          Additionally, as an aside, the colour reproduction for the RGB is
          kinda crap, with a side-by-side for some colours, you wouldn't think
          they are supposed to be identical.
          <div className="flex w-150 items-center space-x-5">
            <FigureWithCaption
              src="/blogs/12/255.72.0.jpg"
              caption="Mouse with RGB set to reddish-orange."
              aspectRatio="aspect-4/3"
              className="not-prose block"
            />
            <div className="size-50 bg-[#ff4800]" />
          </div>
          <div className="flex w-150 items-center space-x-5">
            <FigureWithCaption
              src="/blogs/12/255.222.0.jpg"
              caption="Mouse with RGB set to a shade of yellow"
              aspectRatio="aspect-4/3"
              className="not-prose block"
            />
            <div className="size-50 bg-[#ffdd00]" />
          </div>
        </div>

        <div>
          <h3>Conclusion</h3>
          Compared to part 1, I found this significantly easier to research as I
          learnt a lot during the process.
          <br />
          I find this stuff facinating, the amount of stuff they were able to
          achieve without custom drivers just by using SET_REPORT as a private
          channel to communicate configuration info.
          <br />
          This time, unlike Part 1, when I wanted the info to design a custom
          utility, I have no idea if this information would be ever be useful.
          <br />
          Maybe one day I will write a virtual HID driver for controlling the
          RGB lights, of which I would argue hardly deserve that name, given how
          bad the colour reproduction is.
          <br />
          In part 3, I will explore how their button remapping feature works, so
          hopefully, I will see you then.
          <br />
          POC code is available{" "}
          <a href="https://github.com/jchu634/motospeed-x6-reverse-engineering">
            here
          </a>
        </div>
      </div>
    </article>
  );
}
