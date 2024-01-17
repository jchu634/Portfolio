"use client"; // This is a client component
import Link from 'next/link';
import NavLinks from '@/components/sidebar/nav-links';
import { useState, useEffect } from 'react';

import {
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline';

export default function SideNav() {
  const [isDark, setIsDark] = useState(false);

  function toggleDarkMode() {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else if (!('theme' in localStorage)) { // The user hasn't set a theme yet
      if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
        setIsDark(false);
      } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
        setIsDark(true);
      }
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  }

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          {/* <AcmeLogo /> */}
        </div>
      </Link>
      
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 dark:bg-black md:block"></div>
        <button
          className='btn justify-between dark:text-neutral-100 bg-gray-50 dark:bg-zinc-950 dark:hover:bg:bg-neutral-700 dark:hover:shadow-big-white dark:hover:text-blue-600 hover:text-blue-600'
          type="button"
          onClick={() => {
            toggleDarkMode();
          }}
        >
          { isDark ? 
            <div className="flex items-center">
              <MoonIcon className="h-6 w-6 mr-2" />
              <p> Dark Theme</p>
            </div> : 
            <div className="flex items-center">
              <SunIcon className="h-6 w-6 mr-2" />
              <p> Light Theme</p>
            </div>
          }
        </button>
      </div>
    </div>
  );
}
