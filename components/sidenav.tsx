"use client"; // This is a client component
import { useTheme } from 'next-themes';
import { Aleo } from 'next/font/google';

import { Moon, Sun, Mail } from "lucide-react";
import { SiGithub, SiGithubHex, SiLinkedin, SiLinkedinHex, SiPrintables, SiPrintablesHex } from '@icons-pack/react-simple-icons';

import { useState, useEffect} from 'react';

import PacmanEnabledSVGDark, { PacmanEnabledSVGLight } from './SVGs/pacman_enabled';
import PacmanDisabledSVGDark, { PacmanDisabledSVGLight } from './SVGs/pacman_disabled';

import Link from 'next/link';
import NavLinks from '@/components/sidebar/nav-links';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

// Cursor trail
import CustomCursorTrail from '@/components/cursorTrail';
import CustomCursorGif from '@/components/cursorGif';

const aleo = Aleo({subsets:['latin']});

export default function SideNav() {
  const { setTheme } = useTheme()
  const [showCursor, setShowCursor] = useState<boolean | null>(null)

  useEffect(() => {
    const storedValue = localStorage.getItem('showCursor');
    setShowCursor(storedValue !== null ? JSON.parse(storedValue) : true);
  }, []);

  useEffect(() => {
    localStorage.setItem('showCursor', JSON.stringify(showCursor));
  }, [showCursor]);

  return (
    <main className={`${aleo.className} h-full`}>
      { showCursor && (
        <div>
          <CustomCursorTrail />
          <CustomCursorGif />  
        </div>
      ) }

      <div className="flex h-full flex-col md:px-2">
        <div className="px-5 pt-9">
          <h1 className="text-5xl font-bold text-black dark:text-violet-200 hidden md:block">Hi, I&apos;m Joshua</h1><br></br>
          <h2 className="text-2xl font-bold text-black dark:text-violet-300 hidden md:block">Graduate FullStack Developer</h2><br></br>
          <h3 className="text-xl text-black dark:text-slate-200 hidden md:block">I like making stuff.</h3><br></br>
        </div>
        
        <div className="flex-grow px-2">
          <div className="hidden md:block">
            <NavLinks />
          </div>
        </div>
        <div className='bg-[#2563eb] md:bg-transparent sm:rounded-xl w-full px-2 py-6 '>
          <div className="md:hidden flex-col-reverse w-full justify-between">
            <NavLinks />
          </div>

          <div className="flex space-x-5 pl-4 justify-between md:justify-normal"> {/* Socials */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-[2rem] h-[2rem]">
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
                  <p>&nbsp;System</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button onClick={() => setShowCursor(!showCursor)} className="w-8 h-8 hidden lg:flex" aria-label='Toggle button to disable/enable Pacman cursor following feature'>
              <div className="flex relative-center items-center">
                { showCursor && (
                  <div>
                    <PacmanEnabledSVGDark className="w-6 h-6 hidden dark:block" />
                    <PacmanEnabledSVGLight className="w-6 h-6 block dark:hidden" />
                  </div>
                )}
                { !showCursor && (
                  <div>
                    <PacmanDisabledSVGDark className="w-6 h-6 hidden dark:block" />
                    <PacmanDisabledSVGLight className="w-6 h-6 block dark:hidden" />
                  </div>
                )}
              </div>
            </Button>
            <div className="flex space-x-5 pl-4">
              <Link className='pl-5' href="https://www.linkedin.com/in/jchu634/" aria-label="Open link to view Linkedin profile">
                <SiLinkedin className="w-8 h-8 dark:text-white md:text-[#0A66C2] dark:md:text-[#0A66C2]"/>
              </Link>

              <Link href="https://github.com/jchu634" aria-label="Open link to view Github profile">
                <SiGithub className="w-8 h-8 text-black dark:text-white"/> 
              </Link>

              <Link href="mailto:jchu634@keshuac.com" aria-label="Open link to email Joshua">
                <Mail className="w-8 h-8 text-black dark:text-white"/>
              </Link>

              <Link href="https://www.printables.com/@Keshuac_2081737" aria-label="Open link to view Printables profile">
                <SiPrintables className="w-8 h-8" style={{color: SiPrintablesHex}}/>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    </main>
  );
}