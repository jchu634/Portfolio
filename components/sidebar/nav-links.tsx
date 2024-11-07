import { Newspaper, Home, SquareGantt} from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/', icon: Home },
  {
    name: 'Projects', href: '/projects', icon: SquareGantt,},
  { name: 'Blog', href: '/blog', icon: Newspaper },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      <div className="md:space-y-5 pb-6 space-x-2 md:space-x-0 flex md:block">
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                `flex h-[48px] grow items-center justify-center gap-2 rounded-md font-bold md:justify-start md:p-4
                hover:bg-slate-800 hover:text-blue-200 bg-sky-300 md:bg-transparent
                dark:hover:bg-blue-200 dark:hover:text-blue-600 dark:bg-gray-900 dark:md:bg-transparent 
                hover:shadow-big-blue dark:hover:shadow-big-white`,
                {
                  'bg-sky-800 md:bg-sky-200 text-white md:text-blue-600 dark:text-emerald-600 dark:bg-cyan-200 dark:md:bg-blue-950 dark:md:text-blue-400': pathname === link.href,
                }
              )}
            >
              <LinkIcon className="w-6" />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
