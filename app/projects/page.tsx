'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import Link from 'next/link';
import Image from 'next/image';

import { Link as LinkIcon, Download, ExternalLink } from "lucide-react";
import { SiGithub, SiGithubHex } from '@icons-pack/react-simple-icons';

import { useState } from 'react';

const projects = [
  { 
    name: 'CodeCritters',
    timeframe:'2023',
    type: ['Application','Website'], 
    technologies_and_frameworks: ['Python',"PyInstaller", 'InnoSetup', 'FastAPI', 'React', 'TensorFlow', 'PyTorch', 'PyWebView'],
    description: 
    
    "CodeCritters is an website and local application which uses Machine Learning to predict what an image submitted by an user contains based on the model chosen.\n"+
    "The frontend is built using React and integrates with Firebase Authentication and Databases.\n"+
    "The backend is an RestFul API built using FastAPI.\n"+ 
    "The local app bundles the website and backend using PyWebView, compiles it via PyInstaller and finally bundles it using InnoSetup.",

    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters',
    website:'https://codecritters.live/',
    download:"https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters/releases/tag/v1.2.4",
    images: [
      '/projects/codecritters/codecritters_light.png','/projects/codecritters/codecritters_dark.png',
      '/projects/codecritters/codecritters_upload_light.png','/projects/codecritters/codecritters_upload_dark.png',
      '/projects/codecritters/codecritters_predictions_light.png','/projects/codecritters/codecritters_predictions_dark.png',
      '/projects/codecritters/codecritters_predictions_about_light.png','/projects/codecritters/codecritters_predictions_about_dark.png',
    ],
    
  },
  {
    name: 'CodeCritters Flutter App',
    timeframe:'2023',
    type: ['Application'],
    technologies_and_frameworks: ['Flutter', 'Dart'],
    description: 'This is an sister android camera application for CodeCritters which allows users to take photos and get inference results via a local TensorFlowLite model.\n'+
    "This app is fully functional, and although it was never publicly visible on the Google Play Store, it is still available for download via Github releases.",
    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters-flutterapp',
    download:"https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters-flutterapp/releases/tag/v1.0.0",
    images:['/projects/codecrittersapp/codecrittersapp.jpg','/projects/codecrittersapp/codecrittersapp_prediction.png']
  },
  {
    name: 'Fakman',
    type: ['Game'],
    timeframe:'2021',
    technologies_and_frameworks:['Unity', 'C#'], 
    description: 'This is a Pacman clone made as a learning project for Unity and C#.\n'+
    "This game has a playable windows build and a webGL build which can be played from the link above.",
    github:'https://github.com/jchu634/fakman',
    website:"/projects/games/Fakman",
    images:['/projects/fakman/Fakman.png']
  },
  {
    name: 'Loopy-Desktop',
    type: ['Application'],
    timeframe: '2022 - Early 2023',
    technologies_and_frameworks: ['Electron','HTML','CSS', 'VanillaJS'],
    description:
      'This is a Electron wrapper for Loopy, an open source web application which allows users to visualise systems.\n'+
      'Additionally, this fork adds the ability to create and save GIFs of the visualisations.',
    github: 'https://github.com/jchu634/loopy-desktop',
    download: "https://github.com/jchu634/loopy-desktop/releases/tag/v1.2.1",
    images: ['/projects/loopy/Loopy.png', '/projects/loopy/loopy_output.gif','/projects/loopy/loopy_example.png']
  },
  { 
    name: 'Ryzen AI Subtitles',
    type: ['Application'],
    timeframe:'2024',
    technologies_and_frameworks:['Next.JS', 'TailwindCSS', 'Python', 'Ryzen AI Software', 'Whisper'],
    github:'https://github.com/jchu634/SubtitleProject',
    website:'https://www.hackster.io/jchu634/ryzen-ai-subtitling-5ead7f',
    description: 'An subtitling program which uses Whisper on a Ryzen AI NPU to generate real-time subtitles for an audio source.\n A Submission for the AMD Pervasive AI Developer Challenge.',

  },
  { 
    name: 'Portfolio Website',
    type: ['Website'],
    timeframe:'2023-2024',
    technologies_and_frameworks:['Next.JS', 'TailwindCSS'],
    github:'https://github.com/jchu634/portfolio',
    website:'/',
    description: 'This very website you are on right now! This website is built using Next.JS and TailwindCSS.',
    images:['/projects/portfolio/blog_dark.png','/projects/portfolio/blog_light.png',
    '/projects/portfolio/home_dark.png','/projects/portfolio/home_light.png',
    '/projects/portfolio/projects_dark.png','/projects/portfolio/projects_light.png',
    '/projects/portfolio/mobile_dark.png','/projects/portfolio/mobile_light.png']
  },
  {
    name: 'Shorts Redirector',
    type: ['Application'],
    timeframe: '2023',
    technologies_and_frameworks: ['HTML','CSS', 'VanillaJS'],
    description: 'A Chrome Extension which automatically redirects YouTube Shorts from the Shorts player to the General YouTube player.\n'+
    "This was never published to the Chrome Web Store as I found there existed an already published extension which did the same thing after I finished this.",
    github: 'https://github.com/jchu634/ShortsRedirector'
  },
  {
    name: 'Brookshear Machine Simulator',
    type: ['Application'],
    timeframe: '2019',
    technologies_and_frameworks: ['VB','Python'],
    description: 'A Brookshear Machine Simulator built using Visual Basic and Python.',
    github: 'https://github.com/Keshuac/BrookShear-Machine-Emulator-.py-and-.vb',
  },
];

