"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme == "light" ? "dark" : "light")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      <motion.div
        className="pointer-events-none absolute left-full z-50 ml-2 rounded bg-black px-2 py-1 text-sm whitespace-nowrap text-white shadow-md dark:bg-white dark:text-black"
        initial={{ opacity: 0, x: -10 }}
        animate={{
          opacity: isHovered ? 1 : 0,
          x: isHovered ? 0 : -10,
        }}
        transition={{ duration: 0.2 }}
        suppressHydrationWarning
      >
        Switch to {theme == "dark" ? <>light </> : <>dark </>} theme
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-8 border-transparent border-r-black dark:border-r-white" />
      </motion.div>
    </div>
  );
}
