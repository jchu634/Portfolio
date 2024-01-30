import React, { useEffect, useState, useRef } from 'react';

type Cursor = {
  top: number;
  left: number;
  key: number;
};

export default function customCursorTrail() {
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const lastCursor = useRef<Cursor | null>(null);

  const cursorMinDistance = 100;    // Change this value to adjust the distance between cursors
  const cursorTimeOut = 500;        // Change this value to adjust how long each div stays on the screen

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const newCursor: Cursor = { top: e.clientY, left: e.clientX, key: Date.now() };

      // Calculate the distance between the new cursor and the last cursor
      const distance = lastCursor.current
        ? Math.sqrt(Math.pow(newCursor.left - lastCursor.current.left, 2) + Math.pow(newCursor.top - lastCursor.current.top, 2))
        : Infinity;

      // Only add the new cursor if the distance is greater than the threshold
      if (distance > cursorMinDistance) { // Change this value to adjust the distance between cursors
        setCursors((prevCursors) => [...prevCursors, newCursor]);
        lastCursor.current = newCursor;

        setTimeout(() => {
          setCursors((prevCursors) => prevCursors.filter((cursor) => cursor.key !== newCursor.key));
        }, cursorTimeOut); // Change this value to adjust how long each div stays on the screen
      }
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div>
      {cursors.map((cursor) => (
        <div
          key={cursor.key}
          className='
            w-5 h-5 rounded-full absolute pointer-events-none
            dark:bg-white bg-black
            '
          style={{ top: cursor.top, left: cursor.left, position: 'absolute' }}
        />
      ))}
    </div>
  );
}