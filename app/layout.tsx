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
          <div className="flex flex-col-reverse md:flex-row h-screen dark:bg-slate-900">
            <div className="md:w-40% fixed bottom-0 z-10 md:relative">
                <SideNav />
            </div>
            <div className="flex-grow p-6 pb-48 overflow-y-auto md:p-12">{children}</div>
          </div>
        </ThemeProvider>
        

      </body>
    </html>
  )
}
