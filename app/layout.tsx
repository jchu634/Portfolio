import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import SideNav from "../components/sidenav";
("@/app/ui/dashboard/sidenav.css");
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JCHU634 Portfolio",
  description: "JCHU634 Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
          <div className="flex h-screen flex-col-reverse dark:bg-slate-900 md:flex-row">
            <div className="fixed bottom-0 z-20 w-full flex-shrink-0 sm:w-[20rem] md:relative lg:w-[25rem]">
              <SideNav />
            </div>
            <div className="flex-grow overflow-y-auto p-6 pb-48 md:p-12">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
