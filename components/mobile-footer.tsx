import { MailIcon, CodeIcon, NotebookTextIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import Image from "next/image";

export default function MobileFooter() {
  return (
    <main className="fixed bottom-0 flex h-15 w-full justify-between bg-[#122c23] p-2 px-4 md:hidden dark:bg-white">
      <div className="flex flex-row items-center gap-x-2">
        <Button variant="nohover" size="icon" asChild>
          <Link href="/">
            <Image
              src="/bigfavicon.png"
              alt="Profile Picture"
              width={50}
              height={50}
            />
          </Link>
        </Button>
        <Button
          variant="nohover"
          className="bg-transparent"
          size="icon"
          asChild
        >
          <Link href="/projects">
            <CodeIcon className="size-8 text-white dark:text-black" />
          </Link>
        </Button>
        <Button
          variant="nohover"
          className="bg-transparent"
          size="icon"
          asChild
        >
          <Link href="/blog">
            <NotebookTextIcon className="size-8 text-white dark:text-black" />
          </Link>
        </Button>
      </div>
      <div className="flex flex-row items-center gap-x-2">
        <Button variant="nohover" size="icon" asChild>
          <Link
            href="https://www.linkedin.com/in/jchu634/"
            target="_blank"
            rel="noopener noreferrer"
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
          </Link>
        </Button>

        <Button variant="nohover" size="icon" asChild>
          <Link
            href="https://github.com/jchu634"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub className="size-8 text-white dark:text-black" />
          </Link>
        </Button>
        <Button variant="nohover" size="icon" asChild>
          <Link
            href="mailto:jchu634@keshuac.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MailIcon className="size-8 text-white dark:text-black" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
