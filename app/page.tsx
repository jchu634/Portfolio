"use client"
import React from 'react';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {Alert, AlertTitle, AlertDescription} from "@/components/ui/alert";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Link as LinkIcon, Download, ExternalLink } from "lucide-react";
import { SiGithub, SiGithubHex } from '@icons-pack/react-simple-icons';

const projects = [
  { 
    name: 'CodeCritters', type: 'Hybrid Application and Website', 
    technologies_and_frameworks: ['Python',"PyInstaller", 'InnoSetup', 'FastAPI', 'React', 'TensorFlow', 'PyTorch', 'PyWebView'],
    description: 
    "My team's capstone project: A website/application that uses machine learning to identify insects pests for Landcare research.",
    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters',
    link:'https://codecritters.live/',
    download:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters/releases/latest',
    image: "True",
    image_dark: "/projects/codecritters/codecritters_dark.png",
    image_light: "/projects/codecritters/codecritters_light.png",
    image_alt: "CodeCritters Screenshot",
  },
  {
    name: 'Fakman', type: 'Game',
    technologies_and_frameworks:['Unity', 'C#'], 
    description: "A Pacman clone made as a learning project for Unity and C#.",
    github:'https://github.com/jchu634/fakman',
    link:"/projects/games/Fakman",
    image: "True",
    image_dark: "/projects/fakman/Fakman.png",
    image_light: "/projects/fakman/Fakman.png",
    image_alt: "Fakman Screenshot",
    website:"/projects/games/Fakman"
  },
  {
    name:'Loopy-Desktop',
    type:'Application',
    technologies_and_frameworks:['Electron','HTML','CSS', 'VanillaJS'],
    description:
      "An Electron desktop client with extra features for Loopy, an open source web application which allows users to visualise systems.",
    github:'https://github.com/jchu634/loopy-desktop',
    download:'https://github.com/jchu634/loopy-desktop/releases/latest',
    image: "True",
    image_dark: "/projects/loopy/Loopy.png",
    image_light: "/projects/loopy/Loopy.png",
    image_alt: "Loopy Desktop Screenshot",
  },
  { 
    name: 'CodeCritters App', type: 'Hybrid Application and Website', 
    technologies_and_frameworks: ['Python',"PyInstaller", 'InnoSetup', 'FastAPI', 'React', 'TensorFlow', 'PyTorch', 'PyWebView'],
    description: 
    "A sister project for Codecritters.\nA camera app which identifies insects in photos using a local machine learning model.",
    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters-flutterapp',
    download:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters-flutterapp/releases/latest',
    image: "True",
    image_dark: "/projects/codecrittersapp/codecrittersapp.jpg",
    image_light: "/projects/codecrittersapp/codecrittersapp.jpg",
    image_alt: "CodeCritters App Screenshot",
  },
];

function mapProjects(project:any, index:number){ // Index is here to stop the warning about needing a key
  return (
    <Card className="bg-slate-200 dark:bg-fuchsia-900 dark:bg-opacity-40 w-auto" key={index}>
      <CardContent>
        <div className="flex items-start">
          {project.image && (
            <div className="group-hover:filter dark:group-hover:grayscale-0 group-hover:brightness-50">
              <Image
                className="hidden dark:block"
                src={project.image_dark}
                width={200}
                height={200}
                alt={project.image_alt}
              />
              <Image
                className="block dark:hidden"
                src={project.image_light}
                width={200}
                height={200}
                alt={project.image_alt}
              />
            </div>
          )}
          <div className="pl-5">
            <span className="text-2xl font-bold text-cyan-200">{project.name}</span>
            <p className="whitespace-pre-wrap text-m">{project.description}</p>
            <div className="space-x-2 pt-2">
              { project.github && (
                <Link href={project.github}>
                  <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300">
                    <SiGithub className="w-8 h-8 text-white hover:text-blue-600"/>
                  </Button>
                </Link>
              )}
              { project.link && (
                <Link href={project.link}>
                  <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300">
                    <LinkIcon className="w-8 h-8 text-white hover:text-blue-600"/>
                  </Button>
                </Link>
              )}
              { project.download && (
                <Link href={project.download}>
                  <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300">
                    <Download className="w-8 h-8 text-white hover:text-blue-600"/>
                  </Button>
                </Link>
              )}
            </div>
            <div className="space-x-2 pt-2">
              {project.technologies_and_frameworks && (
                project.technologies_and_frameworks.map((technologies_and_frameworks: string, index:number) => {
                  return (
                    <span className="text-xs font-bold bg-[#2B382E] dark:bg-black  text-[#62FDBF] p-1 px-2 rounded-md" key={index}>
                      {technologies_and_frameworks}
                    </span>
                  );
                })
                )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Home() {  
  return (
    <main>
      <h2 className="text-2xl font-bold text-black dark:text-slate-200">About Me:</h2><br></br>
      <h3 className="text-xl text-black dark:text-slate-200">
        Hi, I&apos; m a new graduate from the University of Auckland (BSc in Computer Science)<br/>
        I really like making stuff and trying out new technologies.<br/>
        <br/>
        Currently I am working on a couple of projects I didn&apos;t have time to start while studying.<br/>
        I am currently interested in Machine Learning, hardware Video encode/decode.<br/>
        <br/>
        Also looking for work.<br/>
      </h3>
      <br/>
      
      <h2 className="text-2xl font-bold text-black dark:text-slate-200">
        Featured Projects:
      </h2><br/>
      <div className="space-y-4">
        { 
          projects.map((project, index) => {
            return (mapProjects(project, index));
          })
        }
      </div>
      
      <Link href="/projects">
        <Button variant="link" className=" dark:hover:bg-sky-900 text-white font-bold space-x-2 text-lg pt-8">
          <p>View Complete Project Archive</p>
          <ExternalLink className="w-6 h-6 text-white hover:text-blue-600"/>
        </Button>
      </Link>
    </main>
  )
}
