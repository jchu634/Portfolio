"use client";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { intel_one_mono, roboto_slab } from "@/lib/fonts";
import { Link2Icon } from "lucide-react";

import VariableFontCursorProximity from "@/components/fancy/text/variable-font-cursor-proximity";
import StackingCards, {
    StackingCardItem,
} from "@/components/fancy/blocks/stacking-cards";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

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
        github: "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters",
        website: "https://codecritters.live/",
        download:
            "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters/releases/latest",
        image: "True",
        image_dark: "/projects/codecritters/codecritters_dark.png",
        image_light: "/projects/codecritters/codecritters_light.png",
        image_alt: "CodeCritters Screenshot",
    },
    {
        bgColor: "bg-[#1f464d]",
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
        image_light: "/projects/subtextapp/ScreenshotLight.png",
        image_dark: "/projects/subtextapp/ScreenshotDark.png",
        image_alt: "Subtext App Screenshot",
    },
    {
        bgColor: "bg-[#1f464d]",
        name: "Fakman",
        type: "Game",
        technologies_and_frameworks: ["Unity", "C#"],
        description:
            "A Pacman clone made as a learning project for Unity and C#.",
        github: "https://github.com/jchu634/fakman",
        link: "/projects/games/Fakman",
        image: "True",
        image_dark: "/projects/fakman/Fakman.png",
        image_light: "/projects/fakman/Fakman.png",
        image_alt: "Fakman Screenshot",
        website: "/projects/games/Fakman",
    },
    {
        bgColor: "bg-[#1f464d]",
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
];

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(
        null
    ) as React.RefObject<HTMLDivElement>;
    const [container, setContainer] = useState<HTMLElement | null>(null);

    return (
        <div className="w-full h-full" ref={(node) => setContainer(node)}>
            <div
                className="w-3/4 h-1/4 rounded-lg items-center justify-center cursor-pointer relative overflow-hidden"
                ref={containerRef}
            >
                <div className="size-full pl-5 flex flex-col items-left gap-4 ">
                    {["Hi, I'm Joshua:", "I like making stuff."].map(
                        (text, i) => (
                            <VariableFontCursorProximity
                                key={i}
                                label={text}
                                className={cn(
                                    `text-3xl md:text-4xl lg:text-5xl leading-none  ${roboto_slab.className} text-orange-300`
                                )}
                                fromFontVariationSettings="'wght' 400, 'slnt' 0"
                                toFontVariationSettings="'wght' 900, 'slnt' -10"
                                radius={200}
                                containerRef={containerRef}
                            />
                        )
                    )}

                    {/* prettier-ignore */}
                    <p
                    className={`text-3xl md:text-4xl lg:text-xl leading-10 ${roboto_slab.className} whitespace-pre-line text-white`}
                >
                    
                    Hi, I'm a new graduate from the University of Auckland (BSc Computer Science) <br />
                    Currently I am looking for work while working on a couple of projects I didn't have time to start while studying.
                </p>
                </div>
            </div>
            <div className="px-12 w-full pt-4">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {education.map((edu, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="p-1">
                                    <Card>
                                        <CardContent
                                            className={`flex flex-col min-h-30 justify-center ${intel_one_mono.className}`}
                                        >
                                            <span className="text-lg font-bold whitespace-pre-wrap">
                                                {edu.description}
                                            </span>
                                            <span className="text-base font-bold text-orange-400">
                                                {edu.institution} (
                                                {edu.timeframe})
                                            </span>
                                            <div className="pt-2">
                                                <Button
                                                    variant="outline"
                                                    className="flex items-center w-fit border-2 border-white hover:bg-gray-700 hover:cursor-pointer"
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

            <StackingCards
                totalCards={projects.length}
                scrollOptons={{ container: { current: container } }}
                className="justify-center items-center"
            >
                {projects.map((project, index) => {
                    return (
                        <StackingCardItem
                            key={index}
                            index={index}
                            className="h-[500px]"
                        >
                            <Card
                                className={cn(
                                    project.bgColor,
                                    "h-90% min-h-[80%] flex-col sm:flex-row px-8 py-10 flex w-10/12 rounded-3xl mx-auto relative"
                                )}
                            >
                                <CardContent
                                    className={cn(
                                        "flex flex-row min-h-full w-full justify-between",
                                        intel_one_mono.className
                                    )}
                                >
                                    <div className="flex flex-col w-[50%]">
                                        <span className="text-3xl font-bold whitespace-pre-wrap">
                                            {project.name}
                                        </span>
                                        <span className="text-base font-bold text-orange-400 text-wrap whitespace-pre-line">
                                            {project.description}
                                        </span>

                                        <div className="pt-2">
                                            {project.website && (
                                                <Button
                                                    variant="outline"
                                                    className="flex items-center w-fit border-2 border-white hover:bg-gray-700 hover:cursor-pointer"
                                                    asChild
                                                >
                                                    <Link
                                                        href={project.website}
                                                    >
                                                        <Link2Icon />
                                                        <p>Website Link</p>
                                                    </Link>
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Image
                                            src={project.image_light}
                                            alt={project.name}
                                            className="object-cover"
                                            width={400}
                                            height={300}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </StackingCardItem>
                    );
                })}

            </StackingCards>
        </div>
    );
}
