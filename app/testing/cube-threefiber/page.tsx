"use client";
import React, { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

function Box(props: JSX.IntrinsicElements['mesh']){
    const ref = useRef<Mesh>(null!);

    useFrame((state, delta) => (
        ref.current.rotation.x += 0.01,
        ref.current.rotation.y += 0.01

    )); 
    return (
        <mesh
            {...props}
            ref={ref}
        >
            <boxGeometry args={[2, 2, 2]} />
            <meshBasicMaterial color={0x00ff00} />
        </mesh>
    )
}

export default function App(){
    return (
        <Canvas>
          <Box />
          <ambientLight intensity={0.1} />
          <directionalLight position={[0, 0, 5]} color="red" />
        </Canvas>
    );
}

// export default ThreeScene;