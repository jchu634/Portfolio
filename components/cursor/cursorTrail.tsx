import React, { useEffect, useState, useRef, CSSProperties } from "react";
import Image from "next/image";

type Cursor = {
  Y: number;
  X: number;
  key: number;
};

const CURSOR_MIN_DISTANCE = 100; // Min distance between trail points to add a new one
const CURSOR_TIMEOUT_MS = 100; // Time (ms) for a trail point to live and for GIF to travel to it

function CursorTrailWithGif() {
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const [gifStyle, setGifStyle] = useState<CSSProperties>({
    position: "absolute",
    top: "-100px", // Start off-screen
    left: "-100px",
    transform: "translate(-50%, -50%) scaleX(1)",
    pointerEvents: "none",
    // Initial transition set, will be updated dynamically
    transition: `top ${CURSOR_TIMEOUT_MS / 1000}s linear, left ${
      CURSOR_TIMEOUT_MS / 1000
    }s linear`,
    willChange: "top, left", // Hint for performance
  });
  const lastCursorPos = useRef<Cursor | null>(null);
  const currentGifTargetKey = useRef<number | null>(null); // Track the key of the target cursor
  const previousGifTargetPos = useRef<{ Y: number; left: number } | null>(null); // Track previous target for flipping logic
  const timeoutIds = useRef(new Map<number, NodeJS.Timeout>());

  // Effect to handle mouse movement and add trail points
  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      const potentialNewCursor: Cursor = {
        Y: e.clientY,
        X: e.clientX,
        key: Date.now(),
      };

      // Calculate distance from the last *added* trail point
      const distance = lastCursorPos.current
        ? Math.sqrt(
            Math.pow(potentialNewCursor.X - lastCursorPos.current.X, 2) +
              Math.pow(potentialNewCursor.Y - lastCursorPos.current.Y, 2),
          )
        : Infinity;

      // Only add a new point if the mouse moved sufficiently
      if (distance > CURSOR_MIN_DISTANCE) {
        const newKey = potentialNewCursor.key;

        // Add the new cursor point to the state
        setCursors((prevCursors) => {
          const newCursors = [...prevCursors, potentialNewCursor];
          const timeoutDuration = newCursors.length * CURSOR_TIMEOUT_MS; // Stagger removal

          // Set a timeout to remove this specific cursor point after its calculated duration
          const timeoutId = setTimeout(() => {
            setCursors((currentCursors) =>
              currentCursors.filter((cursor) => cursor.key !== newKey),
            );
            timeoutIds.current.delete(newKey);
          }, timeoutDuration);

          timeoutIds.current.set(newKey, timeoutId);
          return newCursors;
        });
        lastCursorPos.current = potentialNewCursor; // Update last added position
      }
    };

    window.addEventListener("mousemove", moveMouse);

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", moveMouse);
      // Clear any remaining timeouts when the component unmounts
      timeoutIds.current.forEach((timeoutId) => clearTimeout(timeoutId));
      timeoutIds.current.clear();
    };
    // Only CURSOR_MIN_DISTANCE and CURSOR_TIMEOUT_MS are dependencies here
    // Cursors state is managed internally via setCursors callback
  }, [CURSOR_MIN_DISTANCE, CURSOR_TIMEOUT_MS]);

  // Effect to update GIF target and style when the trail changes
  useEffect(() => {
    if (cursors.length > 0) {
      const nextTarget = cursors[0]; // The oldest cursor is the next target

      // Only update if the target has actually changed
      if (nextTarget.key !== currentGifTargetKey.current) {
        // Determine flip direction based on previous target
        // Use current GIF position if previous target isn't set yet (first move)
        const currentLeft =
          previousGifTargetPos.current?.left ??
          parseFloat(gifStyle.left as string) ??
          nextTarget.X;
        const isFlipped = nextTarget.X < currentLeft;

        setGifStyle((prevStyle) => ({
          ...prevStyle,
          top: `${nextTarget.Y}px`,
          left: `${nextTarget.X}px`,
          transform: `translate(-50%, -50%) scaleX(${isFlipped ? -1 : 1})`,
          // Ensure transition matches the time until the *next* point expires
          transition: `top ${CURSOR_TIMEOUT_MS / 1000}s linear, left ${
            CURSOR_TIMEOUT_MS / 1000
          }s linear`,
        }));

        currentGifTargetKey.current = nextTarget.key;
        previousGifTargetPos.current = {
          Y: nextTarget.Y,
          left: nextTarget.X,
        };
      }
    } else {
      // No cursors, reset target key and potentially hide GIF or stop transition
      currentGifTargetKey.current = null;
      previousGifTargetPos.current = null; // Reset previous position too
      // Optional: Move GIF off-screen immediately when idle and stop transition
      // setGifStyle(prevStyle => ({
      //   ...prevStyle,
      //   top: '-100px',
      //   left: '-100px',
      //   transition: 'none' // Stop transition when idle
      // }));
    }
  }, [cursors, CURSOR_TIMEOUT_MS, gifStyle.left]); // Include gifStyle.left to recalculate flip correctly on first move

  return (
    <div>
      {cursors.map((cursor) => (
        <div
          key={cursor.key}
          className="pointer-events-none invisible absolute h-5 w-5 rounded-full bg-black lg:visible dark:bg-white"
          style={{
            top: `${cursor.Y}px`,
            left: `${cursor.X}px`,
            position: "absolute",
            transform: "translate(-50%, -50%)", // Center the dot on the coordinate
          }}
        />
      ))}

      <Image
        src="/pacman.gif"
        width={40}
        height={40}
        alt="Following GIF"
        className="invisible lg:visible"
        style={gifStyle} // Apply the calculated style
        unoptimized // NextJS cannot optimize Gifs
      />
    </div>
  );
}

export default CursorTrailWithGif;
