"use client"; // This is a client component
import { ModeToggle } from "@/components/ui/mode-toggle";
import { MailIcon, NotepadTextIcon, SquarePenIcon } from "lucide-react";
import { LabelButton } from "@/components/ui/label-button";
import { useState, useEffect } from "react";

// Cursor trail
import {
  PacmanDisabledSVGDark,
  PacmanDisabledSVGLight,
  PacmanEnabledSVGDark,
  PacmanEnabledSVGLight,
} from "./cursor/svg";
import CustomCursorTrail from "@/components/cursor/cursorTrail";
import CustomCursorGif from "@/components/cursor/cursorGif";

import {
  SiGithub,
  SiPrintables,
  SiPrintablesHex,
} from "@icons-pack/react-simple-icons";
import Image from "next/image";

export default function SideNav() {
  const [showCursor, setShowCursor] = useState<boolean | null>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem("showCursor");
    setShowCursor(storedValue !== null ? JSON.parse(storedValue) : true);
  }, []);

  useEffect(() => {
    localStorage.setItem("showCursor", JSON.stringify(showCursor));
  }, [showCursor]);

  return (
    <main className="hidden h-full w-15 flex-col justify-between bg-[#122c23] p-2 md:flex dark:bg-white">
      <div className="flex flex-col items-center gap-y-2">
        <LabelButton
          href="/"
          ariaLabel="Open link to go to homepage"
          label="Home"
          variant="nohover"
          className="bg-transparent"
        >
          <Image
            src="/bigFavicon.png"
            alt="Profile Picture"
            unoptimized={true}
            width={50}
            height={50}
          />
        </LabelButton>
        <LabelButton
          href="/projects"
          ariaLabel="Open link to go to projects page"
          label="Projects"
          variant="nohover"
          className="border-2 border-white bg-transparent dark:border-black"
          size="icon"
        >
          <NotepadTextIcon className="size-5" />
        </LabelButton>
        <LabelButton
          href="/blog"
          ariaLabel="Open link to go to blog page"
          label="Blog"
          variant="nohover"
          className="border-2 border-white bg-transparent dark:border-black"
          size="icon"
        >
          <SquarePenIcon className="size-5" />
        </LabelButton>
        {showCursor && (
          <div>
            <CustomCursorTrail />
            <CustomCursorGif />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <LabelButton
          label="Toggle Cursor trail"
          variant="nohover"
          className="bg-transparent"
          onClick={() => setShowCursor(!showCursor)}
        >
          <div className="relative-center flex items-center">
            {showCursor && (
              <div>
                <PacmanEnabledSVGDark className="hidden h-6 w-6 dark:block" />
                <PacmanEnabledSVGLight className="block h-6 w-6 dark:hidden" />
              </div>
            )}
            {!showCursor && (
              <div>
                <PacmanDisabledSVGDark className="hidden h-6 w-6 dark:block" />
                <PacmanDisabledSVGLight className="block h-6 w-6 dark:hidden" />
              </div>
            )}
          </div>
        </LabelButton>

        <LabelButton
          href="https://www.linkedin.com/in/jchu634/"
          ariaLabel="Open link to view Linkedin profile"
          label="LinkedIn"
          variant="nohover"
          className="bg-transparent"
        >
          <Image
            src="/LinkedIn-Black.png"
            alt="linkedIn Profile Link"
            width={50}
            height={50}
            className="hidden dark:flex"
          />
          <Image
            src="/LinkedIn-White.png"
            alt="linkedIn Profile Link"
            width={50}
            height={50}
            className="flex dark:hidden"
          />
        </LabelButton>

        <LabelButton
          href="https://github.com/jchu634"
          ariaLabel="Open link to view Github profile"
          label="GitHub"
          variant="nohover"
          className="bg-transparent"
        >
          <SiGithub className="size-8 text-white dark:text-black" />
        </LabelButton>

        <LabelButton
          href="https://www.printables.com/@Keshuac_2081737"
          ariaLabel="Open link to view Printables profile"
          label="Printables"
          variant="nohover"
          className="bg-transparent"
        >
          <SiPrintables className="size-8" style={{ color: SiPrintablesHex }} />
        </LabelButton>

        <LabelButton
          href="mailto:jchu634@keshuac.com"
          ariaLabel="Open link to email Joshua"
          label="Email Me"
          variant="nohover"
          className="bg-transparent"
        >
          <MailIcon className="size-8 text-white dark:text-black" />
        </LabelButton>

        <div className="mt-2">
          <ModeToggle />
        </div>
      </div>
    </main>
  );
}
