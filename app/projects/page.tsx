import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerShell,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ExternalLinkIcon, DownloadIcon, PlusIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { ImageGallery } from "@/components/image-gallery";

import { projects } from "@/lib/projectData";

export default function Page() {
  return (
    <main className="p-10">
      <h1 className="pb-10 text-5xl font-bold text-[#122c23] dark:text-slate-200">
        Projects
      </h1>
      <Table>
        <TableCaption>A list of projects I have done.</TableCaption>
        <TableHeader>
          <TableRow className="font-lexend border-black dark:border-white">
            <TableHead className="hidden text-black md:table-cell dark:text-white">
              Timeframe
            </TableHead>
            <TableHead className="hidden text-black sm:table-cell dark:text-white">
              Project
            </TableHead>
            <TableHead className="hidden text-black xl:table-cell dark:text-white">
              Built with
            </TableHead>
            <TableHead className="hidden text-black sm:table-cell dark:text-white">
              Links
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project, index) => {
            return (
              <TableRow
                key={index}
                className="font-lexend border-black dark:border-white"
              >
                <TableCell className="hidden md:table-cell">
                  {project.timeframe}
                </TableCell>
                <TableCell className="w-180 whitespace-pre-wrap">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTriggerShell>
                        <div className="flex w-full items-center justify-between pr-5 hover:underline">
                          <div className="flex flex-col">
                            <h2 className="font-intel text-lg font-semibold text-orange-500 dark:text-orange-400">
                              {project.name}
                            </h2>
                            <span className="font-lexend inline-block">
                              {project.brief}
                            </span>
                          </div>

                          <PlusIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                        </div>
                      </AccordionTriggerShell>
                      <AccordionContent>
                        <div className="font-lexend whitespace-pre-line">
                          {project.description}
                          <div className="flex min-h-[40px] space-x-2 pt-2 sm:hidden">
                            {project.github && (
                              <Button
                                className="group h-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                                title={`Github link for ${project.name}`}
                                aria-label={`Github link button for ${project.name}`}
                                asChild
                              >
                                <Link
                                  href={project.github}
                                  aria-label={`Go to Github repository for ${project.name}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <p>Github</p>

                                  <SiGithub className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                                </Link>
                              </Button>
                            )}

                            {project.website && (
                              <Button
                                className="group h-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                                title={`Link to ${project.name}`}
                                aria-label={`Link button to ${project.name}`}
                                asChild
                              >
                                <Link
                                  href={project.website}
                                  aria-label={`Go to website for ${project.name}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <p>Website</p>
                                  <ExternalLinkIcon className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                                </Link>
                              </Button>
                            )}

                            {project.download && (
                              <Button
                                className="group h-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                                title={`Download link for ${project.name}`}
                                aria-label={`Download link button for ${project.name}`}
                                asChild
                              >
                                <Link
                                  href={project.download}
                                  aria-label={`Go to download page for ${project.name}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <p>Download</p>
                                  <DownloadIcon className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                                </Link>
                              </Button>
                            )}
                          </div>
                          {project.images && (
                            <ImageGallery
                              label={`${project.name} gallery`}
                              images={project.images}
                            />
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TableCell>
                <TableCell className="hidden space-x-2 xl:table-cell">
                  {project.technologies_and_frameworks &&
                    project.technologies_and_frameworks.map(
                      (technologies_and_frameworks: string, index: number) => {
                        return (
                          <span
                            className="rounded-md bg-[#2B382E] p-1 px-2 text-xs font-bold text-lime-200 no-underline hover:no-underline dark:bg-lime-200 dark:text-emerald-950"
                            key={index}
                          >
                            {technologies_and_frameworks}
                          </span>
                        );
                      },
                    )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex min-h-10 space-x-2 pt-2">
                    {project.github ? (
                      <Button
                        size="icon"
                        className="group h-10 w-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                        title={`Github link for ${project.name}`}
                        aria-label={`Github link button for ${project.name}`}
                        asChild
                      >
                        <Link
                          href={project.github}
                          aria-label={`Go to Github repository for ${project.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <SiGithub className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                        </Link>
                      </Button>
                    ) : (
                      <div className="w-10" />
                    )}

                    {project.website ? (
                      <Button
                        size="icon"
                        className="group h-10 w-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                        title={`Link to ${project.name}`}
                        aria-label={`Link button to ${project.name}`}
                        asChild
                      >
                        <Link
                          href={project.website}
                          aria-label={`Go to website for ${project.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLinkIcon className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                        </Link>
                      </Button>
                    ) : (
                      <div className="w-10" />
                    )}

                    {project.download ? (
                      <Button
                        size="icon"
                        className="group h-10 w-10 bg-black hover:cursor-pointer hover:bg-slate-200 dark:bg-white dark:hover:bg-indigo-800"
                        title={`Download link for ${project.name}`}
                        aria-label={`Download link button for ${project.name}`}
                        asChild
                      >
                        <Link
                          href={project.download}
                          aria-label={`Go to download page for ${project.name}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <DownloadIcon className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                        </Link>
                      </Button>
                    ) : (
                      <div className="w-10" />
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
