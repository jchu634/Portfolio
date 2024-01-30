import React, { useEffect, useState, useRef } from 'react';

export default function customCursorGif() {
  const [gifPosition, setGifPosition] = useState({ top: 0, left: 0 });
  const [lastPosition, setLastPosition] = useState({ top: 0, left: 0 });
  const [isFlipped, setIsFlipped] = useState(false);
  
  const gifDelay = 500;             // Change this value to adjust the delay of the gif

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {

      // Update the gif's position with a delay
      setTimeout(() => {
        setGifPosition({ top: e.clientY, left: e.clientX });
        
        if (e.clientX < lastPosition.left) {
          setIsFlipped(true);
        } else {
          setIsFlipped(false);
        }

        // Update the last cursor position
        setLastPosition({ top: e.clientY, left: e.clientX });
      }, gifDelay);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [lastPosition]);

  return (
    <div>
      <img
        src="/pacman.gif"
        className="w-10 h-10"
        style={{ top: `calc(${gifPosition.top}px - 20px)`,
                 left: `calc(${gifPosition.left}px - 20px)`, 
                 position: 'absolute',
                 transform: isFlipped ? 'scaleX(-1)' : 'scaleX(1)'
                }}
      />
    </div>
  );
}