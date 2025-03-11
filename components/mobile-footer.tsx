import { MailIcon, NotepadTextIcon, SquarePenIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import { SiGithub } from "@icons-pack/react-simple-icons";
import Link from "next/link";
import Image from "next/image";

export default function MobileFooter() {
  return (
    <main className="absolute bottom-0 flex h-20 w-full justify-between bg-black p-2 px-4 md:hidden dark:bg-white">
      <div className="flex flex-row items-center gap-x-2">
        <Button variant="nohover" size="icon" asChild>
          <Link href="/">
            <Image
              src="/bigFavicon.png"
              alt="linkedIn Profile Link"
              width={50}
              height={50}
            />
          </Link>
        </Button>
        <Button variant="nohover" className="bg-white" size="icon" asChild>
          <Link href="/projects">
            <NotepadTextIcon className="size-10 text-black" />
          </Link>
        </Button>
        <Button variant="nohover" className="bg-white" size="icon" asChild>
          <Link href="/blog">
            <SquarePenIcon className="size-10 text-black" />
          </Link>
        </Button>
      </div>
      <div className="flex flex-row items-center gap-x-6">
        <Button variant="nohover" size="icon" asChild>
          <Link href="https://www.linkedin.com/in/jchu634/">
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
          <Link href="https://github.com/jchu634">
            <SiGithub className="size-12 text-white dark:text-black" />
          </Link>
        </Button>
        <Button variant="nohover" size="icon" asChild>
          <Link href="mailto:jchu634@keshuac.com">
            <MailIcon className="size-12 text-white dark:text-black" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
