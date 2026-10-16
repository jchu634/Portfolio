"use client";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { intel_one_mono, roboto_slab } from "@/lib/fonts";
import { Link2Icon, DownloadIcon, ExternalLinkIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { isMobile } from "react-device-detect";
import { useTheme } from "next-themes";

import VariableFontCursorProximity from "@/components/fancy/text/variable-font-cursor-proximity";
import StackingCards, {
  StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards";
import UnderlineToBackground from "@/components/fancy/text/underline-to-background";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { projects, education } from "@/lib/homepageData";
import FeaturedProjects from "@/components/featured-projects";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;

  const [container, setContainer] = useState<HTMLElement | null>(null);
  const { theme } = useTheme();

  return (
    <div className="h-fit w-full">
      <div
        className="sticky top-[var(--homepage-intro-top,auto)] grid w-full max-w-7xl items-end gap-8 px-8 pt-12 md:relative md:top-auto md:px-12 xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-12"
        ref={containerRef}
      >
        <div className="min-w-0">
          <div className="flex w-full flex-col items-start gap-6">
            {isMobile ? (
              <div
                className={cn(
                  "items-left flex flex-col gap-4 text-5xl leading-none text-orange-500 dark:text-orange-400",
                  roboto_slab.className,
                )}
              >
                <h1>Hi, I&apos;m Joshua:</h1>
                <h1>I like making stuff.</h1>
              </div>
            ) : (
              <div className="items-left flex flex-col gap-4">
                {["Hi, I'm Joshua:", "I like making stuff."].map((text, i) => (
                  <VariableFontCursorProximity
                    key={i}
                    label={text}
                    className={cn(
                      "text-5xl leading-none text-orange-500 dark:text-orange-400",
                      roboto_slab.className,
                    )}
                    fromFontVariationSettings="'wght' 500, 'slnt' 0"
                    toFontVariationSettings="'wght' 200, 'slnt' -10"
                    radius={200}
                    containerRef={containerRef}
                  />
                ))}
              </div>
            )}

            {/* prettier-ignore */}
            <p
          className={cn("text-xl leading-relaxed text-black dark:text-white",  roboto_slab.className )}
        >

            Hi, I&apos;m currently studying a Masters of Cybersecurity at Monash University.<br />
            I previously graduated with a (BSc Computer Science) from the University of Auckland.<br />
            I write and maintain a couple of open-source projects in my spare time.

        </p>
            <div className={cn("flex flex-wrap gap-2", roboto_slab.className)}>
              <Link
                href="https://m3ml4l3qi1.ufs.sh/f/NQ2gjwtsCGtKkdu7ihp3cS0OA7Y9ol3wj41TBUKtbVqDnuG5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="d flex w-fit space-x-2 border-2 border-black not-only:items-center hover:cursor-pointer hover:bg-gray-700 hover:text-white dark:border-white"
                >
                  <p>View CV</p>
                  <ExternalLinkIcon className="size-5" />
                </Button>
              </Link>
              <Link
                href="https://m3ml4l3qi1.ufs.sh/f/NQ2gjwtsCGtKwsEGZ5Anrj2vxehYfgo4bBtLNOZ6kAuiXRJE"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="d flex w-fit items-center space-x-2 border-2 border-black hover:cursor-pointer hover:bg-gray-700 hover:text-white dark:border-white"
                >
                  <p>View Resume</p>
                  <ExternalLinkIcon className="size-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <section aria-labelledby="education-heading" className="min-w-0">
          <h2
            id="education-heading"
            className={cn(
              "mb-4 text-3xl font-bold text-orange-500 dark:text-orange-400",
              roboto_slab.className,
            )}
          >
            Education
          </h2>
          <div className="grid items-start gap-4 sm:grid-cols-2 xl:grid-cols-1">
            {education.map((edu) => (
              <Card key={edu.institution} className="w-full">
                <CardContent
                  className={cn(
                    "flex flex-col items-start gap-2",
                    intel_one_mono.className,
                  )}
                >
                  <h3 className="text-lg font-bold">{edu.description}</h3>
                  <p className="text-base font-bold text-orange-500 dark:text-orange-400">
                    {edu.institution}
                  </p>
                  <p className="text-sm">{edu.timeframe}</p>
                  {edu.link && (
                    <Button
                      variant="outline"
                      className="mt-2 flex w-fit items-center gap-2 border-2 border-black hover:cursor-pointer hover:bg-gray-700 hover:text-white dark:border-white"
                      asChild
                    >
                      <Link
                        href={edu.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Link2Icon className="size-5" />
                        Cert Link
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      <div className="hidden justify-between px-8 md:flex md:flex-row md:px-12">
        <div
          className={cn(
            "pt-10 text-4xl font-bold text-orange-500 dark:text-orange-400",
            roboto_slab.className,
          )}
        >
          Featured Projects
          <div className="text-xl font-medium text-black dark:text-white">
            Find more projects{" "}
            <Link href="/projects" className="hidden dark:inline">
              <UnderlineToBackground
                label="here"
                targetTextColor="#193cb8"
                className="cursor-pointer"
              />
            </Link>
            <Link href="/projects" className="inline dark:hidden">
              <UnderlineToBackground
                label="here"
                targetTextColor="#FFFF"
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div
                className="hidden overflow-auto rounded-md pr-5 md:inline md:h-120 md:w-5/7"
                ref={(node) => setContainer(node)}
              >
                <StackingCards
                  totalCards={projects.length}
                  scrollOptons={{ container: { current: container } }}
                  className="items-center justify-center"
                >
                  {projects.map((project, index) => {
                    return (
                      <StackingCardItem
                        key={index}
                        index={index}
                        className="h-120"
                      >
                        <Card
                          className={cn(
                            project.bgColor,
                            "relative mx-auto flex h-fit min-h-80 flex-col rounded-3xl px-4 sm:flex-row md:w-11/12 xl:py-10",
                          )}
                        >
                          <CardContent
                            className={cn(
                              "flex min-h-full w-full justify-between",
                              intel_one_mono.className,
                            )}
                          >
                            <div className="flex w-full flex-col space-y-2 lg:w-[50%]">
                              <span className="text-3xl font-bold whitespace-pre-wrap text-orange-300">
                                {project.name}
                              </span>

                              <span className="text-base font-bold text-wrap whitespace-pre-wrap text-white">
                                {project.description}
                              </span>

                              <span className="hidden space-x-2 xl:table-cell">
                                {project.technologies_and_frameworks &&
                                  project.technologies_and_frameworks.map(
                                    (
                                      technologies_and_frameworks: string,
                                      index: number,
                                    ) => {
                                      return (
                                        <span
                                          className="rounded-md bg-lime-200 p-1 px-2 text-xs font-bold text-emerald-950 no-underline hover:no-underline"
                                          key={index}
                                        >
                                          {technologies_and_frameworks}
                                        </span>
                                      );
                                    },
                                  )}
                              </span>

                              <div className="flex space-y-2 gap-x-2 pt-2 md:flex-col 2xl:flex-row 2xl:space-y-0">
                                {project.website && (
                                  <Button
                                    variant="outline"
                                    className="flex w-fit items-center space-x-2 border-2 border-white hover:cursor-pointer hover:bg-gray-700 hover:text-white"
                                    asChild
                                  >
                                    <Link
                                      href={project.website}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <Link2Icon className="size-5" />
                                      <p>Website</p>
                                    </Link>
                                  </Button>
                                )}
                                {project.github && (
                                  <Button
                                    variant="outline"
                                    className="flex w-fit items-center space-x-2 border-2 border-white hover:cursor-pointer hover:bg-gray-700 hover:text-white"
                                    asChild
                                  >
                                    <Link
                                      href={project.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <SiGithub className="size-5" />
                                      <p>Github</p>
                                    </Link>
                                  </Button>
                                )}
                                {project.download && (
                                  <Button
                                    variant="outline"
                                    className="flex w-fit items-center space-x-2 border-2 border-white hover:cursor-pointer hover:bg-gray-700 hover:text-white"
                                    asChild
                                  >
                                    <Link
                                      href={project.download}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <DownloadIcon className="size-5" />
                                      <p>Download</p>
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                            {theme == "dark"
                              ? project.image_dark && (
                                  <div className="hidden items-center justify-end lg:flex lg:w-[50%]">
                                    <Image
                                      src={project.image_dark}
                                      alt={project.name}
                                      priority={project.priority ? true : false}
                                      style={{ objectFit: "contain" }}
                                      width={350}
                                      height={350}
                                      className="hidden xl:block"
                                    />
                                    <Image
                                      src={project.image_dark}
                                      alt={project.name}
                                      priority={project.priority ? true : false}
                                      style={{ objectFit: "contain" }}
                                      width={300}
                                      height={300}
                                      className="hidden lg:block xl:hidden"
                                    />
                                  </div>
                                )
                              : project.image_light && (
                                  <div className="hidden items-center justify-end lg:flex lg:w-[50%]">
                                    <Image
                                      src={project.image_light}
                                      alt={project.name}
                                      priority={project.priority ? true : false}
                                      style={{ objectFit: "contain" }}
                                      width={350}
                                      height={350}
                                      className="hidden xl:block"
                                    />
                                    <Image
                                      src={project.image_light}
                                      alt={project.name}
                                      priority={project.priority ? true : false}
                                      style={{ objectFit: "contain" }}
                                      width={300}
                                      height={300}
                                      className="hidden lg:block xl:hidden"
                                    />
                                  </div>
                                )}
                          </CardContent>
                        </Card>
                      </StackingCardItem>
                    );
                  })}
                  <div className="pointer-events-none relative h-80 w-full overflow-hidden" />
                </StackingCards>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-slate-800 text-white">
              <p>Scroll to see more projects</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <FeaturedProjects introRef={containerRef} />
    </div>
  );
}
