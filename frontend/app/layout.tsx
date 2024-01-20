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
          <div className="flex flex-row h-screen">
            <div className="flex flex-row md:flex-row md:overflow-hidden">
              <div className="w-full flex-none md:w-64">
                <SideNav />
              </div>
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
          </div>  
        </ThemeProvider>
        

      </body>
    </html>
  )
}
