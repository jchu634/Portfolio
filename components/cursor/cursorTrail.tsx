import React, { useEffect, useState, useRef } from "react";

type Cursor = {
  top: number;
  left: number;
  key: number;
};

function RenderCursorTrail() {
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const lastCursor = useRef<Cursor | null>(null);

  const cursorMinDistance = 100; // Change this value to adjust the distance between cursors
  const cursorTimeOut = 500; // Change this value to adjust how long each div stays on the screen

  useEffect(() => {
    const timeoutIds = new Map<number, NodeJS.Timeout>();

    const moveCursor = (e: MouseEvent) => {
      const potentialNewCursor: Cursor = {
        top: e.clientY,
        left: e.clientX,
        key: Date.now(),
      };

      // Calculate the distance between the new cursor and the last cursor
      const distance = lastCursor.current
        ? Math.sqrt(
            Math.pow(potentialNewCursor.left - lastCursor.current.left, 2) +
              Math.pow(potentialNewCursor.top - lastCursor.current.top, 2),
          )
        : Infinity;

      // Only add the new cursor if the distance is greater than the threshold
      if (distance > cursorMinDistance) {
        const keyToRemove = potentialNewCursor.key;

        setCursors((prevCursors) => {
          // Calculate timeout based on the position (index + 1) in the trail
          const newCursorIndex = prevCursors.length + 1;
          const timeoutDuration = newCursorIndex * cursorTimeOut;

          const timeoutId = setTimeout(() => {
            setCursors((currentCursors) =>
              currentCursors.filter((cursor) => cursor.key !== keyToRemove),
            );
            timeoutIds.delete(keyToRemove);
          }, timeoutDuration);

          timeoutIds.set(keyToRemove, timeoutId);

          return [...prevCursors, potentialNewCursor];
        });

        lastCursor.current = potentialNewCursor;
      }
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId));
    };
    // Add dependencies to re-run the effect if these values change
  }, [cursorMinDistance, cursorTimeOut]);

  return (
    <div>
      {cursors.map((cursor) => (
        <div
          key={cursor.key}
          className="pointer-events-none invisible absolute h-5 w-5 rounded-full bg-black lg:visible dark:bg-white"
          style={{ top: cursor.top, left: cursor.left, position: "absolute" }}
        />
      ))}
    </div>
  );
}
export default function customCursorTrail() {
  return (
    <div>
      <RenderCursorTrail />
    </div>
  );
}
