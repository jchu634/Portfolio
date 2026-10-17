"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ImageGalleryProps = {
  label?: string;
  images: string[];
};

export function ImageGallery({
  label = "Image gallery",
  images,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <Dialog>
      <Carousel
        aria-label={label}
        className="mt-4 w-full min-w-0 sm:px-10"
        opts={{ align: "start", slidesToScroll: 1 }}
      >
        <CarouselContent className="-ml-3 items-center">
          {images.map((image, index) => (
            <CarouselItem
              key={image}
              className="max-w-full basis-auto pl-3"
              aria-label={`${index + 1} of ${images.length}`}
            >
              <DialogTrigger asChild>
                <button
                  type="button"
                  aria-label={`Enlarge image ${index + 1} in ${label}`}
                  onClick={() => setSelectedIndex(index)}
                  className="block cursor-zoom-in overflow-hidden rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-orange-500"
                >
                  <Image
                    src={image}
                    alt={`${label}, image ${index + 1}`}
                    width={600}
                    height={600}
                    sizes="(max-width: 640px) 70vw, 600px"
                    className="h-auto max-h-60 w-auto max-w-full object-contain sm:max-h-72"
                  />
                </button>
              </DialogTrigger>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-0 hidden sm:inline-flex" />
            <CarouselNext className="right-0 hidden sm:inline-flex" />
          </>
        )}
      </Carousel>

      <DialogContent className="w-[calc(100%-2rem)] max-w-6xl gap-3 p-4 sm:max-w-6xl sm:p-6">
        <DialogHeader className="pr-8">
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>
            <span className="sm:hidden">Swipe to browse.</span>
            <span className="hidden sm:inline">
              Swipe or use the arrows to browse.
            </span>
          </DialogDescription>
        </DialogHeader>
        <Carousel
          aria-label={`${label}, enlarged images`}
          className="min-w-0 sm:px-10"
          opts={{ startIndex: selectedIndex, loop: images.length > 1 }}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem
                key={image}
                className="flex items-center justify-center"
                aria-label={`${index + 1} of ${images.length}`}
              >
                <Image
                  src={image}
                  alt={`${label}, image ${index + 1}`}
                  width={1600}
                  height={1600}
                  sizes="(max-width: 1280px) 85vw, 1100px"
                  className="h-[70dvh] w-auto max-w-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-0 hidden sm:inline-flex" />
              <CarouselNext className="right-0 hidden sm:inline-flex" />
            </>
          )}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
}
