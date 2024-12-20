"use client";
import React, { useRef, useEffect } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);

      //Add a cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const handleWindowResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      };

      window.addEventListener("resize", handleWindowResize);

      const animate = () => {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };
      animate();

      // Clean up the event listener when the component is unmounted
      return () => {
        window.removeEventListener("resize", handleWindowResize);
        containerRef.current?.removeChild(renderer.domElement);
      };
    }
  }, []);

  useEffect(() => {
    if (sceneRef.current) {
      if (theme === "dark") {
        sceneRef.current.background = new THREE.Color(0x0f172a);
      } else {
        sceneRef.current.background = new THREE.Color(0xffffff);
      }
    }
  });
  return <div ref={containerRef} />;
};
export default ThreeScene;
