'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator";
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

import { useState, useEffect } from 'react';

const projects = [
  { 
    name: 'Ryzen AI Subtitles',
    type: ['Application'],
    timeframe:'2024',
    technologies_and_frameworks:['Next.JS', 'TailwindCSS', 'Python', 'Ryzen AI Software', 'Whisper'],
    github:'https://github.com/jchu634/SubtitleProject',
    website:'https://www.hackster.io/jchu634/ryzen-ai-subtitling-5ead7f',
    description: 'An subtitling program which uses Whisper on a Ryzen AI NPU to generate real-time subtitles for an audio source.\n A Submission for the AMD Pervasive AI Developer Challenge.',
    images:[
      '/projects/ryzensubtitles/simple_light.png',
      '/projects/ryzensubtitles/simple_dark.png',
      '/projects/ryzensubtitles/complex_light.png',
      '/projects/ryzensubtitles/complex_dark.png',
    ]
  },
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
    name: 'Portfolio Website',
    type: ['Website'],
    timeframe:'2023-Ongoing',
    technologies_and_frameworks:['Next.JS', 'TailwindCSS'],
    github:'https://github.com/jchu634/portfolio',
    website:'/',
    description: 'This very website you are on right now! This website is built using Next.JS and TailwindCSS.',
    images:[
      '/projects/portfolio/mobile_dark.png','/projects/portfolio/mobile_light.png',
      '/projects/portfolio/blog_dark.png','/projects/portfolio/blog_light.png',
      '/projects/portfolio/home_dark.png','/projects/portfolio/home_light.png',
      '/projects/portfolio/projects_dark.png','/projects/portfolio/projects_light.png',
    ]
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
    name: 'Fakman',
    type: ['Game'],
    timeframe:'2021',
    technologies_and_frameworks:['Unity', 'C#'], 
    description: 'This is a Pacman clone made as a learning project for Unity and C#.\n'+
    "This game has a playable windows build and a webGL build which can be played in your browser through the link below",
    github:'https://github.com/jchu634/fakman',
    website:"/projects/games/Fakman",
    images:['/projects/fakman/Fakman.png']
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
    // <TableRow key={`${project.name}`} onClick={() => handleProjectClick(project)}>
    <TableRow key={`${project.name}`}>
      <TableCell>{project.timeframe}</TableCell>
      <TableCell className="text-lg font-bold">
          <Link className="flex xl:hidden" href={project.github} aria-label={`Go to Github repository for ${project.name}`}>
            {project.name}
            <ExternalLink className="pl-1"/>  
          </Link>
          <p className="hidden xl:block">
            {project.name}
          </p>
      </TableCell>
      <TableCell className="space-x-2 hidden xl:table-cell">
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
      <TableCell className="space-x-2 gap-y-3 hidden xl:flex flex-wrap">
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
      <TableCell className="space-x-2 hidden xl:table-cell">
        { project.github ? (
          <Link href={project.github} aria-label={`Go to Github repository for ${project.name}`}>
            <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300" aria-label={`Github link button for ${project.name}`}>
              <SiGithub className="w-8 h-8 text-white hover:text-blue-600"/>
            </Button>
          </Link>
          ) : ( <Button size="icon" variant="link" aria-label="Placeholder button"></Button> 
        )}
        { project.website ? (
            <Link href={project.website} aria-label={`Go to website for ${project.name}`}>
            <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300" aria-label={`Link button to ${project.name}`}>
              <LinkIcon className="w-8 h-8 text-white hover:text-blue-600"/>
            </Button>
          </Link>
          ) : ( <Button size="icon" variant="link" aria-label="Placeholder button"></Button> 
        )}
        { project.download ? (
          <Link href={project.download} aria-label={`Go to download page for ${project.name}`}>
            <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300" aria-label={`Download link button for ${project.name}`}>
              <Download className="w-8 h-8 text-white hover:text-blue-600"/>
            </Button>
          </Link>
          ) : ( <Button size="icon" variant="link" aria-label="Placeholder button"></Button> 
        )}
      </TableCell>
    </TableRow>
  )
}

