"use client"
import React from 'react';
import CustomCursorTrail from '@/components/cursorTrail';
import CustomCursorGif from '@/components/cursorGif';

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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGithubSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faEnvelopeSquare } from '@fortawesome/free-solid-svg-icons';

const projects = [
  { 
    name: 'CodeCritters', type: 'Hybrid Application and Website', 
    technologies_and_frameworks: ['Python',"PyInstaller", 'InnoSetup', 'FastAPI', 'React', 'TensorFlow', 'PyTorch', 'PyWebView'],
    description: 
    "A project for Landcare research for the detection of pest detection.\nIt uses Machine Learning to find what insect is in an image.",

    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters',
    image: "True",
    image_dark: "/projects/codecritters/codecritters_dark.png",
    image_light: "/projects/codecritters/codecritters_light.png",
    image_alt: "CodeCritters Screenshot",
    link:'https://codecritters.live/'
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
      "An local Electron desktop port with extra features for Loopy, an open source web application which allows users to visualise systems.",
    github:'https://github.com/jchu634/loopy-desktop',
    link:'https://github.com/jchu634/loopy-desktop',
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
    image: "True",
    image_dark: "/projects/codecrittersapp/codecrittersapp.jpg",
    image_light: "/projects/codecrittersapp/codecrittersapp.jpg",
    image_alt: "CodeCritters App Screenshot",
    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters',
    link:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters'
  },
  { 
    name: 'Portfolio Website', type: 'Website',
    technologies_and_frameworks:['Next.JS', 'TailwindCSS'],
    description: 'This very website you are on right now!\nThis website is built using Next.JS and TailwindCSS.',
    image:"True",
    image_light:"/projects/portfolio/home_light.png",
    image_dark:"/projects/portfolio/home_dark.png",
    github:'https://github.com/jchu634/portfolio',
    link:'/',
    
  }
];

function mapProjects(project:any, index:number){
  return (
    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
          <Card className="group bg-slate-200 dark:bg-sky-950 dark:bg-opacity-40">
            <CardContent className="relative flex aspect-square items-center justify-center p-6 group-hover:bg-opacity-50 dark:group-hover:bg-opacity-20 dark:group-hover:bg-gray-100 group-hover:bg-gray-800">
              <div className="flex flex-col gap-y-2">
                <span className="text-2xl font-semibold">{project.name}</span>
                {                
                  project.image && (
                    <div className="group-hover:filter dark:group-hover:grayscale-0 group-hover:brightness-50">
                      <Image
                        className="hidden dark:block max-h-52 w-auto group-hover:bg-gray-100 group-hover:bg-opacity-50"
                        src={project.image_dark}
                        width={200}
                        height={200}
                        alt={project.image_alt}
                      ></Image>
                      <Image
                      className="block dark:hidden max-h-52 w-auto"
                        src={project.image_light}
                        width={200}
                        height={200}
                        alt={project.image_alt}
                      ></Image>
                    </div>
                  )
                }
                <p className="whitespace-pre-wrap text-m">{project.description}</p>
              </div>
              <div className="hidden absolute inset-0 group-hover:flex items-center justify-center gap-x-2">
              {                
                  project.github && (
                    <Link href={project.github}>
                      <Button className="bg-gray-700 dark:bg-gray-100">
                          <FontAwesomeIcon icon={faGithub} size="2x"/>
                      </Button>
                    </Link> 
                  )
                } 
                <Link href={project.link}>
                 <Button className="bg-gray-700 dark:bg-gray-100">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="2x"/>
                  </Button> 
                </Link>
              </div>
            </CardContent>
          </Card>
      </div>
    </CarouselItem>
  )
}

export default function Home() {  
  return (
    <main>
      <CustomCursorTrail />
      <CustomCursorGif />
      <h1 className="text-3xl font-bold text-black dark:text-slate-200">Hi, I&apos;m Joshua</h1><br></br>
      <h2 className="text-2xl font-bold text-black dark:text-slate-200">About Me:</h2><br></br>
      <ul className="pl-5 text-xl text-black dark:text-slate-200 whitespace-pre-wrap list-disc">
        <li>
          Final year Computer Science Student at the University of Auckland.<br />
        </li>
        <li>
          FullStack Developer who prefers backend development
        </li>
      </ul><br/>
      <h2 className="text-2xl font-bold text-black dark:text-slate-200">Contact Methods:</h2><br></br>
      <div className="flex flex-col md:flex-row justify-start gap-3">
        <Link href="https://github.com/jchu634">
          <Button className="h-12 gap-2 bg-blue-600 dark:hover:bg-sky-900">
            <FontAwesomeIcon className="dark:text-slate-200" icon={faGithubSquare} size="3x"/>
            <p className="text-lg dark:text-slate-200">@jchu634</p>
          </Button>
        </Link>
        <Link href="https://www.linkedin.com/in/jchu634/">
          <Button className="h-12 gap-2 bg-blue-600 dark:hover:bg-sky-900">
            <FontAwesomeIcon className="dark:text-slate-200" icon={faLinkedin} size="3x"/>
            <p className="text-lg dark:text-slate-200">@jchu634</p>
          </Button>
        </Link>
        <Link href="mailto:jchu634@keshuac.com">
          <Button className="h-12 gap-2 bg-blue-600 dark:hover:bg-sky-900">
            <FontAwesomeIcon className="dark:text-slate-200" icon={faEnvelopeSquare} size="3x"/>
            <p className="text-lg dark:text-slate-200">jchu634@keshuac.com</p>
          </Button>
        </Link>
      </div><br/>
      <h1 className="text-2xl font-bold text-black dark:text-slate-200">Here are a couple of projects I worked on:</h1><br></br>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full sm:max-w-screen-xs lg:max-w-screen-lg xl:max-w-screen-xl"
      >
        <CarouselContent>
          { projects.map((project, index) => {
            return (mapProjects(project, index));
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Alert className="w-60">
        <AlertTitle>More Projects:</AlertTitle>
        <div className="flex flex-row items-center gap-4">
          <AlertDescription>
            See more projects, and get more details at:
          </AlertDescription>
          <Link href="/projects">
            <Button className="w-10 h-10 bg-blue-600 dark:hover:bg-sky-900">
                <FontAwesomeIcon className="dark:text-slate-200" icon={faArrowUpRightFromSquare} size="2x"/>
            </Button>
          </Link>
        </div>
      </Alert>
    </main>
  )
}
