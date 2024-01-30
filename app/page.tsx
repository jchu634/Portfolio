"use client"
import Image from 'next/image'
import React from 'react';
import CustomCursorTrail from '@/components/cursorTrail'
import CustomCursorGif from '@/components/cursorGif'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const projects = [
  { 
    name: 'CodeCritters', type: 'Hybrid Application and Website', 
    technologies_and_frameworks: ['Python',"PyInstaller", 'InnoSetup', 'FastAPI', 'React', 'TensorFlow', 'PyTorch', 'PyWebView'],
    description: 
    "A project for Landcare research for the detection of pest detection.\nIt uses Machine Learning to find what insect is in an image.",

    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters',
    link:'https://codecritters.live/'
  },
  {
    name: 'Fakman', type: 'Game',
    technologies_and_frameworks:['Unity', 'C#'], 
    description: "A Pacman clone made as a learning project for Unity and C#.\nClick on me to play.",
    github:'https://github.com/jchu634/fakman',
    link:"/projects/games/Fakman",
  },
  {
    name:'Loopy-Desktop',
    type:'Application',
    technologies_and_frameworks:['Electron','HTML','CSS', 'VanillaJS'],
    description:
      "An local Electron desktop port with extra features for Loopy, an open source web application which allows users to visualise systems.",
    github:'https://github.com/jchu634/loopy-desktop',
    link:'https://github.com/jchu634/loopy-desktop'
  },
  { 
    name: 'Portfolio Website', type: 'Website',
    technologies_and_frameworks:['Next.JS', 'TailwindCSS'],
    github:'https://github.com/jchu634/portfolio',
    link:'/',
    description: 'This very website you are on right now!\nThis website is built using Next.JS and TailwindCSS.',
  },
  { 
    name: 'CodeCritters App', type: 'Hybrid Application and Website', 
    technologies_and_frameworks: ['Python',"PyInstaller", 'InnoSetup', 'FastAPI', 'React', 'TensorFlow', 'PyTorch', 'PyWebView'],
    description: 
    "A sister project for Codecritters.\nA camera app which identifies insects in photos using a local machine learning model.",

    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters',
    link:'https://codecritters.live/'
  },
  { 
    name: 'More Projects', type: 'Website',
    link:'/projects',
    description: 'Click on me to find more projects.',
  },
];

function mapProjects(project:any, index:number){
  console.log(project.link)
  return (
    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
      <div className="p-1">
        <Link href={project.link}>
          <Card>
            <CardContent className="flex aspect-square items-center justify-center p-6">
              
              <div className="flex flex-col">
                <span className="text-2xl font-semibold">{project.name}</span>
                {/* <Button>Go To Link</Button> */}
                <p className="whitespace-pre-wrap">{project.description}</p>
              </div>
              
            </CardContent>
          </Card>
        </Link>
      </div>
    </CarouselItem>
  )
}

export default function Home() {  
  return (
    <main>
      <CustomCursorTrail />
      <CustomCursorGif />
      <h1 className="text-3xl font-bold text-blue-900 dark:text-slate-200">Hello,</h1><br></br>
      <h1 className="text-2xl font-bold text-blue-900 dark:text-slate-200">I am a FullStack Developer who specialises in backend development</h1><br></br>
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