"use client"
import React from 'react';
import CustomCursorTrail from '@/components/cursorTrail'
import CustomCursorGif from '@/components/cursorGif'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

const projects = [
  { 
    name: 'CodeCritters', type: 'Hybrid Application and Website', 
    technologies_and_frameworks: ['Python',"PyInstaller", 'InnoSetup', 'FastAPI', 'React', 'TensorFlow', 'PyTorch', 'PyWebView'],
    description: 
    "A project for Landcare research for the detection of pest detection.\nIt uses Machine Learning to find what insect is in an image.",

    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters',
    image: "True",
    image_dark: "/codecritters_dark.png",
    image_light: "/codecritters_light.png",
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
    image_dark: "/Fakman.png",
    image_light: "/Fakman.png",
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
    image_dark: "/Loopy.png",
    image_light: "/Loopy.png",
    image_alt: "Loopy Desktop Screenshot",
  },
  { 
    name: 'CodeCritters App', type: 'Hybrid Application and Website', 
    technologies_and_frameworks: ['Python',"PyInstaller", 'InnoSetup', 'FastAPI', 'React', 'TensorFlow', 'PyTorch', 'PyWebView'],
    description: 
    "A sister project for Codecritters.\nA camera app which identifies insects in photos using a local machine learning model.",
    image: "True",
    image_dark: "/codecrittersapp.jpg",
    image_light: "/codecrittersapp.jpg",
    image_alt: "CodeCritters App Screenshot",
    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters',
    link:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters'
  },
  { 
    name: 'Portfolio Website', type: 'Website',
    technologies_and_frameworks:['Next.JS', 'TailwindCSS'],
    github:'https://github.com/jchu634/portfolio',
    link:'/',
    description: 'This very website you are on right now!\nThis website is built using Next.JS and TailwindCSS.',
  },
  { 
    name: 'More Projects', type: 'Website',
    link:'/projects',
    description: 'Click on me to find more projects.',
  },
];

function mapProjects(project:any, index:number){
  return (
    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
          <Card className="group">
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
                        >

                        </Image>
                      <Image
                      className="block dark:hidden max-h-52 w-auto"
                        src={project.image_light}
                        width={200}
                        height={200}
                        alt={project.image_alt}
                        >
                        </Image>
                    </div>
                  )
                }
                <p className="whitespace-pre-wrap text-m">{project.description}</p>
              </div>
              <div className="hidden absolute inset-0 group-hover:flex items-center justify-center gap-x-2">
              {                
                  project.github && (
                    <Link
                    href={project.github}
                    
                    >
                      <Button className="dark:bg-gray-100">
                          <FontAwesomeIcon icon={faGithub} size="2x"/>
                      </Button>
                    </Link>
                    
                  )
                } 
                <Link
                href={project.link}
                >
                 <Button className="dark:bg-gray-100">
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
      <h1 className="text-3xl font-bold text-blue-900 dark:text-slate-200">Hi,</h1><br></br>
      <h1 className="text-2xl font-bold text-blue-900 dark:text-slate-200">I'm Joshua, a FullStack Developer who prefers backend development</h1><br></br>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full sm:max-w-screen-xs lg:max-w-screen-lg"
      >
        <CarouselContent>
          { projects.map((project, index) => {
            return (mapProjects(project, index));
          })}
          mapProjects(Projects)
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </main>
  )
}