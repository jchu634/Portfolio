"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { PauseIcon, PlayIcon, Link2Icon, DownloadIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { projects } from "@/lib/homepageData";
import { cn } from "cn";
import { Button } from "@/components/ui/button";
import StackingCards, {
  StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards";

const DURATION = 20000;

export default function FeaturedProjects({
  introRef,
}: {
  introRef: RefObject<HTMLDivElement>;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [remaining, setRemaining] = useState(DURATION);
  const remainingTime = useRef(DURATION);
  const mobile = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const timerControlRef = useRef<HTMLButtonElement>(null);
  const [stack, setStack] = useState({
    top: 16,
    heading: 124,
    step: 300,
    bottom: 640,
  });
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const { resolvedTheme } = useTheme();
  useEffect(() => {
    let previous = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      const elapsed = now - previous;
      previous = now;
      if (
        paused ||
        document.hidden ||
        !matchMedia("(min-width: 768px)").matches
      )
        return;
      remainingTime.current = Math.max(0, remainingTime.current - elapsed);
      if (!remainingTime.current) {
        setActive((i) => (i + 1) % projects.length);
        remainingTime.current = DURATION;
      }
      setRemaining(remainingTime.current);
    }, 100);
    return () => clearInterval(timer);
  }, [paused]);
  useEffect(() => {
    const track = mobile.current;
    const intro = introRef.current;
    const heading = headingRef.current;
    const section = sectionRef.current;
    const cards = projects.flatMap((_, index) => {
      const card = cardRefs.current[index];
      const content = contentRefs.current[index];
      return card && content ? [{ card, content }] : [];
    });
    if (!track || !intro || !heading || !section) return;

    function measure() {
      if (
        !track ||
        !intro ||
        !heading ||
        !section ||
        !matchMedia("(max-width: 767px)").matches
      )
        return;
      // Measure natural content so the shared height can shrink after resizing.
      const cardHeight = Math.max(
        240,
        ...cards.map(({ card, content }) => {
          const style = getComputedStyle(card);
          return Math.ceil(
            content.offsetHeight +
              parseFloat(style.paddingTop) +
              parseFloat(style.paddingBottom),
          );
        }),
      );
      track.style.setProperty("--project-card-height", `${cardHeight}px`);
      // Reserve the same height for every card, including the largest stagger.
      const step = Math.max(
        300,
        Math.ceil(cardHeight / (1 - (0.05 + (projects.length - 1) * 0.03))),
      );
      const height = heading.offsetHeight;
      const bottom = window.innerHeight - 60;
      const top = bottom - height - step;
      // Pause the preceding content at the same point as the bottom-aligned
      // stack, so advancing the cards does not leave an empty area above them.
      const gap = parseFloat(getComputedStyle(section).paddingTop);
      intro.style.setProperty(
        "--homepage-intro-top",
        `${top - gap - intro.offsetHeight}px`,
      );
      setStack((previous) =>
        previous.top === top &&
        previous.heading === height &&
        previous.step === step &&
        previous.bottom === bottom
          ? previous
          : { top, heading: height, step, bottom },
      );
    }

    const observer = new ResizeObserver(measure);
    observer.observe(intro);
    observer.observe(heading);
    cards.forEach(({ content }) => observer.observe(content));
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      intro.style.removeProperty("--homepage-intro-top");
      track.style.removeProperty("--project-card-height");
    };
  }, [introRef]);
  const project = projects[active];
  if (!project) return null;
  const image =
    resolvedTheme === "dark"
      ? project.image_dark || project.image_light
      : project.image_light || project.image_dark;
  function select(index: number) {
    setActive(index);
    setPaused(true);
  }
  function pauseForInput(target: EventTarget) {
    if (target instanceof Node && !timerControlRef.current?.contains(target))
      setPaused(true);
  }
  return (
    <section
      ref={sectionRef}
      aria-label="Featured projects"
      className="w-full max-w-250 px-8 pt-12 md:px-12 md:pb-12"
    >
      <div className="mb-6 hidden items-end justify-between gap-3 md:flex">
        <ProjectHeading />
        <Link href="/projects" className="underline underline-offset-4">
          View all projects &#8599;
        </Link>
      </div>
      <div
        className="font-intel hidden md:block"
        onFocusCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget))
            pauseForInput(e.target);
        }}
        onPointerEnter={(e) => pauseForInput(e.target)}
        onPointerDownCapture={(e) => pauseForInput(e.target)}
        onKeyDownCapture={(e) => pauseForInput(e.target)}
      >
        <div role="tablist" aria-label="Featured projects" className="flex">
          {projects.map((item, index) => (
            <Button
              variant="ghostnohover"
              key={item.name}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              role="tab"
              id={`project-tab-${index}`}
              aria-controls={`project-panel-${index}`}
              aria-selected={active === index}
              tabIndex={active === index ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(e) => {
                let next = index;
                if (e.key === "ArrowRight")
                  next = (index + 1) % projects.length;
                else if (e.key === "ArrowLeft")
                  next = (index - 1 + projects.length) % projects.length;
                else if (e.key === "Home") next = 0;
                else if (e.key === "End") next = projects.length - 1;
                else return;
                e.preventDefault();
                select(next);
                tabs.current[next]?.focus();
              }}
              className={cn(
                "h-auto shrink-0 cursor-pointer rounded-none rounded-t-lg border-2 border-b-0 px-2 py-1.5 text-xs font-bold text-white shadow-none focus-visible:outline-2 focus-visible:outline-orange-300",
                item.bgColor,
                active === index
                  ? "border-orange-300"
                  : "border-transparent hover:border-white/40",
              )}
            >
              {item.name}
            </Button>
          ))}
        </div>
        {projects.map((item, index) => (
          <div
            key={item.name}
            role="tabpanel"
            id={`project-panel-${index}`}
            aria-labelledby={`project-tab-${index}`}
            hidden={active !== index}
            tabIndex={0}
          >
            {active === index && (
              <div
                className={cn(
                  "relative grid min-h-76 grid-cols-2 items-center gap-5 rounded-b-2xl p-6 pb-14 text-white",
                  project.bgColor,
                )}
              >
                <div className="min-w-0 space-y-3">
                  <h3 className="font-slab text-4xl font-bold text-orange-300">
                    {project.name}
                  </h3>
                  <p className="leading-normal whitespace-pre-line">
                    {project.description}
                  </p>
                  <ul
                    aria-label="Technologies"
                    className="flex flex-wrap gap-2"
                  >
                    {project.technologies_and_frameworks.map((t) => (
                      <li
                        key={t}
                        className="rounded-md bg-white/15 px-2.5 py-1 text-xs"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <ProjectLinks project={project} />
                </div>
                {image && (
                  <div className="relative h-56 min-w-0">
                    <Image
                      src={image}
                      alt={project.image_alt || `${project.name} screenshot`}
                      fill
                      sizes="45vw"
                      className="object-contain object-right"
                    />
                  </div>
                )}
                <div className="absolute right-6 bottom-3 flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    ref={timerControlRef}
                    onClick={() => setPaused((p) => !p)}
                    aria-label={
                      paused
                        ? "Resume automatic project switching"
                        : "Pause automatic project switching"
                    }
                    className="size-8 cursor-pointer rounded-full p-2 hover:bg-white/15 hover:text-white"
                  >
                    {paused ? (
                      <PlayIcon className="size-4" />
                    ) : (
                      <PauseIcon className="size-4" />
                    )}
                  </Button>
                  <div
                    aria-hidden="true"
                    className="h-1 w-24 overflow-hidden rounded-full bg-white/25"
                  >
                    <div
                      className="h-full origin-left rounded-full bg-orange-300 transition-transform duration-100 ease-linear motion-reduce:transition-none"
                      style={{
                        transform: `scaleX(${1 - remaining / DURATION})`,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div ref={mobile} className="font-intel md:hidden">
        <StackingCards
          totalCards={projects.length}
          scrollOptons={{
            offset: [`start ${stack.top}px`, `end ${stack.bottom}px`],
          }}
        >
          <div
            ref={headingRef}
            className="dark:bg-background sticky z-10 bg-blue-200 pt-6 pb-6"
            style={{ top: stack.top }}
          >
            <ProjectHeading />
            <Link
              href="/projects"
              className="mt-3 inline-block underline underline-offset-4"
            >
              View all projects &#8599;
            </Link>
          </div>
          <div className="-mx-8">
            {projects.map((item, index) => (
              <StackingCardItem
                key={item.name}
                index={index}
                style={{ top: stack.top + stack.heading, height: stack.step }}
              >
                <article
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className={cn(
                    "relative mx-auto h-fit min-h-(--project-card-height,15rem) w-[85svw] rounded-3xl p-6 text-white shadow-lg",
                    item.bgColor,
                  )}
                >
                  <div
                    ref={(node) => {
                      contentRefs.current[index] = node;
                    }}
                    className="flow-root"
                  >
                    <h3 className="text-3xl font-bold text-orange-300">
                      {item.name}
                    </h3>
                    <p className="mt-3 font-bold whitespace-pre-line">
                      {item.description}
                    </p>
                    <ProjectLinks project={item} />
                  </div>
                </article>
              </StackingCardItem>
            ))}
            <div
              aria-hidden="true"
              style={{
                height: Math.max(
                  0,
                  stack.bottom - stack.top - stack.heading - stack.step,
                ),
              }}
            />
          </div>
        </StackingCards>
      </div>
    </section>
  );
}
function ProjectHeading() {
  return (
    <h2 className="font-slab text-4xl font-bold text-orange-500 dark:text-orange-400">
      Featured Projects
    </h2>
  );
}
function ProjectLinks({ project }: { project: (typeof projects)[number] }) {
  return (
    <div className="flex flex-wrap gap-3 pt-2">
      {project.website && (
        <Button
          variant="outline"
          className="border-white/60 bg-transparent text-white hover:bg-white hover:text-black"
          asChild
        >
          <Link
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            className="space-x-2"
          >
            <Link2Icon className="space-x-2" />
            <p>Website</p>
          </Link>
        </Button>
      )}
      {project.github && (
        <Button
          variant="outline"
          className="border-white/60 bg-transparent text-white hover:bg-white hover:text-black"
          asChild
        >
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="space-x-2"
          >
            <SiGithub className="size-4" />
            <p>Github</p>
          </Link>
        </Button>
      )}
      {project.download && (
        <Button
          variant="outline"
          className="border-white/60 bg-transparent text-white hover:bg-white hover:text-black"
          asChild
        >
          <Link
            href={project.download}
            target="_blank"
            rel="noopener noreferrer"
            className="space-x-2"
          >
            <DownloadIcon className="size-4" />
            <p>Download</p>
          </Link>
        </Button>
      )}
    </div>
  );
}
