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
                    <div className="flex h-screen flex-col-reverse dark:bg-slate-900  md:flex-row">
                        <SideNav />
                        <div className="flex-grow overflow-y-auto p-6 pb-48 md:p-12">
                            {children}
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
