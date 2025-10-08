interface ProjectTypes {
  name: string;
  type: string[];
  timeframe: string;
  technologies_and_frameworks: string[];
  github?: string;
  website?: string;
  download?: string;
  cert?: string; // Field only used for Ryzen AI Subtitles
  brief: string;
  description: string;
  images?: string[];
}

export const projects: ProjectTypes[] = [
  {
    name: "HA-Components",
    type: ["Application"],
    timeframe: "2025-Ongoing",
    technologies_and_frameworks: [
      "NextJS",
      "TailwindCSS",
      "react",
      "Home Assistant",
    ],
    github: "https://github.com/jchu634/ha-components",
    website: "https://hacomponents.keshuac.com/",
    brief: "Component Framework for building custom Home Assistant Dashboards.",
    description: `HAComponents is a component framework inspired by ShadCN/ui.
    It allows a user to freely style and create components which integrate into Home Assistant.
    `,
    images: [
      "/projects/hacomponents/homepage_dark.png",
      "/projects/hacomponents/homepage_light.png",
      "/projects/hacomponents/components_light.png",
    ],
  },
  {
    name: "OPFS Browser",
    type: ["Application"],
    timeframe: "2025-Ongoing",
    technologies_and_frameworks: ["Vite", "TailwindCSS", "Firefox Addons"],
    github: "https://github.com/jchu634/opfs-browser",
    website: "https://addons.mozilla.org/en-US/firefox/addon/opfs-browser/",
    brief: "Web Browser Extension for viewing the OPFS in the Devtools.",
    description: `OPFS Browser is a Firefox addon created so that I could have a way to easily debug Origin Private File System (OPFS) issues.
    This was directly created in response to frustrations in debugging Inkproof on Firefox as there was no extension to do so unlike on Chrome.
    `,
    images: ["/projects/opfs-browser/opfs-browser-screenshot.png"],
  },
  {
    name: "Subtext",
    type: ["Application"],
    timeframe: "2024-Ongoing",
    technologies_and_frameworks: [
      "Astro",
      "Next.JS",
      "TailwindCSS",
      "InnoSetup",
      "Python",
      "PyWebView",
      "Whisper",
    ],
    github: "https://github.com/jchu634/subtext-app",
    website: "https://subtextapp.cc/",
    brief: "A Local AI Subtitling app.",
    description:
      "Subtext is an easy to use subtitling app, which allows an user to utilise AI models to generate subtitles entirely on device.",
    images: [
      "/projects/subtextapp/ScreenshotDark.png",
      "/projects/subtextapp/ScreenshotLight.png",
      "/projects/subtextapp/SiteLight.png",
      "/projects/subtextapp/SiteDark.png",
    ],
  },
  {
    name: "Portfolio Website",
    type: ["Website"],
    timeframe: "2023-Ongoing",
    technologies_and_frameworks: ["Next.JS", "TailwindCSS"],
    github: "https://github.com/jchu634/portfolio",
    website: "/",
    brief: "This very website! 😊",
    description:
      "This very website you are on right now! This website is built using Next.JS and TailwindCSS.",
    images: [
      "/projects/portfolio/mobile_dark.png",
      "/projects/portfolio/mobile_light.png",
      "/projects/portfolio/blog_dark.png",
      "/projects/portfolio/blog_light.png",
      "/projects/portfolio/home_dark.png",
      "/projects/portfolio/home_light.png",
      "/projects/portfolio/projects_dark.png",
      "/projects/portfolio/projects_light.png",
    ],
  },
  {
    name: "Typing-Automation-Tools",
    type: ["Application"],
    timeframe: "2025",
    technologies_and_frameworks: ["C++", "Win32"],
    github: "https://github.com/jchu634/Typing-Automation-Tools",
    download:
      "https://github.com/jchu634/Typing-Automation-Tools/releases/latest",
    brief: "Useful Typing Windows Tools",
    description: `Two tools that I made for debugging before polishing up for release
    - type-at-wpm: A tool that types text you give it at a given WPM.
    - type-clipboard: A Windows tray application that types out text in the clipboard.
      (Really useful to send text into a Proxmox noVNC terminal.)
    `,
  },
  {
    name: "Inkproof",
    type: ["Website"],
    timeframe: "2025",
    technologies_and_frameworks: ["Next.JS", "TailwindCSS", "TypeScript"],
    github: "https://github.com/jchu634/Inkproof",
    website: "https://inkproof.keshuac.com",
    brief: "A modern ePUB Editor",
    description: `Inkproof is an pet project that I really wanted to exist.
      It is also my entry to the Bolt.new 2025 Hackathon.      
      The project is primarily designed for client-side use, heavily utilising the Origin Private File System (OPFS).`,
    images: [
      "/projects/inkproof/inkproof_editor_dark.png",
      "/projects/inkproof/inkproof_editor_light.png",
    ],
  },
  {
    name: "Ryzen AI Subtitles",
    type: ["Application"],
    timeframe: "2024",
    technologies_and_frameworks: [
      "Next.JS",
      "TailwindCSS",
      "Python",
      "Ryzen AI Software",
      "PyWebView",
      "Whisper",
    ],
    github: "https://github.com/jchu634/SubtitleProject",
    website: "https://www.hackster.io/jchu634/ryzen-ai-subtitling-5ead7f",
    brief: "Real-Time Captions using the Ryzen AI NPU",
    description:
      "A Submission for the AMD Pervasive AI Developer Challenge.\nAn subtitling program which uses Whisper on a Ryzen AI NPU to generate real-time subtitles for an audio source.",
    images: [
      "/projects/ryzensubtitles/Certificates for the Winning Team.jpg",
      "/projects/ryzensubtitles/simple_light.png",
      "/projects/ryzensubtitles/simple_dark.png",
      "/projects/ryzensubtitles/complex_light.png",
      "/projects/ryzensubtitles/complex_dark.png",
    ],
    cert: "https://utfs.io/f/NQ2gjwtsCGtKCqzKLe2jLhGCvurfiFms5UkNDxORWnd0pSE1",
  },
  {
    name: "CodeCritters",
    timeframe: "2023",
    type: ["Application", "Website"],
    technologies_and_frameworks: [
      "Python",
      "PyInstaller",
      "InnoSetup",
      "FastAPI",
      "TensorFlow",
      "PyTorch",
      "PyWebView",
    ],
    brief: "A Application/Website for Insect identification using ML",
    description:
      "CodeCritters is an website and local application which uses Machine Learning to predict what an image submitted by an user contains based on the model chosen.\n" +
      "The frontend is built using React and integrates with Firebase Authentication and Databases.\n" +
      "The backend is an RestFul API built using FastAPI.\n" +
      "The local app bundles the website and backend using PyWebView, compiles it via PyInstaller and finally bundles it using InnoSetup.",

    github:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters",
    website: "https://codecritters.live/",
    download:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters/releases/tag/v1.2.4",
    images: [
      "/projects/codecritters/codecritters_light.png",
      "/projects/codecritters/codecritters_dark.png",
      "/projects/codecritters/codecritters_upload_light.png",
      "/projects/codecritters/codecritters_upload_dark.png",
      "/projects/codecritters/codecritters_predictions_light.png",
      "/projects/codecritters/codecritters_predictions_dark.png",
      "/projects/codecritters/codecritters_predictions_about_light.png",
      "/projects/codecritters/codecritters_predictions_about_dark.png",
    ],
  },
  {
    name: "CodeCritters Flutter App",
    timeframe: "2023",
    type: ["Application"],
    technologies_and_frameworks: ["Flutter", "Dart", "Tensorflow"],
    brief: "A Android Application for Insect identification using ML",
    description:
      "This is an sister android camera application for CodeCritters which allows users to take photos and get inference results via a local TensorFlowLite model.\n" +
      "This app is fully functional, and although it was never publicly visible on the Google Play Store, it is still available for download via Github releases.",
    github:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters-flutterapp",
    download:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters-flutterapp/releases/tag/v1.0.0",
    images: [
      "/projects/codecrittersapp/codecrittersapp.jpg",
      "/projects/codecrittersapp/codecrittersapp_prediction.png",
    ],
  },
  {
    name: "Shorts Redirector",
    type: ["Application"],
    timeframe: "2023",
    technologies_and_frameworks: ["HTML", "CSS", "VanillaJS"],
    brief: "Chrome Extension for Redirecting YouTube Shorts",
    description:
      "A Chrome Extension which automatically redirects YouTube Shorts from the Shorts player to the General YouTube player.\n" +
      "This was never published to the Chrome Web Store as I found there existed an already published extension which did the same thing after I finished this.",
    github: "https://github.com/jchu634/ShortsRedirector",
  },
  {
    name: "Loopy-Desktop",
    type: ["Application"],
    timeframe: "2022 - 2023",
    technologies_and_frameworks: ["Electron", "HTML", "CSS", "VanillaJS"],
    brief: "Desktop Application for visualising Systems",
    description:
      "This is a Electron wrapper for Loopy, an open source web application which allows users to visualise systems.\n" +
      "Additionally, this fork adds the ability to create and save GIFs of the visualisations.",
    github: "https://github.com/jchu634/loopy-desktop",
    download: "https://github.com/jchu634/loopy-desktop/releases/tag/v1.2.1",
    images: [
      "/projects/loopy/Loopy.png",
      "/projects/loopy/loopy_output.gif",
      "/projects/loopy/loopy_example.png",
    ],
  },
  {
    name: "Fakman",
    type: ["Game"],
    timeframe: "2021",
    technologies_and_frameworks: ["Unity", "C#"],
    brief: "Unity Pacman Clone",
    description:
      "This is a Pacman clone made as a learning project for Unity and C#.\n" +
      "This game has a playable windows build and a webGL build which can be played in your browser through the link below",
    github: "https://github.com/jchu634/fakman",
    website: "/projects/games/Fakman",
    images: ["/projects/fakman/Fakman.png"],
  },
  {
    name: "Brookshear Machine Simulator",
    type: ["Application"],
    timeframe: "2019",
    technologies_and_frameworks: ["VB", "Python"],
    brief: "Its a Brookshear Machine Simulator",
    description:
      "A Brookshear Machine Simulator built using Visual Basic and Python.",
    github:
      "https://github.com/Keshuac/BrookShear-Machine-Emulator-.py-and-.vb",
  },
];
