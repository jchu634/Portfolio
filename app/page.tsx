"use client";
import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { intel_one_mono, roboto_slab } from "@/lib/fonts";
import { Link2Icon } from "lucide-react";

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

const education = [
  {
    institution: "University of Auckland",
    description: "BSc: Majoring in Computer Science",
    timeframe: "2021-2024",
    link: "https://keshuac.com/extlink/ucert",
  },
  {
    institution: "NVIDIA Deep Learning Institute",
    description: "Fundamentals of Deep Learning",
    timeframe: "2023",
    link: "https://keshuac.com/extlink/ncert1",
  },
  {
    institution: "NVIDIA Deep Learning Institute",
    description: "Fundamentals of Accelerated Computing with CUDA Python",
    timeframe: "2024",
    link: "https://keshuac.com/extlink/ncert2",
  },
];
const projects = [
  {
    bgColor: "bg-[#122c23]",
    name: "Subtext",
    type: ["Application"],
    timeframe: "2025",
    technologies_and_frameworks: [
      "Next.JS",
      "Astro",
      "TailwindCSS",
      "Python",
      "Pywebview",
      "Whisper",
    ],
    github: "https://github.com/jchu634/subtext-app",
    website: "https://subtextapp.cc/",
    description:
      "Subtext is an easy to use subtitling app, which allows an user to utilise AI models to generate subtitles entirely on device.",
    image: "True",
    priority: "True",
    image_light: "/projects/subtextapp/ScreenshotLight.png",
    image_dark: "/projects/subtextapp/ScreenshotDark.png",
    image_alt: "Subtext App Screenshot",
  },
  {
    bgColor: "bg-[#E41655]",
    name: "Ryzen AI Subtitles",
    type: ["Application"],
    timeframe: "2024",
    technologies_and_frameworks: [
      "Next.JS",
      "TailwindCSS",
      "Python",
      "Ryzen AI Software",
      "Whisper",
    ],
    github: "https://github.com/jchu634/SubtitleProject",
    website: "https://www.hackster.io/jchu634/ryzen-ai-subtitling-5ead7f",
    description:
      "An subtitling program which uses Whisper on a Ryzen AI NPU to generate real-time subtitles for an audio source.\n A Submission for the AMD Pervasive AI Developer Challenge.",
    image: "True",
    image_light: "/projects/ryzensubtitles/simple_light.png",
    image_dark: "/projects/ryzensubtitles/simple_dark.png",
    image_alt: "Ryzen AI Subtitles Screenshot",
  },
  {
    bgColor: "bg-[#1f464d]",
    name: "CodeCritters",
    type: "Hybrid Application and Website",
    technologies_and_frameworks: [
      "Python",
      "PyInstaller",
      "InnoSetup",
      "FastAPI",
      "React",
      "TensorFlow",
      "PyTorch",
      "PyWebView",
    ],
    description:
      "My team's University capstone project:\nA website/application that uses machine learning to identify insects pests for Landcare research.",
    github:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters",
    website: "https://codecritters.live/",
    download:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters/releases/latest",
    image: "True",
    image_dark: "/projects/codecritters/codecritters_dark.png",
    image_light: "/projects/codecritters/codecritters_light.png",
    image_alt: "CodeCritters Screenshot",
  },
  {
    bgColor: "bg-[#B30753]",
    name: "Loopy-Desktop",
    type: "Application",
    technologies_and_frameworks: ["Electron", "HTML", "CSS", "VanillaJS"],
    description:
      "An Electron desktop client with extra features for Loopy, an open source web application which allows users to visualise systems.",
    github: "https://github.com/jchu634/loopy-desktop",
    download: "https://github.com/jchu634/loopy-desktop/releases/latest",
    image: "True",
    image_dark: "/projects/loopy/Loopy.png",
    image_light: "/projects/loopy/Loopy.png",
    image_alt: "Loopy Desktop Screenshot",
  },
  {
    bgColor: "bg-[#56206f]",
    name: "Fakman",
    type: "Game",
    technologies_and_frameworks: ["Unity", "C#"],
    description: "A Pacman clone made as a learning project for Unity and C#.",
    github: "https://github.com/jchu634/fakman",
    link: "/projects/games/Fakman",
    image: "True",
    image_dark: "/projects/fakman/Fakman.png",
    image_light: "/projects/fakman/Fakman.png",
    image_alt: "Fakman Screenshot",
    website: "/projects/games/Fakman",
  },
];

