import { Metadata } from "@/lib/blogType";
import BlogHeader from "@/components/ui/blog-header";

export const metadata: Metadata = {
  title: "EdGo Writeup Pt 1.",
  date: "2026-06-05",
  description: "Agentic Coding with Non-Frontier Models",
  lastUpdate: "2026-06-15",
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
        <h3>LLM (AI) Usage</h3>
        Lets get the elephant in the room out of the way first, I will cover the
        technical details of EdGo in part 2.
        <br />
        Although LLMs were heavily used in this project, this was not vibecoded,
        as most of the raw output needed heavy alterations to truly integrate
        into the codebase.
        <br />
        The rest of this blogpost will be documenting my workflow at this point,
        as I thought this may be interesting to document my workflow at this
        point for future reference when models inevitably get better.
        <br />
        <br />
        Firstly my workflow is structured around a couple of things:
        <h4>1. Skill Level</h4>
        Currently, I would say that I can generally understand the generated
        code, and can determine when it is bad and can fix/debug the code. But I
        don't quite understand the systems enough to write the features myself
        without significant effort, hence the use of LLMs as a POC reference
        implementation and a learning scaffold.
        <br />
        <h4>2. The Models</h4>
        There were four models used thoughout development (April - June 2026),
        which changed as new models released.
        <ol>
          <li>
            GLM Family (GLM 4.7 + GLM 5.1)
            <br />
            The workhorses of this project, worked well, but notably had quite a
            few issues with complex technical tasks and required quite a bit of
            steering for Effect-ts code.
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
            Wrote much better functional code, but since I had limited requests,
            I generally rationed its use for more difficult technical tasks.
            <br />
            About halfway through the project in April, I had to switch over to
            GLM-5.1 entirely as Github Student plans removed GPT 5.3 Codex
            access entirely.
          </li>
          <li>
            GPT 5.4
            <br />
            Used to refine architecture decisions and to critique functions
            given to it.
            <br />
            I had to use other models for general programming, as this was used
            through my chat subscription (t3.chat).
            <br />
          </li>
        </ol>
        <h4>Harnesses</h4>
        I used Zed agents and OpenCode as my harnesses of choice.
        <br />
        <ul>
          <li>
            Zed Agents were perfect for minor fixes and tweaks, but was not
            chosen for more complex features as it wrote notably worse code than
            OpenCode with the same model (GLM family).
          </li>
          <li>
            OpenCode was used for creating more complicated features as its
            harness was more willing to use tools and was more willing to
            iterate on its own.
          </li>
        </ul>
        I suspect Zed Agents underperformed with the GLM models because its
        system prompt made it use tools much less, leading to a lack of
        "understanding" of the general codebase in its context, which caused it
        to write worse code.
        <h4>The Workflow (Complex Features)</h4>
        If I didn't have a good concept of the technical pinnings of a feature,
        the initial "spec" creation would be done with GPT-5.4, or rather a high
        level concept with some implementation specifics (e.g. I want ___ to be
        written to the DB, also create a Drizzle and Effect schema.)
        <br />
        This was necessary as although GLM-5.1 has no problems with simple
        feature requests, it generally has bad "taste" and struggles with
        complex technical features. GLM 5.1 would be then tasked to create a
        plan to implement that feature and with a reference to the important
        files.
        <br />
        <blockquote>
          I found that it was important to not over/understeer GLM 5.1 when
          prompting it as it needed a certain balance between not overfitting to
          my instructions when it lead to a worse implementation, and not making
          stupid decisions itself.
        </blockquote>
        Then there might be a couple of back+forths to refine the plan before it
        would be set to build and told to implement. This generally worked quite
        well after a couple of tweaks needed to fix edge cases.
        <br />
        <br />
        Occasionally, GLM would entirely fall on its face, this was often
        because it would find a bad piece of code in the codebase which would
        contaminate its context as it would proceed to use that as a reference.
        <br />
        The only solution then was to revert all changes and create a new thread
        with fresh context and be more thorough in its initial prompt to avoid
        that pattern.
        <br />
        What is notable is that my workflow GPT-5.3 Codex did not have most of
        these issues, and in my experience gave equal or better results with
        less steering.
      </div>
      <div>
        <h2>Conclusion</h2>
        Open models like GLM-5.1 are exceptionally capable, especially compared
        to the early GPT-3 days, however they are still lacking in certain ways
        that proprietary models by frontier labs aren't. <br />
        Although the experience is much worse, I would say that is better for
        developping my skills and understanding as each solution requires a
        thorough code review to find mistakes or edge cases it forgot to handle.
        <br />
        Overall I would say that open models tend to more heavily embody "
        garbage in garbage out", where the quality of its output is more
        dependant on the skills of the user, whereas more frontier models can
        generate better code with less skills.
        <br />
        Now that the AI writeup is out of the way, the next blogpost will be a
        bit more fun as it takes on the technical stuff.
      </div>
    </article>
  );
}
