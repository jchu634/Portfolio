import type { Metadata} from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import SideNav from '../components/sidenav';'@/app/ui/dashboard/sidenav.css';
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'JCHU634 Portfolio',
  description: 'JCHU634 Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col-reverse md:flex-row h-screen dark:bg-slate-900">
            <div className="w-full sm:w-[20rem] lg:w-[25rem] fixed bottom-0 z-10 md:relative flex-shrink-0">
              <SideNav />
            </div>
            <div className="p-6 pb-48 overflow-y-auto md:p-12 flex-grow">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