const cards = [
  {
    bgColor: "bg-[#f97316]",
    title: "The Guiding Light",
    description:
      "Lighthouses have stood as beacons of hope for centuries, guiding sailors safely through treacherous waters. Their glowing light and towering presence serve as a reminder of humanity’s connection to the sea.",
    image:
      "https://plus.unsplash.com/premium_vector-1739262161806-d954eb02427c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
  },
  {
    bgColor: "bg-[#0015ff]",
    title: "Life Beneath the Waves",
    description:
      "From shimmering schools of fish to solitary hunters, the ocean is home to an incredible variety of marine life. Each species plays a vital role in maintaining the balance of underwater ecosystems.",
    image:
      "https://plus.unsplash.com/premium_vector-1739200616200-69a138d91627?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
  },
  {
    bgColor: "bg-[#ff5941]",
    title: "Alone on the Open Sea",
    description:
      "Drifting across the endless horizon, traveling alone on the sea is a test of courage and resilience. With nothing but the waves and the sky, solitude becomes both a challenge and a source of deep reflection.",
    image:
      "https://plus.unsplash.com/premium_vector-1738597190290-a3b571590b9e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OHxxdGU5Smx2R3d0b3x8ZW58MHx8fHx8",
  },
  {
    bgColor: "bg-[#1f464d]",
    title: "The Art of Sailing",
    description:
      "Harnessing the power of the wind, sailing is both a skill and an adventure. Whether racing across the waves or leisurely cruising, it’s a timeless way to explore the vast blue expanse.",
    image:
      "https://plus.unsplash.com/premium_vector-1738935247245-97940c74cced?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MTZ8cXRlOUpsdkd3dG98fGVufDB8fHx8fA%3D%3D",
  },
  {
    bgColor: "bg-[#0015ff]",
    title: "The Era of Whaling",
    description:
      "Once a thriving industry, whale hunting shaped economies and cultures across the world. Today, efforts to protect these majestic creatures highlight the shift toward conservation and respect for marine life.",
    image:
      "https://plus.unsplash.com/premium_vector-1738935247692-1c2f2c924fd8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MjJ8cXRlOUpsdkd3dG98fGVufDB8fHx8fA%3D%3D",
  },
];

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

      <div className="flex h-400 justify-between px-12">
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
        <ScrollArea
          className="h-108 w-3/4 rounded-md"
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
                <StackingCardItem key={index} index={index} className="h-100">
                  <Card
                    className={cn(
                      project.bgColor,
                      "relative mx-auto flex min-h-[80%] w-10/12 flex-col rounded-3xl px-8 py-10 sm:flex-row",
                    )}
                  >
                    <CardContent
                      className={cn(
                        "flex min-h-full w-full flex-row justify-between",
                        intel_one_mono.className,
                      )}
                    >
                      <div className="flex w-[50%] flex-col">
                        <span className="text-3xl font-bold whitespace-pre-wrap">
                          {project.name}
                        </span>
                        <span className="text-base font-bold text-wrap whitespace-pre-line text-orange-400">
                          {project.description}
                        </span>

                        <div className="pt-2">
                          {project.website && (
                            <Button
                              variant="outline"
                              className="flex w-fit items-center border-2 border-white hover:cursor-pointer hover:bg-gray-700"
                              asChild
                            >
                              <Link href={project.website}>
                                <Link2Icon />
                                <p>Website Link</p>
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
      </div>
      <div className="h-100">test</div>
    </div>
  );
}
