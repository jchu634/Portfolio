"use client";
import React, { Suspense, useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh, Group } from 'three';
import { useGLTF } from '@react-three/drei';

function Box(props: JSX.IntrinsicElements['mesh']){
    const ref = useRef<Mesh>(null!);
    
    const { nodes, materials } = useGLTF('/cube.gltf');
    return (
        <primitive object={nodes.Cube} ref={ref} {...props} />
    )
}

function Rotate(props: JSX.IntrinsicElements['group']){
  const ref = useRef<Group>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime;
    }
  });

  return <group ref={ref} {...props} />;
};
  
function Model({ url, ...props }: { url: string }) {
    // useGLTF suspends the component, it literally stops processing
    const { scene } = useGLTF(url)
    // By the time we're here the model is guaranteed to be available
    return <primitive object={scene} {...props} />
}

export default function App(){
    return (
        <Suspense fallback={<span>loading...</span>}>
            <Canvas dpr={[1, 2]} camera={{ position: [-2, 2, 4], fov: 25 }}>
            
            <Rotate position-y={0.01} position-x={0.01} scale={0.2}>
                <Suspense fallback={<Model url="/TestingCat.gltf" />}>
                    <Model url="/TestingCat.gltf" />
                </Suspense>
            </Rotate>
            <ambientLight intensity={0.1} />
            <directionalLight position={[0, 0, 5]} color="white" />
        
            </Canvas>
        </Suspense>
    )
}

// export default ThreeScene;