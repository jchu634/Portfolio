"use client";
import { useRef } from "react";

import { cn } from "@/lib/utils";
import VariableFontCursorProximity from "@/components/fancy/text/variable-font-cursor-proximity";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link2Icon } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { intel_one_mono, roboto_slab } from "@/lib/fonts";

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

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(
        null
    ) as React.RefObject<HTMLDivElement>;

    return (
        <div className="w-full h-full">
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
        </div>
    );
}
