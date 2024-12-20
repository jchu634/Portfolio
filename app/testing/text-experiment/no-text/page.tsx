"use client";
import React, { Suspense, useRef } from "react";
import { useTheme } from "next-themes";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Group } from "three";
import { useGLTF, OrthographicCamera } from "@react-three/drei";
import { BubbleModel } from "@/components/models/bubble";

function Rotate(props: JSX.IntrinsicElements["group"]) {
  const ref = useRef<Group>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.01;
    }
  });

  return <group ref={ref} {...props} />;
}

function Model({
  url,
  scale,
  positionY,
  positionX,
  ...props
}: {
  url: string;
  scale?: number[];
  positionY?: number;
  positionX?: number;
}) {
  // useGLTF suspends the component, it literally stops processing
  const { scene } = useGLTF(url);
  // By the time we're here the model is guaranteed to be available
  return (
    <primitive
      object={scene}
      scale={scale}
      position-y={positionY}
      position-x={positionX}
      {...props}
    />
  );
}

export default function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="pointer-events-none absolute inset-0">
      <Suspense fallback={<span>loading...</span>}>
        <Canvas style={{ zIndex: 1 }}>
          <OrthographicCamera makeDefault zoom={30} />

          <BubbleModel position-x={10} position-y={5.5} />

          {theme === "light" && <ambientLight intensity={0.3} />}
          <directionalLight position={[-10, -5, 10]} color="white" />
        </Canvas>
      </Suspense>
    </div>
  );
}

// export default ThreeScene;
