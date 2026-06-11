import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";

export const metadata: Metadata = {
  title: "EdGo Writeup Pt 1.",
  date: "2026-06-05",
  description: "Agentic Coding with Non-Frontier Models",
  lastUpdate: "2026-06-05",
};
export default function Post() {
  return (
    <article className="prose lg:prose-xl dark:prose-invert prose-headings:text-zinc-900 dark:prose-headings:text-zinc-100 prose-p:text-zinc-800 dark:prose-p:text-zinc-200 prose-blockquote:border-zinc-700 dark:prose-blockquote:border-zinc-200 prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-zinc-700 dark:prose-blockquote:text-zinc-300 prose-li:text-zinc-800 dark:prose-li:text-zinc-200 prose-li:marker:text-zinc-600 dark:prose-li:marker:text-zinc-400 prose-ul:list-disc prose-ol:list-decimal prose-a:text-blue-600 dark:prose-a:text-blue-400 max-w-none pb-10">
      <BlogHeader header_metadata={metadata} />
      <div>
        <h2>About</h2>
        This is a writeup about the EdGo app, which is an unofficial app client
        for the EdDiscussion platform.
        <br />
        This app was an excuse to try building apps using React Native and/or
        Lynx. And since I was trying out new stuff, this was also my first
        attempt to adopt Effect-ts.
        <br />
        This was a bit of a mistake, as I tried too many new things in a single
        project, and a bunch of initial architectural decisions were shite, and
        there is still unideal usage of <code>UseEffect</code>.
        <br />
        Finally, as so much of this project was new to me, heavy use of LLMs
        were used to help.
      </div>
      <div>
        <h2>LLM (AI) Usage</h2>
        Lets get the elephant in the room out of the way first, I will cover the
        technical details of EdGo in part 2.
        <br />
        LLMs were heavily used in this project, but this was NOT vibecoded.
        <br />
        Additionally, none of my blogposts are written with AI.
        <br />
        However, I though it would be interesting to document how I used the
        models at this point.
        <br />
        <br />
        Firstly my workflow is built around a couple of things:
        <h4>My Skill Level</h4>
        Currently, I would self-classify my skills as a junior engineer who
        knows too much.
        <br />
        What this meant is that I can understand enough to determine when a LLM
        solution is bad, and I can debug broken code semi-effectively, but I
        still need the LLM as a slightly unreliable learning aid/assistant.
        <br />
        <h4>The Models</h4>
        My workflow was adapted to the limitations of the models I was using.
        <br />
        There were four models used thoughout development (April - June 2026),
        which changed as new models released.
        <ol>
          <li>
            GLM Family (GLM 4.7 + GLM 5.1)
            <br />
            The workhorses of this project, they were generally competant but
            notably had quite a few issues with complex technical tasks and
            required quite a bit of steering for Effect-ts code.
            <br />
            <div className="font-bold">
              Why GLM and not any other model? (GPT Series, Kimi, Minimax etc.)
            </div>
            I got it dirt cheap and I never hit any limits with it despite being
            on the Lite plan.
          </li>
          <li>
            GPT 5.3 Codex
            <br />
            Exceptionally capable, but since I had limited requests, I rationed
            its use for more difficult technical tasks.
            <br />
            About halfway through the project, I had to switch over to GLM-5.1
            entirely as Github Student plans removed GPT 5.3 Codex access.
          </li>
          <li>
            GPT 5.4
            <br />
            It was used to refine architecture decisions and to critique
            functions given to it.
            <br />
            I would have loved to use it in programming, but I could only chat
            to it through my t3.chat subscription.
            <br />
          </li>
        </ol>
        <h4>Harnesses</h4>
        I used Zed agents and OpenCode as my harnesses of choice.
        <br />
        <ul>
          <li>
            Zed Agents were perfect for minor fixes and tweaks, (e.g. Change all
            the button colours to use another colour scheme)
          </li>
          <li>
            OpenCode was used for creating more complicated features as its
            harness was more willing to use tools and was more willing to
            iterate on its own.
          </li>
        </ul>
        <h4>The Workflow</h4>
        What is most interesting is probably the workflow, which may differ from
        others due to the heavy use of GLM-5.1.
        <br />
        Although GLM-5.1 has no problems with simple feature requests, it tended
        to struggle with oneshotting complex technical features.
        <br />
        Hence I would initially consult GPT-5.4 and create a high level overview
        of the plan.
        <br />
        GLM 5.1 would be then tasked to create a plan to implement that feature,
        and is given a reference to the most important file/s.
        <br />
        I found that in prompting, in general, it was important to not over or
        understeer the instructions, as it needed a certain balance between not
        making stupid decisions and not following my stupid decisions.
        <br />
        Then there might be a couple of back+forths to refine the plan so that
        it wouldn't do something stupid.
        <br />
        Finally, it would be set to build and told to implement. This works
        quite well although there be couple of tweaks needed to fix edge cases.
        <br />
        <br />
        Occasionally, GLM would entirely fall on its face, these often happened
        as it found some shite code in the codebase and would proceed to use
        that as a reference or on particularly complex tasks where more guidance
        would be needed.
        <br />
        The only solution then was to revert all changes and create a new thread
        with fresh context and be more thorough in its initial prompt or to
        explicitly tell it that particular source files were an anti-pattern.
      </div>
      <div>
        <h2>Conclusion</h2>
        GLM-5.1 is a exceptionally capable model compared to the early days of
        AI, however it is still lacking in certain ways that proprietary models
        by frontier labs aren't. <br />
        Although this is a fundamentally worse experience, I would say that is
        likely better at letting me improve my skills. As each solution it
        creates requires a code review to find mistakes or edge cases it forgot
        to handle which is great for learning.
        <br />
        Overall I would say that open models tend to more heavily embody "
        garbage in garbage out", where the quality of its output is more
        dependant on the skills of the user, whereas more frontier models can
        better code with less skills.
        <br />
        Now that the AI writeup is out of the way, the next blogpost will be a
        bit more fun as it takes on the technical stuff.
      </div>
    </article>
  );
}
