"use client"
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { Link as LinkIcon, Download, ExternalLink } from "lucide-react";
import { SiGithub, SiGithubHex } from '@icons-pack/react-simple-icons';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { Mesh, Group } from 'three';
import { useGLTF } from '@react-three/drei';
import { BubbleModel } from '@/components/models/bubble';

function Rotate(props: JSX.IntrinsicElements['group']){
    const ref = useRef<Group>(null!);
  
    useFrame((state) => {
      if (ref.current) {
        ref.current.rotation.y += 1;
      }
    });
  
    return <group ref={ref} {...props} />;
};

function CameraController({ cameraPosition }: { cameraPosition: [number, number, number] }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(...cameraPosition);
    camera.updateProjectionMatrix();
  }, [cameraPosition]);
  return null;
}

export default function App() {
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([1, 1, 0]);
  const [bubblePosition, setBubblePosition] = useState<[number, number, number]>([2, 1.5, 0]);

  return (
    <main className="relative w-full h-full">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={<span>loading...</span>}>
          <Canvas style={{ zIndex: 1 }}>
            <OrthographicCamera makeDefault position={cameraPosition} zoom={50} />
            <CameraController cameraPosition={cameraPosition} />
            <Rotate position-x={bubblePosition[0]} position-y={bubblePosition[1]} position-z={bubblePosition[2]}>
              <BubbleModel />
            </Rotate>
            <ambientLight intensity={0.3} />
            <directionalLight position={[0, 0, 5]} color="white" />
          </Canvas>
        </Suspense>
      </div>
      <div className="relative z-10 p-4">
        <div>
          <label>Camera X: </label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.1"
            value={cameraPosition[0]}
            onChange={(e) => setCameraPosition([parseFloat(e.target.value), cameraPosition[1], cameraPosition[2]])}
          />
          <input
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={cameraPosition[0]}
            onChange={(e) => setCameraPosition([parseFloat(e.target.value), cameraPosition[1], cameraPosition[2]])}
          />
        </div>
        <div>
          <label>Camera Y: </label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.1"
            value={cameraPosition[1]}
            onChange={(e) => setCameraPosition([cameraPosition[0], parseFloat(e.target.value), cameraPosition[2]])}
          />
          <input
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={cameraPosition[1]}
            onChange={(e) => setCameraPosition([cameraPosition[0], parseFloat(e.target.value), cameraPosition[2]])}
          />
        </div>
        <div>
          <label>Camera Z: </label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.1"
            value={cameraPosition[2]}
            onChange={(e) => setCameraPosition([cameraPosition[0], cameraPosition[1], parseFloat(e.target.value)])}
          />
          <input
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={cameraPosition[2]}
            onChange={(e) => setCameraPosition([cameraPosition[0], cameraPosition[1], parseFloat(e.target.value)])}
          />
        </div>
        <div>
          <label>Bubble X: </label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.1"
            value={bubblePosition[0]}
            onChange={(e) => setBubblePosition([parseFloat(e.target.value), bubblePosition[1], bubblePosition[2]])}
          />
          <input
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={bubblePosition[0]}
            onChange={(e) => setBubblePosition([parseFloat(e.target.value), bubblePosition[1], bubblePosition[2]])}
          />
        </div>
        <div>
          <label>Bubble Y: </label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.1"
            value={bubblePosition[1]}
            onChange={(e) => setBubblePosition([bubblePosition[0], parseFloat(e.target.value), bubblePosition[2]])}
          />
          <input
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={bubblePosition[1]}
            onChange={(e) => setBubblePosition([bubblePosition[0], parseFloat(e.target.value), bubblePosition[2]])}
          />
        </div>
        <div>
          <label>Bubble Z: </label>
          <input
            type="range"
            min="-10"
            max="10"
            step="0.1"
            value={bubblePosition[2]}
            onChange={(e) => setBubblePosition([bubblePosition[0], bubblePosition[1], parseFloat(e.target.value)])}
          />
          <input
            type="number"
            min="-10"
            max="10"
            step="0.1"
            value={bubblePosition[2]}
            onChange={(e) => setBubblePosition([bubblePosition[0], bubblePosition[1], parseFloat(e.target.value)])}
          />
        </div>
      </div>
    </main>
  );
}