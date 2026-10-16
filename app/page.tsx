"use client";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { intel_one_mono, roboto_slab } from "@/lib/fonts";
import { Link2Icon, ExternalLinkIcon } from "lucide-react";
import { isMobile } from "react-device-detect";

import VariableFontCursorProximity from "@/components/fancy/text/variable-font-cursor-proximity";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { education } from "@/lib/homepageData";
import FeaturedProjects from "@/components/featured-projects";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(
    null,
  ) as React.RefObject<HTMLDivElement>;

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
          <div className="grid items-start gap-4 sm:grid-cols-2 sm:items-stretch xl:grid-cols-1 xl:items-start">
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

      <FeaturedProjects introRef={containerRef} />
    </div>
  );
}
