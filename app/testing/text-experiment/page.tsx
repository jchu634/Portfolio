"use client";
import React, { Suspense } from "react";
import { useTheme } from "next-themes";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { Link as LinkIcon, Download, ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { BubbleModel } from "@/components/models/bubble";

const projects = [
  {
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
      "My team's University capstone project: A website/application that uses machine learning to identify insects pests for Landcare research.",
    github:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters",
    link: "https://codecritters.live/",
    download:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters/releases/latest",
    image: "True",
    image_dark: "/projects/codecritters/codecritters_dark.png",
    image_light: "/projects/codecritters/codecritters_light.png",
    image_alt: "CodeCritters Screenshot",
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
  {
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

function mapProjects(project: any, index: number) {
  // Index is here to stop the warning about needing a key
  return (
    <Card
      className="w-auto bg-slate-300 dark:bg-fuchsia-950 dark:bg-opacity-40"
      key={index}
    >
      <CardContent>
        <div className="flex items-start">
          {project.image && (
            <div className="group-hover:brightness-50 group-hover:filter dark:group-hover:grayscale-0">
              <Image
                className="hidden pr-5 dark:block dark:lg:block"
                src={project.image_dark}
                width={250}
                height={250}
                alt={project.image_alt}
              />
              <Image
                className="hidden pr-5 dark:hidden lg:block"
                src={project.image_light}
                width={250}
                height={250}
                alt={project.image_alt}
              />
            </div>
          )}
          <div>
            <span className="text-2xl font-bold text-cyan-900 dark:text-cyan-200">
              {project.name}
            </span>
            <p className="text-m whitespace-pre-wrap text-wrap">
              {project.description}
            </p>
            <div className="space-x-2 pt-2">
              {project.github && (
                <Link
                  href={project.github}
                  aria-label={`Go to Github repository for ${project.name}`}
                >
                  <Button
                    size="icon"
                    className="h-10 w-10 bg-black dark:hover:bg-slate-300"
                    title={`Github link for ${project.name}`}
                    aria-label={`Github link button for ${project.name}`}
                  >
                    <SiGithub className="h-8 w-8 text-white hover:text-blue-600" />
                  </Button>
                </Link>
              )}
              {project.link && (
                <Link
                  href={project.link}
                  aria-label={`Go to website for ${project.name}`}
                >
                  <Button
                    size="icon"
                    className="h-10 w-10 bg-black dark:hover:bg-slate-300"
                    title={`Link to ${project.name}`}
                    aria-label={`Link button to ${project.name}`}
                  >
                    <LinkIcon className="h-8 w-8 text-white hover:text-blue-600" />
                  </Button>
                </Link>
              )}
              {project.download && (
                <Link
                  href={project.download}
                  aria-label={`Go to download page for ${project.name}`}
                >
                  <Button
                    size="icon"
                    className="h-10 w-10 bg-black dark:hover:bg-slate-300"
                    title={`Download link for ${project.name}`}
                    aria-label={`Download link button for ${project.name}`}
                  >
                    <Download className="h-8 w-8 text-white hover:text-blue-600" />
                  </Button>
                </Link>
              )}
            </div>
            <div className="flex flex-wrap gap-y-2 space-x-2 pt-2">
              {project.technologies_and_frameworks &&
                project.technologies_and_frameworks.map(
                  (technologies_and_frameworks: string, index: number) => {
                    return (
                      <span
                        className="rounded-md bg-[#2B382E] p-1 px-2 text-xs font-bold text-[#62FDBF] dark:bg-black"
                        key={index}
                      >
                        {technologies_and_frameworks}
                      </span>
                    );
                  },
                )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <main className="relative h-full w-full">
      <div className="pointer-events-none absolute inset-0 z-10">
        <Suspense fallback={<span>loading...</span>}>
          <Canvas style={{ zIndex: 1 }}>
            <OrthographicCamera makeDefault zoom={50} />
            <BubbleModel position-x={10} position-y={5.5} />

            {theme === "light" && <ambientLight intensity={0.3} />}
            <directionalLight position={[-10, -5, 10]} color="white" />
          </Canvas>
        </Suspense>
      </div>
      <div className="relative z-0">
        <h3 className="text-xl text-black dark:text-slate-200">
          Hi, I&apos;m a new graduate from the University of Auckland (BSc in
          Computer Science)
          <br />
          I really like making stuff and trying out new technologies.
          <br />
          <br />
          Currently I am working on a couple of projects I didn&apos;t have time
          to start while studying.
          <br />
          I am currently interested in Machine Learning, hardware Video
          encode/decode.
          <br />
          <br />
          Also looking for work.
          <br />
        </h3>
        <h2 className="pt-2 text-2xl font-bold text-black dark:text-slate-200">
          Featured Projects:
        </h2>
        <br />
        <div className="space-y-4 pb-4">
          {projects.map((project, index) => {
            return mapProjects(project, index);
          })}
        </div>
      </div>
    </main>
  );
}

// export default ThreeScene;
