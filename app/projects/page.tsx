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

import { Card, CardContent } from "@/components/ui/card";

import Link from 'next/link';
import Image from 'next/image';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, } from "@fortawesome/free-brands-svg-icons";

import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

const projects = [
  { 
    name: 'CodeCritters', type: 'Hybrid Application and Website', 
    technologies_and_frameworks: ['Python',"PyInstaller", 'InnoSetup', 'FastAPI', 'React', 'TensorFlow', 'PyTorch', 'PyWebView'],
    description: 
    
    "CodeCritters is an website and local application which uses Machine Learning to predict what an image submitted by an user contains based on the model chosen.\n"+
    "The frontend is built using React and integrates with Firebase Authentication and Databases.\n"+
    "The backend is an RestFul API built using FastAPI.\n"+ 
    "The local app bundles the website and backend using PyWebView, compiles it via PyInstaller and finally bundles it using InnoSetup.",

    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters',
    website:'https://codecritters.live/',
    images: [
      '/projects/codecritters/codecritters_light.png','/projects/codecritters/codecritters_dark.png',
      '/projects/codecritters/codecritters_upload_light.png','/projects/codecritters/codecritters_upload_dark.png',
      '/projects/codecritters/codecritters_predictions_light.png','/projects/codecritters/codecritters_predictions_dark.png',
      '/projects/codecritters/codecritters_predictions_about_light.png','/projects/codecritters/codecritters_predictions_about_dark.png',
    ]
  },
  {
    name: 'CodeCritters Flutter App', type: 'Application',
    technologies_and_frameworks: ['Flutter', 'Dart'],
    description: 'This is an sister android camera application for CodeCritters which allows users to take photos and get inference results via a local TensorFlowLite model.\n'+
    "This app is fully functional, and although it was never publicly visible on the Google Play Store, it is still available for download via Github releases.",
    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters-flutterapp',
    images:['/projects/codecrittersapp/codecrittersapp.jpg','/projects/codecrittersapp/codecrittersapp_prediction.png']
  },
  {
    name: 'Fakman', type: 'Game',
    technologies_and_frameworks:['Unity', 'C#'], 
    description: 'This is a Pacman clone made as a learning project for Unity and C#.\n'+
    "This game has a playable windows build and a webGL build which can be played from the link above.",
    github:'https://github.com/jchu634/fakman',
    website:"/projects/games/Fakman",
    images:['/projects/fakman/fakman.png']
  },
  {
    name:'Loopy-Desktop',
    type:'Application',
    technologies_and_frameworks:['Electron','HTML','CSS', 'VanillaJS'],
    description:
      'This is a Electron wrapper for Loopy, an open source web application which allows users to visualise systems.\n'+
      'Additionally, this fork adds the ability to create and save GIFs of the visualisations.',
    github:'https://github.com/jchu634/loopy-desktop',
    images:['/projects/loopy/Loopy.png', '/projects/loopy/loopy_output.gif','/projects/loopy/loopy_example.png']
  },
  { 
    name: 'Portfolio Website', type: 'Website',
    technologies_and_frameworks:['Next.JS', 'TailwindCSS'],
    github:'https://github.com/jchu634/portfolio',
    website:'/',
    description: 'This very website you are on right now! This website is built using Next.JS and TailwindCSS.',
  },
];
const minor_projects = [
  {
    name:'Shorts Redirector',
    type:'Application',
    technologies_and_frameworks:['HTML','CSS', 'VanillaJS'],
    description:'A Chrome Extension which automatically redirects YouTube Shorts from the Shorts player to the General YouTube player.\n'+
    "This was never published to the Chrome Web Store as I found there existed an already published extension which did the same thing after I finished this.",
    github:'https://github.com/jchu634/ShortsRedirector'
  },
  {
    name:'Brookshear Machine Simulator',
    type:'Application',
    technologies_and_frameworks:['VB','Python'],
    description:'A Brookshear Machine Simulator built using Visual Basic and Python.',
    github:'https://github.com/Keshuac/BrookShear-Machine-Emulator-.py-and-.vb',
  },
];

function exportProjectsAsString(technologies_and_frameworks: string[]){
  let technologies_and_frameworks_string = ' ';

  technologies_and_frameworks.map((technology, i, row) => {
    if (i + 1 === row.length){
      technologies_and_frameworks_string += technology;    
    } else {
      technologies_and_frameworks_string += technology + ', ';
    }
  })
  return technologies_and_frameworks_string;

}

function mapProject(project:any, index:number){
  return (
    <Accordion type="single" key={`${project.name}`} collapsible>
      <AccordionItem value={`item-${index + 1}`}>
        <AccordionTrigger> <p className="font-bold text-blue-900 dark:text-slate-200">{project.name}</p></AccordionTrigger>
        <AccordionContent className="flex flex-col lg:flex-row justify-between last:md:pr-10">
          <div>
            <p className="text-indigo-950 dark:text-sky-50"><b>Project Type: </b>{project.type}</p>
            <p className="text-indigo-950 dark:text-sky-50"><b>Project Technologies: </b>
            {
              project.technologies_and_frameworks && (
                <>{exportProjectsAsString(project.technologies_and_frameworks)}</>
              )
            }
            </p>
            <div className="flex flex-row items-center justify-start space-x-2">
              {
              project.github && (
                <Link
                href={project.github}
                >
                  <FontAwesomeIcon icon={faGithub} size="2x"/>
                </Link>
            
              )
            }
            {
              project.website && (
                <Link
                href={project.website}
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="2x"/>
                </Link>
              )
            }
            </div>
            <p className="text-indigo-950 dark:text-sky-50 whitespace-pre-wrap"><b>Project Description: </b> {project.description}</p>
          </div>

          {
            project.images && (
            <div className="lg:w-1/3 md:pl-10">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full sm:max-w-fit lg:max-w-fit xl:max-w-fit max-h-fit "
              >
              <CarouselContent>
                {project.images.map((images:any,index:number) => {
                  return (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="bg-slate-200 dark:bg-sky-950 dark:bg-opacity-40">
                        <CardContent className="flex p-6 justify-center">
                          <Image
                            src={images}
                            width={400}
                            height={400}
                            alt="CodeCritters Homepage"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                  )
                  })
                }
              
              </CarouselContent>
              
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            )
          }
          

        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default function Page(){
  return (
    <main>
      <h1 className="text-3xl font-bold text-blue-900 dark:text-slate-200">Major Projects</h1>
        { projects.map((project, index) => {
          return (mapProject(project, index));
        })}
        <br></br><h1 className="text-3xl font-bold text-blue-900 dark:text-slate-200">Minor Projects</h1>
        { minor_projects.map((project, index) => {
          return (mapProject(project, index));
        }
        )}
    </main>
  )
}