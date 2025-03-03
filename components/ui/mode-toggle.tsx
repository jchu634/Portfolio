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
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>

            <motion.div
                className="absolute left-full ml-2 px-2 py-1 bg-black dark:bg-white text-white dark:text-black rounded text-sm whitespace-nowrap shadow-md z-50 pointer-events-none"
                initial={{ opacity: 0, x: -10 }}
                animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 0 : -10,
                }}
                transition={{ duration: 0.2 }}
            >
                Switch to {theme == "dark" ? <>light </> : <>dark </>} theme
                <div className="absolute top-1/2 -left-2 -translate-y-1/2 border-8 border-transparent border-r-black dark:border-r-white" />
            </motion.div>
        </div>
    );
}
