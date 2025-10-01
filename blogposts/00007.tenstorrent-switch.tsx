import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";
import { CodeBlock } from "@/components/ui/codeblock";
import {
  TextExperiment,
  Switch1,
  Switch2,
  Switch3,
  Switch4,
  Switch4Flipped,
  Switch4Logic,
} from "@/components/blog/00007/switches";
import { PlusIcon, EqualIcon } from "lucide-react";
import { Blog7Diagram } from "@/lib/svg";

export const metadata: Metadata = {
  title: "Tenstorrent Switch",
  date: "2025-10-01",
  description: "That one time I got nerdsniped by a switch.",
  lastUpdate: "2025-10-01",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />

      <div>
        <div>
          <h2>Intro/Background</h2>
          <p>
            I was reading this{" "}
            <a href="https://openfuture.tenstorrent.com/">article</a> that
            Tenstorrent wrote on the uncertain future of AI and how it should be
            open to all instead of closed.
            <br />
            However instead of the content, I was nerdsniped and became
            fascinated by a particular switch they had for one of their
            graphics.
            <br />
            This is a short blogpost on my attempts to recreate it.
          </p>
        </div>
        <div>
          <h2>Recreating the look</h2>
          <p>
            First I tried to recreate the angled text in the skewed unpressed
            which was suprising easy,
            <br />
            as all it needed was an <code>&lt;p&gt;</code> to apply the
            horizontal center and a skewed div to apply the vertical centering
            to apply flex.
          </p>
          <div className="flex space-x-8 p-10">
            <TextExperiment />
            <CodeBlock
              code={`<div className="flex h-20 w-30 -skew-y-[23deg] items-center border-2 border-black dark:border-white">
  <p className="w-full text-center">test</p>
</div>`}
              language="jsx"
              className="not-prose"
            ></CodeBlock>
          </div>
          <div>
            <p>
              I then went further and created a crude rough mockup, where two
              divs provide the majority of the border lines of the switch,{" "}
              <br />
              and the containing div providing the bottom border.
            </p>
            <div className="flex space-x-8 p-10">
              <div>
                <Switch1 />
              </div>

              <CodeBlock
                code={`<div className="flex pt-10">
      <div className="flex h-21 w-40 items-center border-2 border-white"></div>
      <div className="flex border-2 dark:border-white">
        <div className="flex h-20 w-30 translate-y-[-25.5px] -skew-y-[24deg] items-center border-2 border-black dark:border-white">
          <p className="w-full text-center">test</p>
        </div>
        <div className="h-20 w-15 translate-y-[-26px] skew-y-[50deg] border-2 border-black dark:border-white"></div>
      </div>
    </div>`}
              ></CodeBlock>
            </div>
          </div>
          <p>
            But then I got really stuck as I could not get the second rectangle
            to line up no matter how I calculated the angles.
            <br />
            Eventually I found the problem, <code>skew</code> respects the width
            and height given to the div box.
            <br />
            However I could not understand how these two <code>divs</code> had
            the same width.
          </p>
          <div className="flex space-x-8 py-15">
            <div className="flex h-20 w-30 items-center border-2 border-black dark:border-white"></div>
            <div className="flex h-20 w-30 skew-y-[50deg] items-center border-2 border-black dark:border-white"></div>
          </div>

          <p>
            Eventually I figured it out.
            <br />
            When skew is applied, the div's original bounds are still present,
            (Indicated by red borders). <br />
            But the skewed rendered div edges (yellow) does not utilise the
            original bounds, it distorts and the distorted edge does not use the
            original width specified to it. <br />
            Hence the distorted edge's length can be calculated to be a
            hypothenuse of a theoretical triangle.
          </p>
          <div className="flex space-x-8 p-8">
            <div className="flex h-20 w-30 border-4 border-red-800">
              <div className="flex h-full w-full -translate-y-[22px] -skew-y-[23deg] items-center border-2 border-black dark:border-white">
                <p className="w-full text-center">test</p>
              </div>
            </div>
            <PlusIcon size={50} />
            <div className="flex h-20 w-30 -translate-y-[22px] -skew-y-[23deg] items-center border-2 border-black border-y-amber-400 dark:border-white dark:border-y-amber-300">
              <p className="w-full text-center">test</p>
            </div>
            <EqualIcon size={50} />
            <Blog7Diagram className="h-20 w-50" />
          </div>
          <p>
            From this discovery, you can then calculate the height of the lifted
            corner <br />
            and using this info can calculate the angle required for the second
            rectangular div to match the first div. (Some manual offsetting
            required)
          </p>
          <div className="flex space-x-8 p-10">
            <div>
              <Switch2 />
            </div>

            <CodeBlock
              code={`<div className="flex pt-10">
      <div className="flex h-21 w-40 items-center border-2 border-white"></div>
      <div className="flex border-2 dark:border-white">
        <div className="flex h-20 w-30 translate-y-[-25.5px] -skew-y-[23deg] items-center border-2 border-white">
          <p className="w-full text-center">test</p>
        </div>
        <div className="h-20 w-15 translate-y-[-26px] skew-y-[40.32deg] border-2 border-white"></div>
      </div>
    </div>`}
            ></CodeBlock>
          </div>
          <p>
            Once I had the mockup done, I can make it look a bit nicer:
            <br />
            So I modified the borders a bit so its a bit more consistent and
            less thick in some areas and then added a background to each
            element.
          </p>
          <div className="flex space-x-8 p-10">
            <div>
              <Switch3 />
            </div>

            <CodeBlock
              code={`<div className="flex pt-10">
      <div className="flex h-21 w-40 items-center border-2 border-white"></div>
      <div className="flex border-y-2 border-r-1 border-l-2 border-white">
        <div className="flex h-20 w-30 translate-y-[-25.5px] -skew-y-[23deg] items-center border-y-2 border-r-1 border-white">
          <p className="w-full text-center">Right Switch</p>
        </div>
        <div className="h-20 w-15 translate-y-[-26px] skew-y-[40.32deg] border-x-1 border-y-2 border-white"></div>
      </div>
    </div>`}
            ></CodeBlock>
          </div>
          <p>
            Note: This is using my specific background, adjust to your own
            site's colours
          </p>
          <div className="flex space-x-8 p-10">
            <div>
              <Switch4 />
            </div>

            <CodeBlock
              code={`<div className="flex pt-10">
      <div className="flex h-21 w-40 items-center border-2 border-white"></div>
      <div className="flex border-y-2 border-r-1 border-l-2 border-white">
        <div className="flex h-20 w-30 translate-y-[-25.5px] -skew-y-[23deg] items-center border-y-2 border-r-1 border-white bg-slate-900">
          <p className="w-full text-center">Right Switch</p>
        </div>
        <div className="h-20 w-15 translate-y-[-26px] skew-y-[40.32deg] border-x-1 border-y-2 border-white"></div>
      </div>
    </div>`}
            ></CodeBlock>
          </div>
          <p>
            Doing the left side is quite easy, just swap the element order and
            flip the skew angles from positive to negative and vice versa.
            <br />
          </p>
          <div className="flex space-x-8 p-10">
            <div>
              <Switch4Flipped />
            </div>

            <CodeBlock
              code={`<div className="flex pt-10">
      <div className="flex border-y-2 border-r-1 border-l-2 border-white">
        <div className="h-20 w-15 translate-y-[-26px] -skew-y-[40.32deg] border-x-1 border-y-2 border-white bg-slate-900"></div>
        <div className="flex h-20 w-30 translate-y-[-25.5px] skew-y-[23deg] items-center border-y-2 border-r-1 border-white bg-slate-900">
          <p className="w-full text-center text-black">Left Switch</p>
        </div>
      </div>
      <div className="flex h-21 w-40 items-center border-2 border-white"></div>
    </div>`}
            ></CodeBlock>
          </div>
          <p>
            Now its time to add the logic, which is quite simple, add an
            <code> useState</code>, render based on the current state and add a{" "}
            <code>onClick</code>.
            <br />
          </p>
          <div className="flex space-x-8 p-10 pt-4">
            <div>
              Try Using me ↓
              <Switch4Logic />
            </div>

            <CodeBlock
              code={`const [switchState, setSwitchState] = useState(false);
  ...
{switchState == true ? (RIGHT_SWITCH_GOES_HERE) : (LEFT_SWITCH_GOES_HERE)
`}
            ></CodeBlock>
            <CodeBlock
              code={`onClick={() => setSwitchState(OPPOSITE_STATE)}
`}
            ></CodeBlock>
          </div>
          <div>
            <h2>Conclusion</h2>
            <p>
              That's it, I couldn't completely replicate the button: the{" "}
              <code>onhover </code>
              is missing, but I didn't really think it was too necessary to
              replicate and it is relatively easy.
              <br />
              What I got stuck on and forced me to stop was the animation.
              <br /> I am not experienced enough with js animation libraries to
              replicate the soft close/open effects and my attempts were
              laughably bad.
              <br />I will leave this challenge open to readers and maybe... I
              might return in the future to complete it once I gain the
              expertise.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
