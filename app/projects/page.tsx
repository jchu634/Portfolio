import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

import Link from 'next/link';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
} from "@fortawesome/free-brands-svg-icons"

import {
  faArrowUpRightFromSquare
} from "@fortawesome/free-solid-svg-icons"

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
    website:'https://codecritters.live/'
  },
  {
    name: 'CodeCritters Flutter App', type: 'Application',
    technologies_and_frameworks: ['Flutter', 'Dart'],
    description: 'This is an sister android camera application for CodeCritters which allows users to take photos and get inference results via a local TensorFlowLite model.',
    github:'https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters-flutterapp',
  },
  {
    name: 'Fakman', type: 'Game',
    technologies_and_frameworks:['Unity', 'C#'], 
    description: 'This is a Pacman clone made as a learning project for Unity and C#.',
    github:'https://github.com/jchu634/fakman',
    website:"/projects/games/Fakman",
  },
  {
    name:'Loopy-Desktop',
    type:'Application',
    technologies_and_frameworks:['Electron','HTML','CSS', 'VanillaJS'],
    description:'This is an Electron application which allows users to create and save flowcharts.',
    github:'https://github.com/jchu634/loopy-desktop'
  },
  {
    name:'Shorts Redirector',
    type:'Application',
    technologies_and_frameworks:['HTML','CSS', 'VanillaJS'],
    
  },
  { 
    name: 'Portfolio', type: 'Website',
    technologies_and_frameworks:['Next.JS', 'TailwindCSS'],
    description: 'Lorem Ipsum'
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

export default function Page(){
  return (
    <main>
      { projects.map((project, index) => {
            return (
              <Accordion type="single" key={`${index}`} collapsible>
                <AccordionItem value={`item-${index + 1}`}>
                  <AccordionTrigger> <p className="font-bold text-blue-900 dark:text-slate-200">{project.name}</p></AccordionTrigger>
                  <AccordionContent>
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
    </main>
  )
}