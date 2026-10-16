import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import SideNav from "@/components/sidenav";
import MobileFooter from "@/components/mobile-footer";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JCHU634 Portfolio",
  description: "JCHU634 Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-dvh flex-col bg-blue-200 md:h-dvh md:min-h-0 md:flex-row dark:bg-slate-950">
            <SideNav />
            <div className="min-w-0 flex-1 pb-15 md:overflow-y-auto md:pb-0">
              {children}
              <Analytics />
            </div>
          </div>
          <MobileFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