function mapProject(project: any, index: number, handleProjectClick: (project: any) => void) {
  return (
      <TableRow key={`${project.name}`} onClick={() => handleProjectClick(project)}>
        <TableCell>{project.timeframe}</TableCell>
        <TableCell className="text-lg font-bold">{project.name}</TableCell>
        <TableCell className="space-x-2">
          { project.type && (
              project.type.map((type: string, index:number) => {
                return (
                  <span className="text-xs font-bold bg-[#2B382E] dark:bg-gray-900 text-white p-1 px-2 rounded-md" key={index}>
                    {type}
                  </span>
                );
              }))
          }
        </TableCell>
        <TableCell className="space-x-2 gap-y-3 flex flex-wrap">
          { project.technologies_and_frameworks && (
              project.technologies_and_frameworks.map((technologies_and_frameworks: string, index:number) => {
                return (
                  <span className="text-xs font-bold bg-[#2B382E] dark:bg-emerald-950  text-lime-200 p-1 px-2 rounded-md" key={index}>
                    {technologies_and_frameworks}
                  </span>
                );
              }))
          }
        </TableCell>
        <TableCell className="space-x-2">
          { project.github ? (
              <Link href={project.github} aria-label={`Go to Github repository for ${project.name}`}>
                <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300" aria-label={`Github link button for ${project.name}`}>
                  <SiGithub className="w-8 h-8 text-white hover:text-blue-600"/>
                </Button>
              </Link>
            ) : ( <Button size="icon" variant="link"></Button> )
          }
          { project.website ? (
              <Link href={project.website} aria-label={`Go to website for ${project.name}`}>
              <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300" aria-label={`Link button to ${project.name}`}>
                <LinkIcon className="w-8 h-8 text-white hover:text-blue-600"/>
              </Button>
            </Link>
            ) : ( <Button size="icon" variant="link"></Button> )
          }
        
          { project.download ? (
            <Link href={project.download} aria-label={`Go to download page for ${project.name}`}>
              <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300" aria-label={`Download link button for ${project.name}`}>
                <Download className="w-8 h-8 text-white hover:text-blue-600"/>
              </Button>
            </Link>
            ) : ( <Button size="icon" variant="link"></Button> )
          }
        </TableCell>
      </TableRow>
  )
}

export default function Page(){
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleProjectClick = (project:any) => {
    setSelectedProject(project);
  };

  return (
    <main>
      <h1 className="text-5xl font-bold text-blue-900 dark:text-slate-200">Projects</h1>
        {selectedProject && (
          <div className="mt-5 p-4 border rounded-md">
            <h2 className="text-3xl font-bold">{selectedProject.name}</h2>
            <p className="mt-2">{selectedProject.description}</p>
            {/* Add more details as needed */}
          </div>
          )
        }
  	    
        <ScrollArea className="h-full w-full rounded-md border p-4 mt-8">
          <Table>
            <TableCaption>A list of projects I have done.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Timeframe</TableHead>
                <TableHead className="w-[250px]">Name</TableHead>
                <TableHead className="w-[150px]">Type</TableHead>
                <TableHead className="w-[400px]">Built with</TableHead>
                <TableHead className="w-[150px]">Links</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                projects.map((project, index) => 
                  mapProject(project, index, handleProjectClick)
              )
              }

            </TableBody>
          </Table>
        </ScrollArea>
    </main>
  )
}