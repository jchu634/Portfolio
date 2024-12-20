"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Link from "next/link";
import Image from "next/image";

import {
  Link as LinkIcon,
  Download,
  ExternalLink,
  FileText,
} from "lucide-react";
import { SiGithub, SiGithubHex } from "@icons-pack/react-simple-icons";

import { useState, useEffect } from "react";

const projects = [
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
    description:
      "An subtitling program which uses Whisper on a Ryzen AI NPU to generate real-time subtitles for an audio source.\n A Submission for the AMD Pervasive AI Developer Challenge.",
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
      "React",
      "TensorFlow",
      "PyTorch",
      "PyWebView",
    ],
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
    technologies_and_frameworks: ["Flutter", "Dart"],
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
    timeframe: "2022 - Early 2023",
    technologies_and_frameworks: ["Electron", "HTML", "CSS", "VanillaJS"],
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
    description:
      "A Brookshear Machine Simulator built using Visual Basic and Python.",
    github:
      "https://github.com/Keshuac/BrookShear-Machine-Emulator-.py-and-.vb",
  },
];

function mapProject(
  project: any,
  index: number,
  handleProjectClick: (project: any) => void,
) {
  return (
    // <TableRow key={`${project.name}`} onClick={() => handleProjectClick(project)}>
    <TableRow key={`${project.name}`}>
      <TableCell>{project.timeframe}</TableCell>
      <TableCell className="text-lg font-bold">
        <Link
          className="flex xl:hidden"
          href={project.github}
          aria-label={`Go to Github repository for ${project.name}`}
        >
          {project.name}
          <ExternalLink className="pl-1" />
        </Link>
        <p className="hidden xl:block">{project.name}</p>
      </TableCell>
      <TableCell className="hidden space-x-2 xl:table-cell">
        {project.type &&
          project.type.map((type: string, index: number) => {
            return (
              <span
                className="rounded-md bg-[#2B382E] p-1 px-2 text-xs font-bold text-white dark:bg-gray-900"
                key={index}
              >
                {type}
              </span>
            );
          })}
      </TableCell>
      <TableCell className="hidden flex-wrap gap-y-3 space-x-2 xl:flex">
        {project.technologies_and_frameworks &&
          project.technologies_and_frameworks.map(
            (technologies_and_frameworks: string, index: number) => {
              return (
                <span
                  className="rounded-md bg-[#2B382E] p-1 px-2 text-xs font-bold text-lime-200 dark:bg-emerald-950"
                  key={index}
                >
                  {technologies_and_frameworks}
                </span>
              );
            },
          )}
      </TableCell>
      <TableCell className="hidden space-x-2 xl:table-cell">
        {project.github ? (
          <Link
            href={project.github}
            aria-label={`Go to Github repository for ${project.name}`}
          >
            <Button
              size="icon"
              className="group h-10 w-10 bg-black hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
              title={`Github link for ${project.name}`}
              aria-label={`Github link button for ${project.name}`}
            >
              <SiGithub className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
            </Button>
          </Link>
        ) : (
          <Button
            size="icon"
            variant="link"
            aria-label="Placeholder button"
          ></Button>
        )}
        {project.website ? (
          <Link
            href={project.website}
            aria-label={`Go to website for ${project.name}`}
          >
            <Button
              size="icon"
              className="group h-10 w-10 bg-black hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
              title={`Link to ${project.name}`}
              aria-label={`Link button to ${project.name}`}
            >
              <LinkIcon className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
            </Button>
          </Link>
        ) : (
          <Button
            size="icon"
            variant="link"
            aria-label="Placeholder button"
          ></Button>
        )}
        {project.download ? (
          <Link
            href={project.download}
            aria-label={`Go to download page for ${project.name}`}
          >
            <Button
              size="icon"
              className="group h-10 w-10 bg-black hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
              title={`Download link for ${project.name}`}
              aria-label={`Download link button for ${project.name}`}
            >
              <Download className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
            </Button>
          </Link>
        ) : (
          <Button
            size="icon"
            variant="link"
            aria-label="Placeholder button"
          ></Button>
        )}
        {project.cert ? (
          <Link
            href={project.cert}
            aria-label={`Go to cert page for ${project.name}`}
          >
            <Button
              size="icon"
              className="group h-10 w-10 bg-black hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
              title={`Cert link for ${project.name}`}
              aria-label={`Cert link button for ${project.name}`}
            >
              <FileText className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
            </Button>
          </Link>
        ) : (
          <Button
            size="icon"
            variant="link"
            aria-label="Placeholder button"
          ></Button>
        )}
      </TableCell>
    </TableRow>
  );
}

