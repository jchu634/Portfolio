import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import SideNav from "@/components/sidenav";
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
          <div className="flex h-screen flex-col-reverse md:flex-row dark:bg-slate-900">
            <SideNav />
            <div className="flex-grow overflow-y-auto">{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
