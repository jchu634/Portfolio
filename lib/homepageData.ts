interface EducationType {
  institution: string;
  description: string;
  timeframe: string;
  link: string;
}
interface ProjectCardType {
  bgColor: string;
  name: string;
  type: string[];
  technologies_and_frameworks: string[];
  github?: string;
  website?: string;
  description: string;
  image?: boolean;
  download?: string;
  priority?: boolean;
  image_light?: string;
  image_dark?: string;
  image_alt?: string;
}

export const education: EducationType[] = [
  {
    institution: "University of Auckland",
    description: "BSc: Majoring in Computer Science",
    timeframe: "2021-2024",
    link: "https://keshuac.com/extlink/ucert",
  },
  {
    institution: "NVIDIA Deep Learning Institute",
    description: "Fundamentals of Accelerated Data Science",
    timeframe: "2025",
    link: "https://keshuac.com/extlink/ncert3",
  },
  {
    institution: "NVIDIA Deep Learning Institute",
    description: "Fundamentals of Accelerated Computing\nwith CUDA Python",
    timeframe: "2024",
    link: "https://keshuac.com/extlink/ncert2",
  },
  {
    institution: "NVIDIA Deep Learning Institute",
    description: "Fundamentals of Deep Learning",
    timeframe: "2023",
    link: "https://keshuac.com/extlink/ncert1",
  },
];
export const projects: ProjectCardType[] = [
  {
    bgColor: "bg-[#122c23]",
    name: "Subtext",
    type: ["Application"],
    technologies_and_frameworks: ["Next.JS", "Astro", "Python", "InnoSetup"],
    github: "https://github.com/jchu634/subtext-app",
    website: "https://subtextapp.cc/",
    description: "An local, easy to use, AI subtitling app.",
    image: true,
    download:
      "https://github.com/jchu634/Subtext-app/releases/latest/download/Subtext-Setup.exe",
    priority: true,
    image_light: "/projects/subtextapp/ScreenshotLight.png",
    image_dark: "/projects/subtextapp/ScreenshotDark.png",
    image_alt: "Subtext App Screenshot",
  },
  {
    bgColor: "bg-[#E41655]",
    name: "HA-Components",
    type: ["Application"],
    technologies_and_frameworks: [
      "NextJS",
      "TailwindCSS",
      "react",
      "Home Assistant",
    ],
    github: "https://github.com/jchu634/ha-components",
    website: "https://hacomponents.keshuac.com/",
    description: `A ShadCN/ui inspired component framework for Home Assistant Dashboards.`,
    image: true,
    priority: true,
    image_light: "/projects/hacomponents/homepage_light.png",
    image_dark: "/projects/hacomponents/homepage_dark.png",
  },
  {
    bgColor: "bg-[#1f464d]",
    name: "Ryzen AI Subtitles",
    type: ["Application"],
    technologies_and_frameworks: ["Next.JS", "Python", "Ryzen AI Software"],
    github: "https://github.com/jchu634/SubtitleProject",
    website: "https://www.hackster.io/jchu634/ryzen-ai-subtitling-5ead7f",
    description: "Real-Time Captions using the Ryzen AI NPU",
    image: true,
    image_light: "/projects/ryzensubtitles/simple_light.png",
    image_dark: "/projects/ryzensubtitles/simple_dark.png",
    image_alt: "Ryzen AI Subtitles Screenshot",
  },
  {
    bgColor: "bg-[#B30753]",
    name: "Inkproof",
    type: ["Website"],
    technologies_and_frameworks: ["Next.JS", "TailwindCSS"],
    github: "https://github.com/jchu634/Inkproof",
    website: "https://inkproof.keshuac.com",
    description: "A modern ePUB Editor\nBuilt for the Bolt.new 2025 Hackathon",
    image: true,
    image_light: "/projects/inkproof/inkproof_editor_light.png",
    image_dark: "/projects/inkproof/inkproof_editor_dark.png",
    image_alt: "Inkproof Editor Screenshot",
  },
  {
    bgColor: "bg-[#56206f]",
    name: "CodeCritters",
    type: ["Hybrid Application and Website"],
    technologies_and_frameworks: [
      "TensorFlow",
      "PyTorch",
      "Python",
      "InnoSetup",
    ],
    description:
      "Capstone project:\nA website/application to identify insects using ML.",
    github:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters",
    website: "https://codecritters.live/",
    download:
      "https://github.com/uoa-compsci399-s2-2023/capstone-project-team-34-code-critters/releases/latest",
    image: true,
    image_dark: "/projects/codecritters/codecritters_dark.png",
    image_light: "/projects/codecritters/codecritters_light.png",
    image_alt: "CodeCritters Screenshot",
  },
  {
    bgColor: "bg-[#122c23]",
    name: "Loopy-Desktop",
    type: ["Application"],
    technologies_and_frameworks: ["Electron", "HTML", "CSS", "VanillaJS"],
    description: "An Desktop client for Loopy with new features.",
    github: "https://github.com/jchu634/loopy-desktop",
    download: "https://github.com/jchu634/loopy-desktop/releases/latest",
    image: true,
    image_dark: "/projects/loopy/Loopy.png",
    image_light: "/projects/loopy/Loopy.png",
    image_alt: "Loopy Desktop Screenshot",
  },
  {
    bgColor: "bg-[#E41655]",
    name: "Fakman",
    type: ["Game"],
    technologies_and_frameworks: ["Unity", "C#"],
    description:
      "A Pacman clone written in C# using the Unity Engine.\nPlayable in the link below!",
    github: "https://github.com/jchu634/fakman",
    image: true,
    image_dark: "/projects/fakman/Fakman.png",
    image_light: "/projects/fakman/Fakman.png",
    image_alt: "Fakman Screenshot",
    website: "/projects/games/Fakman",
  },
];
