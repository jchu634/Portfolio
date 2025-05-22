"use client";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { intel_one_mono, roboto_slab } from "@/lib/fonts";
import { Link2Icon, DownloadIcon, ExternalLinkIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { isMobile } from "react-device-detect";

import VariableFontCursorProximity from "@/components/fancy/text/variable-font-cursor-proximity";
import StackingCards, {
  StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards";
import UnderlineToBackground from "@/components/fancy/text/underline-to-background";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { projects, education } from "@/lib/homepageData";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;

  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [mobContainer, setMobContainer] = useState<HTMLElement | null>(null);

  return (
    <div className="h-fit w-full">
      <div
        className="relative h-fit cursor-pointer items-center justify-center overflow-hidden rounded-lg px-2 pt-12 md:w-3/4 md:px-8"
        ref={containerRef}
      >
        <div className="items-left flex size-full flex-col gap-4 pl-5">
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
          className={cn("text-xl leading-10whitespace-pre-line text-black dark:text-white",  roboto_slab.className )}
        >
        
          Hi, I&apos;m a new graduate from the University of Auckland (BSc Computer Science) <br />
          Currently I am looking for work while working on a couple of projects I didn&apos;t have time to start while studying.
        </p>
          <div className={cn("flex gap-x-2", roboto_slab.className)}>
            <Link href="https://m3ml4l3qi1.ufs.sh/f/NQ2gjwtsCGtKK0HnSxFn3FlbzvMTDoijX9mwHq04LfdAk2CW">
              <Button
                variant="outline"
                className="d flex w-fit items-center border-2 border-black hover:cursor-pointer hover:bg-gray-700 hover:text-white dark:border-white"
              >
                <p>View CV</p>
                <ExternalLinkIcon />
              </Button>
            </Link>
            <Link href="https://m3ml4l3qi1.ufs.sh/f/NQ2gjwtsCGtKpLKfeomlDOyPvBFhCAkR7d84bW3f5pSYz0tM">
              <Button
                variant="outline"
                className="d flex w-fit items-center border-2 border-black hover:cursor-pointer hover:bg-gray-700 hover:text-white dark:border-white"
              >
                <p>View Resume</p>
                <ExternalLinkIcon />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full px-16 pt-4 md:mb-12 md:px-24">
        <Carousel
          opts={{
            align: "start",
          }}
        >
          <CarouselContent>
            {education.map((edu, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent
                      className={cn(
                        "flex min-h-30 flex-col justify-center",
                        intel_one_mono.className,
                      )}
                    >
                      <span className="text-lg font-bold whitespace-pre-wrap">
                        {edu.description}
                      </span>
                      <span className="text-base font-bold text-orange-500 dark:text-orange-400">
                        {edu.institution} ({edu.timeframe})
                      </span>
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          className="d flex w-fit items-center border-2 border-black hover:cursor-pointer hover:bg-gray-700 hover:text-white dark:border-white"
                          asChild
                        >
                          <Link href={edu.link}>
                            <Link2Icon />
                            <p>Cert Link</p>
                          </Link>
                        </Button>
                      </div>

                      <div className="flex gap-x-2"></div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="flex flex-col justify-between px-8 md:flex-row md:px-12">
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
              <ScrollArea
                className="hidden h-50 w-[90svw] rounded-md pr-5 md:flex md:h-108 md:w-5/7"
                type="always"
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
                        className="h-50 md:h-100"
                      >
                        <Card
                          className={cn(
                            project.bgColor,
                            "relative mx-auto flex min-h-[80%] w-[85svw] flex-col rounded-3xl px-4 sm:flex-row md:w-11/12 xl:py-10",
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

                              <div className="flex space-y-2 gap-x-2 pt-2 md:flex-col 2xl:flex-row 2xl:space-y-0">
                                {project.website && (
                                  <Button
                                    variant="outline"
                                    className="flex w-fit items-center border-2 border-white hover:cursor-pointer hover:bg-gray-700 hover:text-white"
                                    asChild
                                  >
                                    <Link href={project.website}>
                                      <Link2Icon />
                                      <p>Website</p>
                                    </Link>
                                  </Button>
                                )}
                                {project.github && (
                                  <Button
                                    variant="outline"
                                    className="flex w-fit items-center border-2 border-white hover:cursor-pointer hover:bg-gray-700 hover:text-white"
                                    asChild
                                  >
                                    <Link href={project.github}>
                                      <SiGithub />
                                      <p>Github</p>
                                    </Link>
                                  </Button>
                                )}
                                {project.download && (
                                  <Button
                                    variant="outline"
                                    className="flex w-fit items-center border-2 border-white hover:cursor-pointer hover:bg-gray-700 hover:text-white"
                                    asChild
                                  >
                                    <Link href={project.download}>
                                      <DownloadIcon />
                                      <p>Download</p>
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </div>
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
                          </CardContent>
                        </Card>
                      </StackingCardItem>
                    );
                  })}
                </StackingCards>
              </ScrollArea>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-slate-800 text-white">
              <p>Scroll to see more projects</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        className="h-[300px] overflow-auto md:hidden"
        ref={(node) => setMobContainer(node)}
      >
        <StackingCards
          totalCards={projects.length}
          scrollOptons={{ container: { current: mobContainer } }}
        >
          <div className="flex h-[20px] w-full items-center pt-2 pl-8 text-xl font-bold whitespace-pre uppercase">
            Scroll down↓
          </div>
          {projects.map((project, index) => {
            return (
              <StackingCardItem
                key={index}
                index={index}
                className="h-[300px] md:h-100"
              >
                <Card
                  className={cn(
                    project.bgColor,
                    "relative mx-auto h-fit min-h-[240px] w-[85svw] rounded-3xl",
                  )}
                >
                  <CardContent
                    className={cn(
                      "flex h-full w-full justify-between",
                      intel_one_mono.className,
                    )}
                  >
                    <div className="flex w-full flex-col space-y-2">
                      <span className="text-3xl font-bold whitespace-pre-wrap text-orange-300">
                        {project.name}
                      </span>
                      <span className="text-base font-bold text-wrap whitespace-pre-wrap">
                        {project.description}
                      </span>

                      <div className="flex flex-col space-y-2 gap-x-2 pt-2">
                        <div className="flex flex-row space-x-2">
                          {project.website && (
                            <Button
                              variant="outline"
                              className="flex w-fit items-center border-2 border-white hover:cursor-pointer hover:bg-gray-700 hover:text-white"
                              asChild
                            >
                              <Link href={project.website}>
                                <Link2Icon />
                                <p>Website</p>
                              </Link>
                            </Button>
                          )}
                          {project.github && (
                            <Button
                              variant="outline"
                              className="flex w-fit items-center border-2 border-white hover:cursor-pointer hover:bg-gray-700 hover:text-white"
                              asChild
                            >
                              <Link href={project.github}>
                                <SiGithub />
                                <p>Github</p>
                              </Link>
                            </Button>
                          )}
                        </div>

                        {project.download && (
                          <Button
                            variant="outline"
                            className="flex w-fit items-center border-2 border-white hover:cursor-pointer hover:bg-gray-700 hover:text-white"
                            asChild
                          >
                            <Link href={project.download}>
                              <DownloadIcon />
                              <p>Download</p>
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StackingCardItem>
            );
          })}

          <div className="relative h-80 w-full overflow-hidden" />
        </StackingCards>
      </div>
    </div>
  );
}
