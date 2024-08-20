"use client"; // This is a client component
import { useTheme } from 'next-themes';
import { Aleo } from 'next/font/google';

import { Moon, Sun, Mail } from "lucide-react";
import { SiGithub, SiGithubHex, SiLinkedin, SiLinkedinHex, SiPrintables, SiPrintablesHex } from '@icons-pack/react-simple-icons';

import { useState} from 'react';

import PacmanEnabledSVG from './SVGs/pacman_enabled';
import PacmanDisabledSVG from './SVGs/pacman_disabled';

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
  const [showCursor, setShowCursor] = useState(true);
  
  return (
    <main className={`${aleo.className} h-screen`}>
      { showCursor && (
        <div>
          <CustomCursorTrail />
          <CustomCursorGif />  
        </div>
      ) }

      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <div className="px-5 pt-5">
          <h1 className="text-5xl font-bold text-black dark:text-violet-200">Hi, I&apos;m Joshua</h1><br></br>
          <h2 className="text-2xl font-bold text-black dark:text-violet-300">Graduate FullStack Developer</h2><br></br>
          <h3 className="text-xl text-black dark:text-slate-200">I like making stuff.</h3><br></br>
        </div>
        
        <div className="flex-grow px-2">
          <NavLinks />
        </div>

        <div className="flex space-x-5 pl-2 pb-5 align-middle"> {/* Socials */}
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

          <Button onClick={() => setShowCursor(!showCursor)} className="w-8 h-8">
            <div className="flex relative-center items-center">
              { showCursor && (
                <PacmanEnabledSVG className="w-6 h-6" />
              )}
              { !showCursor && (
                <PacmanDisabledSVG className="w-6 h-6" />
              )}
            </div>
          </Button>
    
          <Link href="mailto:jchu634@keshuac.com" className='pl-5'>
            <Mail className="w-8 h-8 text-white"/>
          </Link>
          
          <Link href="https://www.linkedin.com/in/jchu634/">
            <SiLinkedin className="w-8 h-8" style={{color:SiLinkedinHex}}/>
          </Link>
          
          <Link href="https://github.com/jchu634">
            <SiGithub className="w-8 h-8 text-white"/> 
          </Link>

          <Link href="https://www.printables.com/@Keshuac_2081737">
            <SiPrintables className="w-8 h-8" style={{color: SiPrintablesHex}}/>
          </Link>
        </div>
      </div>
    </main>
  );
}