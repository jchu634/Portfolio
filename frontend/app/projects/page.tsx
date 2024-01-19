import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const projects = [
  { 
    name: 'CodeCritters', type: 'hybrid Application and Website', 
    description: 'Lorem Ipsum', 
    technologies_and_frameworks: ['Python', 'InnoSetup', 'FastAPI', 'React', 'TensorFlow', 'PyTorch']
  },
  {
    name: 'CodeCritters Flutter App', type: 'application',
    description: 'Lorem Ipsum',
    technologies_and_frameworks: ['Flutter', 'Dart']
  },
  {
    name: 'Fakman', type: 'application', description: 'Lorem Ipsum'
  },
  { 
    name: 'Portfolio', type: 'website', description: 'Lorem Ipsum'
  },
];

export default function Page(){
  return (
    <main>
      { projects.map((project) => {
            return (
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger> {project.name}</AccordionTrigger>
                  <AccordionContent>
                      <p>{project.type}</p>
                      <p>{project.description}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            );
          })}
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger> Project 1</AccordionTrigger>
                <AccordionContent>
                    <p>Project 1 Content</p>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </main>
  )
}