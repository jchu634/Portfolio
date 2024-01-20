import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

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
    name: 'CodeCritters Flutter App', type: 'application',
    description: 'Lorem Ipsum',
    technologies_and_frameworks: ['Flutter', 'Dart'],
  },
  {
    name: 'Fakman', type: 'application', technologies_and_framework:['Unity', 'C#'],  description: 'Lorem Ipsum'
  },
  { 
    name: 'Portfolio', type: 'website', technologies_and_frameworks:['Next.JS', 'TailwindCSS'], description: 'Lorem Ipsum'
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
              <Accordion type="single" collapsible>
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
                    </p><br></br>
                    <p className="text-indigo-950 dark:text-sky-50 whitespace-pre-wrap"><b>Project Description: </b> {project.description}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
    </main>
  )
}