import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

const FigureWithCaption = ({
  src,
  caption,
  aspectRatio = "aspect-video", // e.g., "aspect-[16/9]"
  figureWidth = "w-3/4", // Tailwind class for width, e.g., 'w-full', 'w-1/2', 'w-3/4'
  className = "", // Optional: for additional custom classes on the figure
}: {
  src: string;
  caption: string;
  aspectRatio?: string;
  figureWidth?: string;
  className?: string;
}) => {
  return (
    <figure className={`my-3 block ${figureWidth} ${className}`}>
      {/* 
        This inner div is crucial for Next.js Image with fill={true}
        It provides the relative positioning and the defined aspect ratio 
      */}
      <div className={cn("relative", aspectRatio)}>
        <Image src={src} alt={caption} fill={true} />
      </div>

      <figcaption className="text-gray:600 mt-2 text-center text-sm dark:text-gray-400">
        {caption}
      </figcaption>
    </figure>
  );
};

export default FigureWithCaption;