function renderProject(selectedProject: any) {
  return (
    <div className="p-4">
      <div className="flex items-end">
        <h2 className="text-3xl font-bold">{selectedProject.name}</h2>
        <h3 className="text-base font-bold">
          &nbsp;({selectedProject.timeframe})
        </h3>
      </div>
      <div className="flex flex-wrap gap-y-3 space-x-2 pt-2">
        {selectedProject.type &&
          selectedProject.type.map((type: string, index: number) => {
            return (
              <span
                className="rounded-md bg-[#2B382E] p-1 px-2 text-xs font-bold text-white dark:bg-slate-700"
                key={index}
              >
                {type}
              </span>
            );
          })}
        <Separator orientation="vertical" />
        {selectedProject.technologies_and_frameworks &&
          selectedProject.technologies_and_frameworks.map(
            (technologies_and_frameworks: string, index: number) => {
              return (
                <span
                  className="rounded-md bg-[#2B382E] p-1 px-2 text-xs font-bold text-lime-200 dark:bg-emerald-950"
                  key={index}
                >
                  {technologies_and_frameworks}
                </span>
              );
            },
          )}
      </div>
      <p className="mt-2 whitespace-pre-wrap text-lg">
        {selectedProject.description}
      </p>
      <div className="space-x-2 pt-2">
        {selectedProject.github && (
          <Link
            href={selectedProject.github}
            aria-label={`Go to Github repository for ${selectedProject.name}`}
          >
            <Button
              size="icon"
              className="group h-10 w-10 bg-black hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
              title={`Github link for ${selectedProject.name}`}
              aria-label={`Github link button for ${selectedProject.name}`}
            >
              <SiGithub className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
            </Button>
          </Link>
        )}
        {selectedProject.website && (
          <Link
            href={selectedProject.website}
            aria-label={`Go to website for ${selectedProject.name}`}
          >
            <Button
              size="icon"
              className="group h-10 w-10 bg-black hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
              title={`Link to ${selectedProject.name}`}
              aria-label={`Link button to ${selectedProject.name}`}
            >
              <ExternalLink className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
            </Button>
          </Link>
        )}
        {selectedProject.download && (
          <Link
            href={selectedProject.download}
            aria-label={`Go to download page for ${selectedProject.name}`}
          >
            <Button
              size="icon"
              className="group h-10 w-10 bg-black hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
              title={`Download link for ${selectedProject.name}`}
              aria-label={`Download link button for ${selectedProject.name}`}
            >
              <Download className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
            </Button>
          </Link>
        )}
      </div>
      <div>
        {selectedProject.images && (
          <Carousel
            className="relative max-h-fit w-full px-8 sm:max-w-fit xl:max-w-fit"
            opts={{
              align: "start",
              loop: false,
            }}
          >
            <CarouselContent>
              {selectedProject.images.map((images: any, index: number) => {
                const moreThan1Image =
                  selectedProject.images.length > 1 ? "basis-1/2" : "";
                return (
                  <CarouselItem key={index} className={`${moreThan1Image} p-4`}>
                    <Card className="bg-slate-200 dark:bg-sky-950 dark:bg-opacity-40">
                      <CardContent className="flex justify-center p-6">
                        <Image
                          alt="Project Image"
                          className="max-h-[300px] object-scale-down"
                          src={images}
                          width={400}
                          height={400}
                          layout="responsive"
                          objectFit="contain"
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {selectedProject.images.length > 2 && (
              <>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 transform" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 transform" />
              </>
            )}
          </Carousel>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [tempSelectedProject, setTempSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [isComplexMode, setIsComplexMode] = useState<boolean>(false);
  const [maxImageHeight, setMaxImageHeight] = useState<number>(0);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
  };

  const handleProjectHover = (project: any) => {
    setTempSelectedProject(project);
  };

  useEffect(() => {
    // Set initial mode based on screen size
    if (window.innerWidth < 1024) {
      setIsComplexMode(true);
    }

    const handleResize = () => {
      if (window.innerWidth < 1024 && !isComplexMode) {
        setIsComplexMode(true);
      } else if (window.innerWidth >= 1024 && isComplexMode) {
        setIsComplexMode(false);
      }
    };

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <main>
      <h1 className="text-5xl font-bold text-blue-900 dark:text-slate-200">
        Projects
      </h1>
      <div className="flex hidden items-center space-x-2 pt-7 xl:block">
        <Label htmlFor="mode-switcher">Table View</Label>
        <Switch
          id="mode-switcher"
          aria-label={`Switch page into complex or simple mode`}
          checked={isComplexMode}
          onCheckedChange={setIsComplexMode}
          className="data-[state=unchecked]:bg-cyan-800"
        />
        <Label htmlFor="mode-switcher"> Interactive View</Label>
      </div>
      {isComplexMode ? (
        <div className="flex space-x-5">
          <ScrollArea className="mt-8 h-[700px] w-72 flex-shrink-0 space-y-2 rounded-md border p-4">
            <h2 className="mb-4 text-lg font-bold leading-none text-blue-900 dark:text-white">
              Projects
            </h2>
            {projects.map((project, index) => (
              <div
                key={index}
                className={`text-m cursor-pointer py-2 hover:font-bold ${selectedProject === project ? "font-bold" : ""}`}
                onClick={() => handleProjectClick(project)}
                onMouseOver={() => handleProjectHover(project)}
                onMouseOut={() => handleProjectHover(null)}
              >
                {project.name}
                <Separator />
              </div>
            ))}
          </ScrollArea>
          <div className="mt-5 mt-8 w-full rounded-md border p-4">
            {selectedProject ? (
              renderProject(selectedProject)
            ) : (
              <>
                {tempSelectedProject ? (
                  renderProject(tempSelectedProject)
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-lg font-bold">
                      Select or Hover over a project to view more details.
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : (
        <ScrollArea className="mt-8 h-[700px] w-full rounded-md border p-4">
          <Table>
            <TableCaption>A list of projects I have done.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] text-base font-bold text-blue-900 dark:text-white">
                  Timeframe
                </TableHead>
                <TableHead className="w-[250px] text-base font-bold text-blue-900 dark:text-white">
                  Name
                </TableHead>
                <TableHead className="hidden w-[150px] text-base font-bold text-blue-900 dark:text-white xl:table-cell">
                  Type
                </TableHead>
                <TableHead className="hidden w-[400px] text-base font-bold text-blue-900 dark:text-white xl:table-cell">
                  Built with
                </TableHead>
                <TableHead className="hidden w-[180px] text-base font-bold text-blue-900 dark:text-white xl:table-cell">
                  Links
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project, index) =>
                mapProject(project, index, handleProjectClick),
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      )}
    </main>
  );
}
