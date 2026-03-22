'use client';

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, invalidate } from '@react-three/fiber';
import { AdaptiveEvents, Preload } from '@react-three/drei';
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
      const targetX = (mouse.y / window.innerHeight - 0.5) * 0.3;
      meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.05;
    }
    invalidate();
  });

  const [r, g, b] = hexToVec3(accent.value);
  const color = new THREE.Color(r, g, b);

  return (
    <mesh ref={meshRef} scale={[1.6, 1.6, 1.6]}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
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
  const [frameloop, setFrameloop] = useState<'demand' | 'always'>('demand');

  return (
    <div
      style={{ width: '100%', height: '100%', cursor: 'none' }}
      aria-label="Decorative 3D geometric shape"
      role="img"
      onMouseEnter={() => setFrameloop('always')}
      onMouseLeave={() => setFrameloop('demand')}
    >
      <Canvas
        frameloop={frameloop}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <InnerGlow />
          <Icosahedron />
        </Suspense>
        <AdaptiveEvents />
        <Preload all />
      </Canvas>
    </div>
  );
}
