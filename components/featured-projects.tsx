"use client";
import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { Link2Icon, DownloadIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { projects } from "@/lib/homepageData";
import { intel_one_mono, roboto_slab } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import StackingCards, {
  StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards";
const featured = projects.filter((p) => p.name !== "Inkproof");
export default function FeaturedProjects({
  introRef,
}: {
  introRef: RefObject<HTMLDivElement>;
}) {
  const mobile = useRef<HTMLDivElement>(null);
  const [stack, setStack] = useState({
    top: 16,
    heading: 124,
    step: 300,
    bottom: 640,
  });
  useEffect(() => {
    const track = mobile.current;
    const intro = introRef.current;
    const heading = track?.querySelector<HTMLElement>("[data-project-heading]");
    const cards = track?.querySelectorAll<HTMLElement>("article");
    const section = track?.closest("section");
    if (!track || !intro || !heading || !cards || !section) return;

    function measure() {
      if (
        !intro ||
        !heading ||
        !cards ||
        !section ||
        !matchMedia("(max-width: 767px)").matches
      )
        return;
      // Keep each card, including its staggered top offset, inside the scene.
      const step = Math.max(
        300,
        ...Array.from(cards, (card, index) =>
          Math.ceil(card.offsetHeight / (1 - (0.05 + index * 0.03))),
        ),
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
    cards.forEach((card) => observer.observe(card));
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
      intro.style.removeProperty("--homepage-intro-top");
    };
  }, [introRef]);
  return (
    <section
      aria-label="Featured projects"
      className="w-full px-8 pt-12 md:hidden"
    >
      <div ref={mobile} className={cn("md:hidden", intel_one_mono.className)}>
        <StackingCards
          totalCards={featured.length}
          scrollOptons={{
            offset: [`start ${stack.top}px`, `end ${stack.bottom}px`],
          }}
        >
          <div
            data-project-heading
            className="sticky z-10 bg-blue-200 pt-6 pb-6 dark:bg-slate-950"
            style={{ top: stack.top }}
          >
            <Heading />
            <Link
              href="/projects"
              className="mt-3 inline-block underline underline-offset-4"
            >
              View all projects â†—
            </Link>
          </div>
          <div className="-mx-8">
            {featured.map((item, index) => (
              <StackingCardItem
                key={item.name}
                index={index}
                style={{ top: stack.top + stack.heading, height: stack.step }}
              >
                <article
                  className={cn(
                    "relative mx-auto h-fit min-h-60 w-[85svw] rounded-3xl p-6 text-white shadow-lg",
                    item.bgColor,
                  )}
                >
                  <h3 className="text-3xl font-bold text-orange-300">
                    {item.name}
                  </h3>
                  <p className="mt-3 font-bold whitespace-pre-line">
                    {item.description}
                  </p>
                  <ProjectLinks project={item} />
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
function Heading() {
  return (
    <h2
      className={cn(
        "text-4xl font-bold text-orange-500 dark:text-orange-400",
        roboto_slab.className,
      )}
    >
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
          >
            <Link2Icon />
            Website
          </Link>
        </Button>
      )}
      {project.github && (
        <Button
          variant="outline"
          className="border-white/60 bg-transparent text-white hover:bg-white hover:text-black"
          asChild
        >
          <Link href={project.github} target="_blank" rel="noopener noreferrer">
            <SiGithub />
            Github
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
          >
            <DownloadIcon />
            Download
          </Link>
        </Button>
      )}
    </div>
  );
}
