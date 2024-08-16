"use client"; // This is a client component
import Link from 'next/link';
import NavLinks from '@/components/sidebar/nav-links';
import { useTheme } from 'next-themes';
import { Aleo } from 'next/font/google';

import { Moon, Sun, Mail } from "lucide-react";
import { SiGithub, SiGithubHex, SiLinkedin, SiLinkedinHex, SiPrintables, SiPrintablesHex } from '@icons-pack/react-simple-icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

const aleo = Aleo({subsets:['latin']});

export default function SideNav() {
  const { setTheme } = useTheme()
  

  return (
    <main className={aleo.className}>
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        {/* <div className="mb-2 h-20 flex items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"></div> */}

        <div className= "px-5 pt-5">
          <h1 className="text-5xl font-bold text-black dark:text-violet-200">Hi, I&apos;m Joshua</h1><br></br>
          <h2 className="text-2xl font-bold text-black dark:text-violet-300">Graduate FullStack Developer</h2><br></br>
          <h3 className="text-xl text-black dark:text-slate-200">I like making stuff.</h3><br></br>
        </div>
        {/* <ul className="pl-5 text-xl text-black dark:text-slate-200 whitespace-pre-wrap list-disc">

          <li>
            Final year Computer Science Student at the University of Auckland.<br />
          </li>
          <li>
            FullStack Developer who prefers backend development
          </li>
        </ul><br/> */}
        
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />

          <div className="hidden h-auto w-full grow rounded-md bg-transparent md:block space-y-10"></div>
          
            <div className="flex space-x-5 pl-2 pb-5 align-middle"> {/* Socials */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-[3rem] h-[3rem]">
                    <div className="flex relative-center items-center">
                      <Sun className="h-[1.5rem] w-[1.5rem] stroke-2 rotate-0 transition-all dark:-rotate-90 text-zinc-200 dark:hidden" />
                      <Moon className="h-[1.2rem] w-[1.2rem] stroke-2 rotate-90 transition-all dark:rotate-0 hidden dark:block"/>
                    </div>
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    <p>&nbsp;Light</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <p>&nbsp;Dark</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    {/* <ComputerDesktopIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/> */}
                    <p>&nbsp;System</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="mailto:jchu634@keshuac.com" className='pl-5'>
                <Mail className="w-12 h-12 text-white"/>
              </Link>
              
              <Link href="https://www.linkedin.com/in/jchu634/">
                <SiLinkedin className="w-12 h-12" style={{color:SiLinkedinHex}}/>
              </Link>
              
              <Link href="https://github.com/jchu634">
                <SiGithub className="w-12 h-12 text-white"/> 
              </Link>

              <Link href="https://www.printables.com/@Keshuac_2081737">
                <SiPrintables className="w-12 h-12" style={{color: SiPrintablesHex}}/>
              </Link>
            </div>
        </div>
      </div>
    </main>
  );
}
