import type { Metadata} from 'next'
import Link from 'next/link';
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
      {
      }
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col-reverse md:flex-row h-screen">
            <div className="w-full md:w-64 fixed bottom-0 z-10 bg-gray-50 dark:bg-black md:relative">
                <SideNav />
            </div>
            <div className="flex-grow p-6 pb-48 overflow-y-auto md:p-12">{children}</div>
          </div>
        </ThemeProvider>
        

      </body>
    </html>
  )
}
