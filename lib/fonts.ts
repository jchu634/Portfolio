import { Roboto_Slab, DM_Sans, Lexend, Gabarito } from "next/font/google";
import localFont from "next/font/local";

export const roboto_slab = Roboto_Slab({ subsets: ["latin"] });
export const dm_sans = DM_Sans({ subsets: ["latin"] });
export const lexend = Lexend({ subsets: ["latin"] });
export const gabarito = Gabarito({ subsets: ["latin"] });
export const intel_one_mono = localFont({
    src: [
        {
            path: "../public/fonts/IntelOneMono-Bold.woff2",
            weight: "700",
            style: "normal",
        },
        {
            path: "../public/fonts/IntelOneMono-BoldItalic.woff2",
            weight: "700",
            style: "italic",
        },
        {
            path: "../public/fonts/IntelOneMono-Medium.woff2",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/IntelOneMono-MediumItalic.woff2",
            weight: "500",
            style: "italic",
        },
        {
            path: "../public/fonts/IntelOneMono-Regular.woff2",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/IntelOneMono-Italic.woff2",
            weight: "400",
            style: "italic",
        },
        {
            path: "../public/fonts/IntelOneMono-Light.woff2",
            weight: "300",
            style: "normal",
        },
        {
            path: "../public/fonts/IntelOneMono-LightItalic.woff2",
            weight: "300",
            style: "italic",
        },
    ],
    variable: "--font-mono",
    display: "swap",
});
