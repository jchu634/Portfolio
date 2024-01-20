"use client"; // This is a client component
import Link from 'next/link';
import NavLinks from '@/components/sidebar/nav-links';
import { useTheme } from 'next-themes';

import {
  MoonIcon,
  SunIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithubSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons"
import {
  faEnvelopeSquare
} from "@fortawesome/free-solid-svg-icons"

import { Button } from "@/components/ui/button"

export default function SideNav() {
  const { setTheme } = useTheme()

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <div
        className="mb-2 h-20 flex items-end justify-end rounded-md bg-blue-600 p-4 md:h-40"
      >
        <Link
          href="mailto:jchu634@keshuac.com"
        >
          <Button className="w-12 h-12 bg-blue-600">
            <FontAwesomeIcon icon={faEnvelopeSquare} size="3x"/>
          </Button>
        </Link>
        <Link
          href="https://github.com/jchu634"
        >
          <Button className="w-12 h-12 bg-blue-600">
            <FontAwesomeIcon icon={faGithubSquare} size="3x"/>
          </Button>
        </Link>
        <Link
          href="https://www.linkedin.com/in/jchu634/"
        >
          <Button className="w-12 h-12 bg-blue-600">
            <FontAwesomeIcon icon={faLinkedin} size="3x"/>
          </Button>
        </Link>
      </div>
      
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-black md:block"></div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="flex_outline" className="w-[3rem] h-[3rem]">
              <div className="flex relative-center items-center">
                <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 transition-all dark:-rotate-90 dark:hidden" />
                <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0 hidden dark:block"/>
              </div>
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
              <p>&nbsp;Light</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
              <p>&nbsp;Dark</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              <ComputerDesktopIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all"/>
              <p>&nbsp;System</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
