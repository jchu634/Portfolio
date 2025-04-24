import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";

type Cursor = {
  top: number;
  left: number;
  key: number;
};

function CursorTrailWithGif() {
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const [gifPosition, setGifPosition] = useState({ top: -100, left: -100 }); // Start off-screen
  const [isFlipped, setIsFlipped] = useState(false);
  const lastCursorPos = useRef<Cursor | null>(null);
  const gifPositionRef = useRef(gifPosition); // Ref to access current gifPosition in timeout

  // Update ref whenever gifPosition changes
  useEffect(() => {
    gifPositionRef.current = gifPosition;
  }, [gifPosition]);

  const cursorMinDistance = 100; // Distance between trail points
  const cursorTimeOut = 200; // Base time for each segment expiration

  useEffect(() => {
    const timeoutIds = new Map<number, NodeJS.Timeout>();

    const moveMouse = (e: MouseEvent) => {
      const potentialNewCursor: Cursor = {
        top: e.clientY,
        left: e.clientX,
        key: Date.now(),
      };

      // Calculate distance from the last *added* trail point
      const distance = lastCursorPos.current
        ? Math.sqrt(
            Math.pow(potentialNewCursor.left - lastCursorPos.current.left, 2) +
              Math.pow(potentialNewCursor.top - lastCursorPos.current.top, 2),
          )
        : Infinity;

      if (distance > cursorMinDistance) {
        const keyToRemove = potentialNewCursor.key;
        const cursorToExpire = { ...potentialNewCursor }; // Capture position for timeout

        setCursors((prevCursors) => {
          const newCursorIndex = prevCursors.length + 1;
          const timeoutDuration = newCursorIndex * cursorTimeOut;

          const timeoutId = setTimeout(() => {
            // --- GIF Movement Logic ---
            // Check direction before updating position
            setIsFlipped(cursorToExpire.left < gifPositionRef.current.left);
            // Move GIF to the position of the expiring cursor
            setGifPosition({
              top: cursorToExpire.top,
              left: cursorToExpire.left,
            });
            // --- End GIF Movement ---

            // Remove the cursor element from the trail state
            setCursors((currentCursors) =>
              currentCursors.filter((cursor) => cursor.key !== keyToRemove),
            );
            timeoutIds.delete(keyToRemove);
          }, timeoutDuration);

          timeoutIds.set(keyToRemove, timeoutId);

          // If it's the very first cursor, move the GIF immediately
          if (prevCursors.length === 0) {
            setGifPosition({
              top: cursorToExpire.top,
              left: cursorToExpire.left,
            });
          }

          return [...prevCursors, potentialNewCursor];
        });

        // Update the last *added* cursor position
        lastCursorPos.current = potentialNewCursor;
      }
    };

    window.addEventListener("mousemove", moveMouse);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [cursorMinDistance, cursorTimeOut]); // Dependencies

  return (
    <div>
      {/* Render Cursor Trail Elements */}
      {cursors.map((cursor) => (
        <div
          key={cursor.key}
          className="pointer-events-none invisible absolute h-5 w-5 rounded-full bg-black lg:visible dark:bg-white"
          style={{
            top: `${cursor.top}px`,
            left: `${cursor.left}px`,
            position: "absolute",
            transform: "translate(-50%, -50%)", // Center the dot on the coordinate
          }}
        />
      ))}

      {/* Render GIF */}
      <Image
        src="/pacman.gif" // Make sure this path is correct
        width={40}
        height={40}
        alt="Following GIF"
        className="invisible lg:visible"
        style={{
          position: "absolute",
          top: `${gifPosition.top}px`,
          left: `${gifPosition.left}px`,
          transform: `translate(-50%, -50%) ${isFlipped ? "scaleX(-1)" : "scaleX(1)"}`, // Center GIF and flip
          pointerEvents: "none",
          transition: "top 0.1s ease-out, left 0.1s ease-out", // Optional smooth transition
        }}
      />
    </div>
  );
}

export default CursorTrailWithGif;
