import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { useGLTF } from '@react-three/drei';
import { useSpring, a } from '@react-spring/three';
import { useDrag } from '@use-gesture/react';
import { useThree } from '@react-three/fiber';

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

export function BubbleModel(props) {
  const bubbleRef = useRef();
  const groupRef = useRef();
  const { nodes, materials } = useGLTF('/BubbleBig.gltf');
  const { theme } = useTheme();
  
  
  // Dragging Spring Logic 
  // Disabled as it has bad interactions with the rotation and orthographic camera

  // const { size, viewport } = useThree();
  // const aspect = size.width / viewport.width;
  // const [isDragging, setIsDragging] = useState(false);

  // const [spring, set] = useSpring(() => ({ position: [0, 0, 0], config: { mass: 1, friction: 50, tension: 500, clamp:true } }));
  

  // const bind = useDrag(({ movement: [x, y], down }) => {
  //   setIsDragging(down);
  //   console.log(down)
  //   set({ 
  //     config: { mass: down ? 1 : 4, tension: down ? 1200 : 500 },
  //     position: down ? [x / aspect, -y / aspect, 0] : [0, 0, 0] 
  //   });
  // });

  // Apply material properties
  useEffect(() => {
    if (bubbleRef.current && bubbleRef.current.material) {
      bubbleRef.current.material.metalness = 0.5;
      bubbleRef.current.material.roughness = 0.4;
    } else {
      console.log("Bubble material not loaded");
    }
  }, []);

  // Apply Disco effect
  useEffect(() => {
    let colours = null;
    if (theme === 'dark') {
      colours = ['#4DEEEA', '#74EE15', '#FFE700', '#F000FF', '#001EFF', '#F8655A'];
    } else {
      colours = ['#571583', '#FEF100', '#FF4EA9', '#02FF01', '#F50912', '#207BEF'];
    }
    
    let index = 0;
    let factor = 0;
    const steps = 100;        // Number of steps for interpolation
    const stepDuration = 50;  // Duration of each step in milliseconds
  
    const interval = setInterval(() => {
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
    }, stepDuration); // Update color every stepDuration milliseconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [theme]);

  // Apply rotation
  useEffect(() => {
    const rotate = () => {
      // if (!isDragging && groupRef.current) {
      if (groupRef.current) {
        groupRef.current.rotation.y += 0.01;
      }
      requestAnimationFrame(rotate);
    };
    rotate();
  }, []);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <a.mesh
        ref={bubbleRef}
        // {...spring} {...bind()}
        castShadow
        receiveShadow
        geometry={nodes.sphere.geometry}
        material={nodes.sphere.material}
      />
    </group>
  );
}

useGLTF.preload('/BubbleBig.gltf');