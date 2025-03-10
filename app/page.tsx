"use client";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { intel_one_mono, roboto_slab } from "@/lib/fonts";
import { Link2Icon, DownloadIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

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

  return (
    <div className="h-full w-full">
      <div
        className="relative h-fit w-3/4 cursor-pointer items-center justify-center overflow-hidden rounded-lg md:px-12 md:pt-12"
        ref={containerRef}
      >
        <div className="items-left flex size-full flex-col gap-4 pl-5">
          {["Hi, I'm Joshua:", "I like making stuff."].map((text, i) => (
            <VariableFontCursorProximity
              key={i}
              label={text}
              className={cn(
                `text-3xl leading-none md:text-4xl lg:text-5xl ${roboto_slab.className} text-orange-400`,
              )}
              fromFontVariationSettings="'wght' 500, 'slnt' 0"
              toFontVariationSettings="'wght' 200, 'slnt' -10"
              radius={200}
              containerRef={containerRef}
            />
          ))}

          {/* prettier-ignore */}
          <p
          className={`text-3xl md:text-4xl lg:text-xl leading-10 ${roboto_slab.className} whitespace-pre-line text-white`}
        >
        
          Hi, I'm a new graduate from the University of Auckland (BSc Computer Science) <br />
          Currently I am looking for work while working on a couple of projects I didn't have time to start while studying.
        </p>
        </div>
      </div>

      <div className="mb-12 w-full px-12 pt-4 md:px-24">
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
                      className={`flex min-h-30 flex-col justify-center ${intel_one_mono.className}`}
                    >
                      <span className="text-lg font-bold whitespace-pre-wrap">
                        {edu.description}
                      </span>
                      <span className="text-base font-bold text-orange-400">
                        {edu.institution} ({edu.timeframe})
                      </span>
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          className="flex w-fit items-center border-2 border-white hover:cursor-pointer hover:bg-gray-700"
                        >
                          <Link2Icon />
                          <p>Cert Link</p>
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

      <div className="flex justify-between px-12">
        <div
          className={cn(
            "pt-10 pl-8 text-4xl font-bold text-orange-400",
            roboto_slab.className,
          )}
        >
          Featured Projects
          <div className="text-xl font-medium text-white">
            Find more projects{" "}
            <Link href="/projects">
              <UnderlineToBackground
                label="here"
                targetTextColor="#193cb8"
                className="cursor-pointer"
              />
            </Link>
          </div>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <ScrollArea
                className="h-108 w-5/7 rounded-md"
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
                        className="h-100"
                      >
                        <Card
                          className={cn(
                            project.bgColor,
                            "relative mx-auto flex min-h-[80%] w-11/12 flex-col rounded-3xl px-8 py-10 sm:flex-row",
                          )}
                        >
                          <CardContent
                            className={cn(
                              "flex min-h-full w-full flex-row justify-between",
                              intel_one_mono.className,
                            )}
                          >
                            <div className="flex w-[50%] flex-col space-y-2">
                              <span className="text-3xl font-bold whitespace-pre-wrap text-orange-300">
                                {project.name}
                              </span>
                              <span className="text-base font-bold text-wrap whitespace-pre-line">
                                {project.description}
                              </span>

                              <div className="flex gap-x-2 pt-2">
                                {project.website && (
                                  <Button
                                    variant="outline"
                                    className="flex w-fit items-center border-2 border-white hover:cursor-pointer hover:bg-gray-700"
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
                                    className="flex w-fit items-center border-2 border-white hover:cursor-pointer hover:bg-gray-700"
                                    asChild
                                  >
                                    <Link href={project.github}>
                                      <SiGithub />
                                      <p>Github Repo</p>
                                    </Link>
                                  </Button>
                                )}
                                {project.download && (
                                  <Button
                                    variant="outline"
                                    className="flex w-fit items-center border-2 border-white hover:cursor-pointer hover:bg-gray-700"
                                    asChild
                                  >
                                    <Link href={project.download}>
                                      <DownloadIcon />
                                      <p>Download ink</p>
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </div>
                            <div className="w-50% h-50%">
                              <Image
                                src={project.image_light}
                                alt={project.name}
                                priority={project.priority ? true : false}
                                style={{ objectFit: "contain" }}
                                width={400}
                                height={400}
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
    </div>
  );
}
