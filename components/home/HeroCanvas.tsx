'use client';

import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useAccentColor } from '@/lib/useAccentColor';
import { useReduceMotionStore } from '@/lib/useReduceMotion';
import { useMousePosition } from '@/lib/useMousePosition';

function hexToVec3(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { accent } = useAccentColor();
  const { reduceMotion } = useReduceMotionStore();
  const mouse = useMousePosition();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    if (!reduceMotion) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.18;
      meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.2;
      // Subtle mouse parallax
      const targetX = (mouse.y / window.innerHeight - 0.5) * 0.3;
      const targetY = (mouse.x / window.innerWidth - 0.5) * 0.3;
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
    }
  });

  const [r, g, b] = hexToVec3(accent.value);
  const color = new THREE.Color(r, g, b);

  return (
    <mesh ref={meshRef} scale={[1.6, 1.6, 1.6]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        wireframe
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

function InnerGlow() {
  const { accent } = useAccentColor();
  const [r, g, b] = hexToVec3(accent.value);
  const color = new THREE.Color(r * 0.5, g * 0.5, b * 0.5);

  return (
    <mesh scale={[1.2, 1.2, 1.2]}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial color={color} transparent opacity={0.08} />
    </mesh>
  );
}

export default function HeroCanvas() {
  return (
    <div
      className="w-full h-full"
      aria-label="Decorative 3D geometric shape"
      role="img"
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <InnerGlow />
          <Icosahedron />
        </Suspense>
      </Canvas>
    </div>
  );
}
