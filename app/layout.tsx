import type { Metadata } from "next";
import {
  Roboto_Slab,
  DM_Sans,
  Lexend,
  Gabarito,
  Intel_One_Mono,
} from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import SideNav from "@/components/sidenav";
import MobileFooter from "@/components/mobile-footer";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-next-roboto-slab",
});
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-next-dm-sans" });
const lexend = Lexend({ subsets: ["latin"], variable: "--font-next-lexend" });
const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-next-gabarito",
});
const intelOneMono = Intel_One_Mono({
  subsets: ["latin"],
  variable: "--font-next-intel-one-mono",
});

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
    <html
      lang="en"
      className={`${robotoSlab.variable} ${dmSans.variable} ${lexend.variable} ${gabarito.variable} ${intelOneMono.variable}`}
      suppressHydrationWarning
    >
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="dark:bg-background flex min-h-dvh flex-col bg-blue-200 md:h-dvh md:min-h-0 md:flex-row">
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