function renderProject(selectedProject:any){
  return (
    <div className="p-4">
      <div className="flex items-end">
        <h2 className="text-3xl font-bold">{selectedProject.name}</h2>
        <h3 className="text-base font-bold">&nbsp;({selectedProject.timeframe})</h3>
      </div>
      <div className="pt-2 space-x-2 gap-y-3 flex flex-wrap">
        { selectedProject.type && (
          selectedProject.type.map((type: string, index:number) => {
            return (
              <span className="text-xs font-bold bg-[#2B382E] dark:bg-slate-700 text-white p-1 px-2 rounded-md" key={index}>
                {type}
              </span>
            );
          }))
        }
        <Separator orientation="vertical"/>
        { selectedProject.technologies_and_frameworks && (
          selectedProject.technologies_and_frameworks.map((technologies_and_frameworks: string, index:number) => {
            return (
              <span className="text-xs font-bold bg-[#2B382E] dark:bg-emerald-950 text-lime-200 p-1 px-2 rounded-md" key={index}>
                {technologies_and_frameworks}
              </span>
            );
          }))
        }
      </div>
      <p className="mt-2 text-lg whitespace-pre-wrap">{selectedProject.description}</p>
      <div className="space-x-2 pt-2">
        { selectedProject.github && (
          <Link href={selectedProject.github} aria-label={`Go to Github repository for ${selectedProject.name}`}>
            <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300" aria-label={`Github link button for ${selectedProject.name}`}>
              <SiGithub className="w-8 h-8 text-white hover:text-blue-600"/>
            </Button>
          </Link>
        )}
        { selectedProject.website && (
          <Link href={selectedProject.website} aria-label={`Go to website for ${selectedProject.name}`}>
            <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300" aria-label={`Link button to ${selectedProject.name}`}>
              <ExternalLink className="w-8 h-8 text-white hover:text-blue-600"/>
            </Button>
          </Link>
        )}
        { selectedProject.download && (
          <Link href={selectedProject.download} aria-label={`Go to download page for ${selectedProject.name}`}>
            <Button size="icon" className="w-10 h-10 bg-black dark:hover:bg-slate-300" aria-label={`Download link button for ${selectedProject.name}`}>
              <Download className="w-8 h-8 text-white hover:text-blue-600"/>
            </Button>
          </Link>
        )}
      </div>
      <div>
        { selectedProject.images && (
          <Carousel className="relative w-full sm:max-w-fit xl:max-w-fit xl:max-w-fit max-h-fit px-8"
            opts={{
              align: "start",
              loop: false,
            }}
          >
            <CarouselContent>
              { selectedProject.images.map((images: any, index: number) => {
                const moreThan1Image = selectedProject.images.length > 1 ? "basis-1/2" : "";
                return (
                  <CarouselItem key={index} className={`${moreThan1Image} p-4`}>
                    <Card className="bg-slate-200 dark:bg-sky-950 dark:bg-opacity-40">
                      <CardContent className="flex p-6 justify-center">
                        <Image unoptimized alt="Project Image" className="object-scale-down max-h-[300px]"
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
            { selectedProject.images.length > 2 && (
              <>
                <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
                <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
              </>
            )}
          </Carousel>
        )}
      </div>
    </div>
  )
}

export default function Page(){
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [tempSelectedProject, setTempSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(false);
  const [maxImageHeight, setMaxImageHeight] = useState<number>(0);

  const handleProjectClick = (project:any) => {
    setSelectedProject(project);
  };

  const handleProjectHover = (project:any) => {
    setTempSelectedProject(project);
  };

  useEffect(() => {
    // Set initial mode based on screen size
    if (window.innerWidth < 1024) {
      setIsSimpleMode(true);
    }
  
    const handleResize = () => {
      if (window.innerWidth < 1024 && !isSimpleMode) {
        setIsSimpleMode(true);
      } else if (window.innerWidth >= 1024 && isSimpleMode) {
        setIsSimpleMode(false);
      }
    };
  
    // Add event listener to handle window resize
    window.addEventListener('resize', handleResize);
  
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main>
      <h1 className="text-5xl font-bold text-blue-900 dark:text-slate-200">Projects</h1>
        <div className="flex items-center space-x-2 pt-7 hidden xl:block">
          <Label htmlFor="mode-switcher">Complex Mode</Label>
          <Switch id="mode-switcher" aria-label={`Switch page into complex or simple mode`} checked={isSimpleMode} onCheckedChange={setIsSimpleMode} className="data-[state=unchecked]:bg-cyan-800"/>
          <Label htmlFor="mode-switcher">Simple Table Mode</Label>
        </div>
        { 
          isSimpleMode ? (
            <ScrollArea className="h-[700px] w-full rounded-md border p-4 mt-8">
              <Table>
                <TableCaption>A list of projects I have done.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] text-blue-900 dark:text-white text-base font-bold">Timeframe</TableHead>
                    <TableHead className="w-[250px] text-blue-900 dark:text-white text-base font-bold">Name</TableHead>
                    <TableHead className="w-[150px] text-blue-900 dark:text-white text-base font-bold hidden xl:table-cell">Type</TableHead>
                    <TableHead className="w-[400px] text-blue-900 dark:text-white text-base font-bold hidden xl:table-cell">Built with</TableHead>
                    <TableHead className="w-[150px] text-blue-900 dark:text-white text-base font-bold hidden xl:table-cell">Links</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  { projects.map((project, index) => mapProject(project, index, handleProjectClick)) }
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <div className="flex space-x-5">
              <ScrollArea className="h-[700px] w-72 flex-shrink-0 rounded-md border space-y-2 p-4 mt-8">
                <h2 className="mb-4 text-lg font-bold leading-none text-blue-900 dark:text-white">Projects</h2>
                { projects.map((project, index) => (
                  <div key={index} className={`text-m py-2 cursor-pointer hover:font-bold ${selectedProject === project ? 'font-bold' : ''}`} onClick={() => handleProjectClick(project)} onMouseOver={() => handleProjectHover(project)} onMouseOut={() => handleProjectHover(null)}>
                    {project.name}
                    <Separator />
                  </div>
                  ))
                }
              </ScrollArea>
              <div className="mt-5 w-full p-4 border rounded-md mt-8">
                { selectedProject ? ( renderProject(selectedProject)
                  ) : (
                    <>
                      {
                        tempSelectedProject ? (
                          renderProject(tempSelectedProject)
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <div className="text-lg font-bold">Select a project to view more details.</div>
                          </div>
                        )
                      }
                    </>
                )}
              </div>
            </div>
          )
        }
    </main>
  )
}