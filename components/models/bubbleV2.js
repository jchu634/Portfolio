import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useGLTF } from '@react-three/drei';
import { useGesture } from '@use-gesture/react';

function interpolateColor(color1, color2, factor) {
  const color1Matches = color1.slice(1).match(/.{2}/g);
  if (!color1Matches) return color1;
  
  const result = color1Matches.map((hex, i) => {
    const value1 = parseInt(hex, 16);
    const color2Matches = color2.slice(1).match(/.{2}/g);
    const value2 = color2Matches ? parseInt(color2Matches[i], 16) : 0;
    const interpolatedValue = Math.round(value1 + (value2 - value1) * factor);
    return interpolatedValue.toString(16).padStart(2, '0');
  });
  return `#${result.join('')}`;
};

export function BubbleV2(props) {
  const bubbleRef = useRef();
  const { nodes, materials } = useGLTF('/BubbleV2.gltf');
  const [materialColour, setMaterialColour] = useState('#ffffff');
  const { theme, setTheme } = useTheme();

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => set({ position: [x / aspect, -y / aspect, 0], rotation: [y / aspect, x / aspect, 0] }),
  })
  
  useEffect(() => {
    if (bubbleRef.current && bubbleRef.current.material) {
      bubbleRef.current.material.metalness = 0.5;
      bubbleRef.current.material.roughness = 0.4;
    } else {
      console.log("BubbleV2 material not loaded");
    }
  }, []);

  useEffect(() => {
    let colours = null;
    if (theme === 'dark') {
      colours = ['#4DEEEA', '#74EE15', '#FFE700', '#F000FF', '#001EFF', '#F8655A'];
    } else{
      colours = ['#571583', '#FEF100', '#FF4EA9', '#02FF01', '#F50912', '#207BEF'];
    }
    
    let index = 0;
    let factor = 0;
    const steps = 100;        // Number of steps for interpolation
    const stepDuration = 50;  // Duration of each step in milliseconds
  
    const interval = setInterval(() => {
      setMaterialColour(prevColour => {
        const newColour = interpolateColor(colours[index], colours[(index + 1) % colours.length], factor / steps);
        if (bubbleRef.current && bubbleRef.current.material) {
          bubbleRef.current.material.color.set(newColour);
        }
        factor++;
        if (factor > steps) {
          factor = 0;
          index = (index + 1) % colours.length;
        }
        return newColour;
      });
    }, stepDuration); // Update color every stepDuration milliseconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <group {...props} dispose={null}>
      <mesh
        {...bind()}
        ref={bubbleRef}
        castShadow
        receiveShadow
        geometry={nodes.sphere.geometry}
        material={nodes.sphere.material}
      />
    </group>
  );
}

useGLTF.preload('/BubbleV2.gltf');