"use client"; // This is a client component
import { ModeToggle } from "@/components/ui/mode-toggle";
import { MailIcon, CodeIcon, NotebookTextIcon } from "lucide-react";
import { LabelButton } from "@/components/ui/label-button";
import { useState, useEffect } from "react";

// Cursor trail
import { PacmanDisabledSVGLight, PacmanEnabledSVGLight } from "./cursor/svg";
import CursorTrailWithGif from "@/components/cursor/cursorTrail";

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
    <main className="hidden h-full w-15 flex-col justify-between bg-[#122c23] p-2 md:flex">
      <div className="flex flex-col items-center gap-y-2">
        <LabelButton
          href="/"
          ariaLabel="Open link to go to homepage"
          label="Home"
          variant="nohover"
          className="bg-transparent text-white"
        >
          <Image
            src="/bigfavicon.png"
            alt="Profile Picture"
            width={50}
            height={50}
          />
        </LabelButton>
        <LabelButton
          href="/projects"
          ariaLabel="Open link to go to projects page"
          label="Projects"
          variant="nohover"
          className="border-2 border-white bg-transparent text-white"
          size="icon"
        >
          <CodeIcon className="size-5" />
        </LabelButton>
        <LabelButton
          href="/blog"
          ariaLabel="Open link to go to blog page"
          label="Blog"
          variant="nohover"
          className="border-2 border-white bg-transparent text-white"
          size="icon"
        >
          <NotebookTextIcon className="size-5" />
        </LabelButton>
        {showCursor && (
          <div>
            <CursorTrailWithGif />
          </div>
        )}
      </div>
      <div className="flex flex-col flex-wrap items-center gap-y-2">
        <LabelButton
          label="Toggle Cursor trail"
          variant="nohover"
          className="bg-transparent text-white"
          onClick={() => setShowCursor(!showCursor)}
        >
          <div className="relative-center hidden items-center lg:flex">
            {showCursor && (
              <div>
                <PacmanEnabledSVGLight className="block h-6 w-6" />
              </div>
            )}
            {!showCursor && (
              <div>
                <PacmanDisabledSVGLight className="block h-6 w-6" />
              </div>
            )}
          </div>
        </LabelButton>

        <LabelButton
          href="https://www.linkedin.com/in/jchu634/"
          ariaLabel="Open link to view Linkedin profile"
          label="LinkedIn"
          variant="nohover"
          extLink={true}
          className="bg-transparent text-white"
        >
          <Image
            src="/LinkedIn-White.png"
            alt="linkedIn Profile Link"
            width={50}
            height={50}
            className="flex"
          />
        </LabelButton>

        <LabelButton
          href="https://github.com/jchu634"
          ariaLabel="Open link to view Github profile"
          label="GitHub"
          variant="nohover"
          extLink={true}
          className="bg-transparent text-white"
        >
          <SiGithub className="size-8 text-white" />
        </LabelButton>

        <LabelButton
          href="https://www.printables.com/@Keshuac_2081737"
          ariaLabel="Open link to view Printables profile"
          label="Printables"
          variant="nohover"
          extLink={true}
          className="bg-transparent text-white"
        >
          <SiPrintables className="size-8" style={{ color: SiPrintablesHex }} />
        </LabelButton>

        <LabelButton
          href="mailto:jchu634@keshuac.com"
          ariaLabel="Open link to email Joshua"
          label="Email Me"
          variant="nohover"
          extLink={true}
          className="bg-transparent text-white"
        >
          <MailIcon className="size-8 text-white" />
        </LabelButton>

        <div className="mt-2">
          <ModeToggle />
        </div>
      </div>
    </main>
  );
}
