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
import { cn } from "@/lib/utils";
import { ExternalLinkIcon, DownloadIcon, PlusIcon } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselCenteredContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { intel_one_mono, lexend } from "@/lib/fonts";
import { projects } from "@/lib/projectData";

export default function Page() {
  return (
    <main className="p-10">
      <h1 className="pb-10 text-5xl font-bold text-blue-900 dark:text-slate-200">
        Projects
      </h1>
      <Table>
        <TableCaption>A list of projects I have done.</TableCaption>
        <TableHeader>
          <TableRow
            className={cn("border-black dark:border-white", lexend.className)}
          >
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
                className={cn(
                  "border-black dark:border-white",
                  lexend.className,
                )}
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
                            <h2
                              className={cn(
                                "text-lg font-semibold text-orange-500 dark:text-orange-400",
                                intel_one_mono.className,
                              )}
                            >
                              {project.name}
                            </h2>
                            <span
                              className={cn("inline-block", lexend.className)}
                            >
                              {project.brief}
                            </span>
                          </div>

                          <PlusIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
                        </div>
                      </AccordionTriggerShell>
                      <AccordionContent>
                        <div
                          className={cn(
                            "whitespace-pre-line",
                            lexend.className,
                          )}
                        >
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
                                >
                                  <p>Download</p>
                                  <DownloadIcon className="h-8 w-8 text-white group-hover:text-zinc-700 dark:text-black group-hover:dark:text-zinc-200" />
                                </Link>
                              </Button>
                            )}
                          </div>
                          <div className="hidden justify-center sm:flex md:w-full">
                            {project.images && (
                              <Dialog>
                                <Carousel
                                  className="relative max-h-fit w-4/5 px-8 sm:max-w-fit xl:max-w-fit"
                                  opts={{
                                    align: "start",
                                    loop: true,
                                  }}
                                >
                                  <CarouselContent>
                                    {project.images.map(
                                      (image, index: number) => {
                                        return (
                                          <DialogTrigger asChild key={index}>
                                            <CarouselItem className="p-4 hover:cursor-pointer">
                                              <Card className="dark:bg-opacity-40">
                                                <CardContent className="flex items-center justify-center">
                                                  <Image
                                                    alt="Project Image"
                                                    className="max-h-[300px] object-scale-down"
                                                    src={image}
                                                    width={400}
                                                    height={400}
                                                    layout="responsive"
                                                    objectFit="contain"
                                                  />
                                                </CardContent>
                                              </Card>
                                            </CarouselItem>
                                          </DialogTrigger>
                                        );
                                      },
                                    )}
                                  </CarouselContent>
                                  {project.images.length > 2 && (
                                    <>
                                      <CarouselPrevious className="bg-slate-500 text-white dark:bg-slate-50 dark:text-black" />
                                      <CarouselNext className="bg-slate-500 text-white dark:bg-slate-50 dark:text-black" />
                                    </>
                                  )}
                                </Carousel>

                                <DialogContent className="h-[90%] min-w-4/5">
                                  <DialogHeader>
                                    <DialogTitle>
                                      {project.name} Gallery
                                    </DialogTitle>
                                    <DialogDescription>
                                      Image Gallery for {project.name}
                                    </DialogDescription>
                                    <div className="flex h-full w-4/5 items-center justify-center md:w-full">
                                      <Carousel
                                        className="relative flex h-full w-4/5 items-center px-8"
                                        opts={{
                                          align: "start",
                                          loop: true,
                                        }}
                                      >
                                        <CarouselCenteredContent className="h-full">
                                          {project.images.map(
                                            (image, index: number) => {
                                              return (
                                                <CarouselItem
                                                  className="flex h-full w-full items-center p-4"
                                                  key={index}
                                                >
                                                  <Card className="dark:bg-opacity-40 h-fit w-full">
                                                    <CardContent className="flex h-full items-center justify-center">
                                                      <Image
                                                        alt="Project Image"
                                                        className="max-h-[500px] object-contain lg:max-h-[700px]"
                                                        src={image}
                                                        width={600}
                                                        height={600}
                                                        layout="responsive"
                                                        objectFit="contain"
                                                      />
                                                    </CardContent>
                                                  </Card>
                                                </CarouselItem>
                                              );
                                            },
                                          )}
                                        </CarouselCenteredContent>
                                        {project.images.length > 2 && (
                                          <>
                                            <CarouselPrevious className="bg-slate-500 text-white dark:bg-slate-50 dark:text-black" />
                                            <CarouselNext className="bg-slate-500 text-white dark:bg-slate-50 dark:text-black" />
                                          </>
                                        )}
                                      </Carousel>
                                    </div>
                                  </DialogHeader>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
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
                            className="rounded-md bg-[#2B382E] p-1 px-2 text-xs font-bold text-lime-200 no-underline hover:no-underline dark:bg-emerald-950"
                            key={index}
                          >
                            {technologies_and_frameworks}
                          </span>
                        );
                      },
                    )}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex min-h-[40px] space-x-2 pt-2">
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
