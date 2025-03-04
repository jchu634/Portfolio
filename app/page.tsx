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

import Image from "next/image";
import { intel_one_mono, roboto_slab } from "@/lib/fonts";

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
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex  items-center justify-center p-6">
                                            <span className="text-3xl font-semibold">
                                                {index + 1}
                                            </span>
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
