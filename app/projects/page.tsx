import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerShell,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, DownloadIcon, PlusIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import { intel_one_mono, lexend } from "@/lib/fonts";

const projects = [
  {
    name: "Subtext",
    type: ["Application"],
    timeframe: "2024-2025",
    technologies_and_frameworks: [
      "Astro",
      "Next.JS",
      "TailwindCSS",
      "InnoSetup",
      "Python",
      "PyWebView",
      "Whisper",
    ],
    github: "https://github.com/jchu634/subtext-app",
    website: "https://subtextapp.cc/",
    brief: "A Local AI Subtitling app.",
    description:
      "Subtext is an easy to use subtitling app, which allows an user to utilise AI models to generate subtitles entirely on device.",
    images: [
      "/projects/subtextapp/ScreenshotDark.png",
      "/projects/subtextapp/ScreenshotLight.png",
      "/projects/subtextapp/SiteLight.png",
      "/projects/subtextapp/SiteDark.png",
    ],
  },
  {
    name: "Ryzen AI Subtitles",
    type: ["Application"],
    timeframe: "2024",
    technologies_and_frameworks: [
      "Next.JS",
      "TailwindCSS",
      "Python",
      "Ryzen AI Software",
      "PyWebView",
      "Whisper",
    ],
    github: "https://github.com/jchu634/SubtitleProject",
    website: "https://www.hackster.io/jchu634/ryzen-ai-subtitling-5ead7f",
    brief: "Real-Time Captions using the Ryzen AI NPU",
    description:
      "A Submission for the AMD Pervasive AI Developer Challenge.\nAn subtitling program which uses Whisper on a Ryzen AI NPU to generate real-time subtitles for an audio source.",
    images: [
      "/projects/ryzensubtitles/Certificates for the Winning Team.jpg",
      "/projects/ryzensubtitles/simple_light.png",
      "/projects/ryzensubtitles/simple_dark.png",
      "/projects/ryzensubtitles/complex_light.png",
      "/projects/ryzensubtitles/complex_dark.png",
    ],
    cert: "https://utfs.io/f/NQ2gjwtsCGtKCqzKLe2jLhGCvurfiFms5UkNDxORWnd0pSE1",
  },
  {
    name: "CodeCritters",
    timeframe: "2023",
    type: ["Application", "Website"],
    technologies_and_frameworks: [
      "Python",
      "PyInstaller",
      "InnoSetup",
      "FastAPI",
      "TensorFlow",
      "PyTorch",
      "PyWebView",
    ],
    brief: "A Application/Website for Insect identification using ML",
    description:
      "CodeCritters is an website and local application which uses Machine Learning to predict what an image submitted by an user contains based on the model chosen.\n" +
      "The frontend is built using React and integrates with Firebase Authentication and Databases.\n" +
      "The backend is an RestFul API built using FastAPI.\n" +
      "The local app bundles the website and backend using PyWebView, compiles it via PyInstaller and finally bundles it using InnoSetup.",

    github:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters",
    website: "https://codecritters.live/",
    download:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters/releases/tag/v1.2.4",
    images: [
      "/projects/codecritters/codecritters_light.png",
      "/projects/codecritters/codecritters_dark.png",
      "/projects/codecritters/codecritters_upload_light.png",
      "/projects/codecritters/codecritters_upload_dark.png",
      "/projects/codecritters/codecritters_predictions_light.png",
      "/projects/codecritters/codecritters_predictions_dark.png",
      "/projects/codecritters/codecritters_predictions_about_light.png",
      "/projects/codecritters/codecritters_predictions_about_dark.png",
    ],
  },
  {
    name: "CodeCritters Flutter App",
    timeframe: "2023",
    type: ["Application"],
    technologies_and_frameworks: ["Flutter", "Dart", "Tensorflow"],
    brief: "A Android Application for Insect identification using ML",
    description:
      "This is an sister android camera application for CodeCritters which allows users to take photos and get inference results via a local TensorFlowLite model.\n" +
      "This app is fully functional, and although it was never publicly visible on the Google Play Store, it is still available for download via Github releases.",
    github:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters-flutterapp",
    download:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters-flutterapp/releases/tag/v1.0.0",
    images: [
      "/projects/codecrittersapp/codecrittersapp.jpg",
      "/projects/codecrittersapp/codecrittersapp_prediction.png",
    ],
  },
  {
    name: "Portfolio Website",
    type: ["Website"],
    timeframe: "2023-Ongoing",
    technologies_and_frameworks: ["Next.JS", "TailwindCSS"],
    github: "https://github.com/jchu634/portfolio",
    website: "/",
    brief: "This very website! 😊",
    description:
      "This very website you are on right now! This website is built using Next.JS and TailwindCSS.",
    images: [
      "/projects/portfolio/mobile_dark.png",
      "/projects/portfolio/mobile_light.png",
      "/projects/portfolio/blog_dark.png",
      "/projects/portfolio/blog_light.png",
      "/projects/portfolio/home_dark.png",
      "/projects/portfolio/home_light.png",
      "/projects/portfolio/projects_dark.png",
      "/projects/portfolio/projects_light.png",
    ],
  },
  {
    name: "Loopy-Desktop",
    type: ["Application"],
    timeframe: "2022 - 2023",
    technologies_and_frameworks: ["Electron", "HTML", "CSS", "VanillaJS"],
    brief: "Desktop Application for visualising Systems",
    description:
      "This is a Electron wrapper for Loopy, an open source web application which allows users to visualise systems.\n" +
      "Additionally, this fork adds the ability to create and save GIFs of the visualisations.",
    github: "https://github.com/jchu634/loopy-desktop",
    download: "https://github.com/jchu634/loopy-desktop/releases/tag/v1.2.1",
    images: [
      "/projects/loopy/Loopy.png",
      "/projects/loopy/loopy_output.gif",
      "/projects/loopy/loopy_example.png",
    ],
  },
  {
    name: "Fakman",
    type: ["Game"],
    timeframe: "2021",
    technologies_and_frameworks: ["Unity", "C#"],
    brief: "Unity Pacman Clone",
    description:
      "This is a Pacman clone made as a learning project for Unity and C#.\n" +
      "This game has a playable windows build and a webGL build which can be played in your browser through the link below",
    github: "https://github.com/jchu634/fakman",
    website: "/projects/games/Fakman",
    images: ["/projects/fakman/Fakman.png"],
  },
  {
    name: "Shorts Redirector",
    type: ["Application"],
    timeframe: "2023",
    technologies_and_frameworks: ["HTML", "CSS", "VanillaJS"],
    brief: "Chrome Extension for Redirecting YouTube Shorts",
    description:
      "A Chrome Extension which automatically redirects YouTube Shorts from the Shorts player to the General YouTube player.\n" +
      "This was never published to the Chrome Web Store as I found there existed an already published extension which did the same thing after I finished this.",
    github: "https://github.com/jchu634/ShortsRedirector",
  },
  {
    name: "Brookshear Machine Simulator",
    type: ["Application"],
    timeframe: "2019",
    technologies_and_frameworks: ["VB", "Python"],
    brief: "Its a Brookshear Machine Simulator",
    description:
      "A Brookshear Machine Simulator built using Visual Basic and Python.",
    github:
      "https://github.com/Keshuac/BrookShear-Machine-Emulator-.py-and-.vb",
  },
];

