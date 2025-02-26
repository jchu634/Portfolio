"use client";
import React, { Suspense } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { BubbleModel } from "@/components/models/bubble";

import { Link as LinkIcon, Download, ExternalLink } from "lucide-react";
import { SiGithub, SiGithubHex } from "@icons-pack/react-simple-icons";

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

const education = [
  {
    institution: "University of Auckland",
    description: "Bachelor of Science in Computer Science",
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
                    className="group h-10 w-10 bg-black hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                    title={`Github link for ${project.name}`}
                    aria-label={`Github link button for ${project.name}`}
                  >
                    <SiGithub className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
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
                    className="group h-10 w-10 bg-black hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                    title={`Link to ${project.name}`}
                    aria-label={`Link button to ${project.name}`}
                  >
                    <LinkIcon className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
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
                    className="group h-10 w-10 bg-black hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                    title={`Download link for ${project.name}`}
                    aria-label={`Download link button for ${project.name}`}
                  >
                    <Download className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
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

function mapEdu(edu: any, index: number) {
  // Index is here to stop the warning about needing a key
  return (
    <Card
      className="w-auto bg-slate-300 dark:bg-fuchsia-950 dark:bg-opacity-40"
      key={index}
    >
      <CardContent>
        <div className="flex items-start">
          <div className="space-x-2 pr-4 pt-2">
            {edu.link && (
              <Link
                href={edu.link}
                aria-label={`Certificate for ${edu.description}`}
              >
                <Button
                  size="icon"
                  className="group h-10 w-10 bg-black hover:bg-slate-200 dark:bg-fuchsia-800 dark:hover:bg-slate-300"
                  title={`Link to Certificate`}
                  aria-label={`Link button to Certificate`}
                >
                  <LinkIcon className="h-8 w-8 text-white group-hover:text-blue-800" />
                </Button>
              </Link>
            )}
          </div>
          <div>
            <span className="text-2xl font-bold text-cyan-900 dark:text-cyan-200">
              {edu.institution} ({edu.timeframe})
            </span>
            <p className="text-m whitespace-pre-wrap text-wrap">
              {edu.description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const { theme } = useTheme();
  return (
    <main className="xl:relative xl:h-full xl:w-full">
      <div className="pointer-events-none absolute inset-0 z-0 hidden xl:block">
        <Suspense fallback={<span>loading...</span>}>
          <Canvas style={{ zIndex: 1 }}>
            <OrthographicCamera makeDefault zoom={50} />
            <BubbleModel position={[10, 4.5, 0]} />

            {theme === "light" && <ambientLight intensity={0.3} />}
            <directionalLight position={[-10, -5, 10]} color="white" />
          </Canvas>
        </Suspense>
      </div>
      <div className="z-10 lg:relative">
        <div className="block md:hidden">
          <h1 className="text-5xl font-bold text-black dark:text-violet-200">
            Hi, I&apos;m Joshua
          </h1>
          <br />
          <h2 className="text-2xl font-bold text-black dark:text-violet-300">
            Graduate FullStack Developer
          </h2>
          <br />
          <h3 className="text-xl text-black dark:text-slate-200">
            I like making stuff.
          </h3>
          <br />
        </div>

        <h2 className="text-2xl font-bold text-black dark:text-slate-200">
          About Me:
        </h2>
        <br></br>
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
        <br />

        <div className="flex gap-x-2">
          <Link href="https://utfs.io/f/NQ2gjwtsCGtKRBynBBbPMa7DKY9qLyxQvIEZcpb8HkjrTetf">
            <Button
              variant="flex_outline"
              className="group space-x-2 text-lg font-bold text-white hover:bg-sky-700 dark:bg-sky-800 dark:hover:bg-purple-800"
            >
              <p>View CV</p>
              <ExternalLink className="w-6 text-white group-hover:text-blue-600" />
            </Button>
          </Link>
          <Link href="https://m3ml4l3qi1.ufs.sh/f/NQ2gjwtsCGtKpLKfeomlDOyPvBFhCAkR7d84bW3f5pSYz0tM">
            <Button
              variant="flex_outline"
              className="group space-x-2 text-lg font-bold text-white hover:bg-sky-700 dark:bg-sky-800 dark:hover:bg-purple-800"
            >
              <p>View Resume</p>
              <ExternalLink className="w-6 text-white group-hover:text-blue-600" />
            </Button>
          </Link>
        </div>

        <br />
        <h2 className="pt-2 text-2xl font-bold text-black dark:text-slate-200">
          Education + Qualifications:
        </h2>
        <br />
        <div className="space-y-4 pb-4">
          {education.map((edu, index) => {
            return mapEdu(edu, index);
          })}
        </div>

        <h2 className="pt-2 text-2xl font-bold text-black dark:text-slate-200">
          Featured Projects:
        </h2>
        <br />
        <div className="space-y-4 pb-4">
          {projects.map((project, index) => {
            return mapProjects(project, index);
          })}
        </div>

        <Link href="/projects">
          <Button
            variant="flex_outline"
            className="group space-x-2 text-lg font-bold text-white hover:bg-sky-700 dark:bg-sky-800 dark:hover:bg-purple-800"
          >
            <p>View Complete Project Archive</p>
            <ExternalLink className="w-6 text-white group-hover:text-blue-600" />
          </Button>
        </Link>
        <br />
      </div>
    </main>
  );
}
