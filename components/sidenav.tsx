"use client"; // This is a client component
import { ModeToggle } from "@/components/ui/mode-toggle";
import { MailIcon, NotepadTextIcon } from "lucide-react";
import { LabelButton } from "@/components/ui/label-button";

import {
  SiGithub,
  SiPrintables,
  SiPrintablesHex,
} from "@icons-pack/react-simple-icons";
import Image from "next/image";

export default function SideNav() {
  return (
    <main className="flex h-full w-15 flex-col justify-between bg-black p-2 dark:bg-white">
      <div className="flex flex-col items-center gap-y-2">
        <LabelButton
          href="/"
          ariaLabel="Open link to go back to homepage"
          label="Home"
          variant="nohover"
        >
          <Image
            src="/bigFavicon.png"
            alt="linkedIn Profile Link"
            width={50}
            height={50}
          />
        </LabelButton>
        <LabelButton
          href="./projects"
          ariaLabel="Open link to view Printables profile"
          label="Projects"
          variant="nohover"
          className="border-2 border-black"
          size="icon"
        >
          <NotepadTextIcon className="size-5" />
        </LabelButton>
      </div>
      <div className="flex flex-col items-center gap-y-2">
        <LabelButton
          href="https://www.linkedin.com/in/jchu634/"
          ariaLabel="Open link to view Linkedin profile"
          label="LinkedIn"
          variant="nohover"
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
        >
          <SiGithub className="size-8 text-white dark:text-black" />
        </LabelButton>

        <LabelButton
          href="https://www.printables.com/@Keshuac_2081737"
          ariaLabel="Open link to view Printables profile"
          label="Printables"
          variant="nohover"
        >
          <SiPrintables className="size-8" style={{ color: SiPrintablesHex }} />
        </LabelButton>

        <LabelButton
          href="mailto:jchu634@keshuac.com"
          ariaLabel="Open link to email Joshua"
          label="Email Me"
          variant="nohover"
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
