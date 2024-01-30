import React, { useEffect, useState, useRef } from 'react';

type Cursor = {
  top: number;
  left: number;
  key: number;
};

export default function customCursor() {
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const lastCursor = useRef<Cursor | null>(null);

  const cursorTimeOut = 500;        // Change this value to adjust how long each div stays on the screen
  const cursorMinDistance = 1000;    // Change this value to adjust the distance between cursors

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      const newCursor: Cursor = { top: e.clientY, left: e.clientX, key: Date.now() };

      // Calculate the distance between the new cursor and the last cursor
      const distance = lastCursor.current
        ? Math.sqrt(Math.pow(newCursor.left - lastCursor.current.left, 2) + Math.pow(newCursor.top - lastCursor.current.top, 2))
        : Infinity;

      // Only add the new cursor if the distance is greater than the threshold
      if (distance > 50) { // Change this value to adjust the distance between cursors
        setCursors((prevCursors) => [...prevCursors, newCursor]);
        lastCursor.current = newCursor;

        setTimeout(() => {
          setCursors((prevCursors) => prevCursors.filter((cursor) => cursor.key !== newCursor.key));
        }, 500); // Change this value to adjust how long each div stays on the screen
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
          className='cursor bg-transparent'
          style={{ top: cursor.top, left: cursor.left, position: 'absolute' }}
        />
      ))}
    </div>
  );
}