export default function Page() {
  return (
    <main className="p-10">
      <h1 className="pb-10 text-5xl font-bold text-blue-900 dark:text-slate-200">
        Projects
      </h1>
      <Table>
        <TableCaption>A list of projects I have done.</TableCaption>
        <TableHeader>
          <TableRow
            className={cn("border-black dark:border-white", lexend.className)}
          >
            <TableHead className="hidden text-black md:table-cell dark:text-white">
              Timeframe
            </TableHead>
            <TableHead className="hidden text-black sm:table-cell dark:text-white">
              Project
            </TableHead>
            <TableHead className="hidden text-black xl:table-cell dark:text-white">
              Built with
            </TableHead>
            <TableHead className="hidden text-black sm:table-cell dark:text-white">
              Links
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project, index) => {
            return (
              <TableRow
                key={index}
                className={cn(
                  "border-black dark:border-white",
                  lexend.className,
                )}
              >
                <TableCell className="hidden md:table-cell">
                  {project.timeframe}
                </TableCell>
                <TableCell className="w-180 whitespace-pre-wrap">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTriggerShell>
                        <div className="flex w-full items-center justify-between pr-5 hover:underline">
                          <div className="flex flex-col">
                            <h2
                              className={cn(
                                "text-lg text-orange-400",
                                intel_one_mono.className,
                              )}
                            >
                              {project.name}
                            </h2>
                            <span
                              className={cn("inline-block", lexend.className)}
                            >
                              {project.brief}
                            </span>
                          </div>

                          <PlusIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                        </div>
                      </AccordionTriggerShell>
                      <AccordionContent>
                        <div
                          className={cn(
                            "whitespace-pre-line",
                            lexend.className,
                          )}
                        >
                          {project.description}
                          <div className="flex min-h-[40px] space-x-2 pt-2 sm:hidden">
                            {project.github && (
                              <Button
                                className="group h-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                                title={`Github link for ${project.name}`}
                                aria-label={`Github link button for ${project.name}`}
                                asChild
                              >
                                <Link
                                  href={project.github}
                                  aria-label={`Go to Github repository for ${project.name}`}
                                >
                                  <p>Github</p>

                                  <SiGithub className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                                </Link>
                              </Button>
                            )}

                            {project.website && (
                              <Button
                                className="group h-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                                title={`Link to ${project.name}`}
                                aria-label={`Link button to ${project.name}`}
                                asChild
                              >
                                <Link
                                  href={project.website}
                                  aria-label={`Go to website for ${project.name}`}
                                >
                                  <p>Website</p>
                                  <ExternalLinkIcon className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                                </Link>
                              </Button>
                            )}

                            {project.download && (
                              <Button
                                className="group h-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                                title={`Download link for ${project.name}`}
                                aria-label={`Download link button for ${project.name}`}
                                asChild
                              >
                                <Link
                                  href={project.download}
                                  aria-label={`Go to download page for ${project.name}`}
                                >
                                  <p>Download</p>
                                  <DownloadIcon className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                                </Link>
                              </Button>
                            )}
                          </div>
                          <div className="hidden justify-center sm:flex md:w-full">
                            {project.images && (
                              <Carousel
                                className="relative max-h-fit w-4/5 px-8 sm:max-w-fit xl:max-w-fit"
                                opts={{
                                  align: "start",
                                  loop: true,
                                }}
                              >
                                <CarouselContent>
                                  {project.images.map(
                                    (image, index: number) => {
                                      return (
                                        <CarouselItem
                                          key={index}
                                          className="p-4"
                                        >
                                          <Card className="dark:bg-opacity-40 bg-slate-500 dark:bg-slate-300">
                                            <CardContent className="flex justify-center">
                                              <Image
                                                alt="Project Image"
                                                className="max-h-[300px] object-scale-down"
                                                style={{ objectFit: "contain" }}
                                                src={image}
                                                width={400}
                                                height={400}
                                                layout="responsive"
                                                objectFit="contain"
                                              />
                                            </CardContent>
                                          </Card>
                                        </CarouselItem>
                                      );
                                    },
                                  )}
                                </CarouselContent>
                                {project.images.length > 2 && (
                                  <>
                                    <CarouselPrevious className="bg-slate-500 text-white dark:bg-slate-50 dark:text-black" />
                                    <CarouselNext className="bg-slate-500 text-white dark:bg-slate-50 dark:text-black" />
                                  </>
                                )}
                              </Carousel>
                            )}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TableCell>
                <TableCell className="hidden space-x-2 xl:table-cell">
                  {project.technologies_and_frameworks &&
                    project.technologies_and_frameworks.map(
                      (technologies_and_frameworks: string, index: number) => {
                        return (
                          <span
                            className="rounded-md bg-[#2B382E] p-1 px-2 text-xs font-bold text-lime-200 no-underline hover:no-underline dark:bg-emerald-950"
                            key={index}
                          >
                            {technologies_and_frameworks}
                          </span>
                        );
                      },
                    )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex min-h-[40px] space-x-2 pt-2">
                    {project.github ? (
                      <Button
                        size="icon"
                        className="group h-10 w-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                        title={`Github link for ${project.name}`}
                        aria-label={`Github link button for ${project.name}`}
                        asChild
                      >
                        <Link
                          href={project.github}
                          aria-label={`Go to Github repository for ${project.name}`}
                        >
                          <SiGithub className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                        </Link>
                      </Button>
                    ) : (
                      <div className="w-10" />
                    )}

                    {project.website ? (
                      <Button
                        size="icon"
                        className="group h-10 w-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                        title={`Link to ${project.name}`}
                        aria-label={`Link button to ${project.name}`}
                        asChild
                      >
                        <Link
                          href={project.website}
                          aria-label={`Go to website for ${project.name}`}
                        >
                          <ExternalLinkIcon className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                        </Link>
                      </Button>
                    ) : (
                      <div className="w-10" />
                    )}

                    {project.download ? (
                      <Button
                        size="icon"
                        className="group h-10 w-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                        title={`Download link for ${project.name}`}
                        aria-label={`Download link button for ${project.name}`}
                        asChild
                      >
                        <Link
                          href={project.download}
                          aria-label={`Go to download page for ${project.name}`}
                        >
                          <DownloadIcon className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                        </Link>
                      </Button>
                    ) : (
                      <div className="w-10" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
