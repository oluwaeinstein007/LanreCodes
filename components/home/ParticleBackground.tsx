'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReduceMotionStore } from '@/lib/useReduceMotion';
import { useAccentColor } from '@/lib/useAccentColor';
import { useTheme } from 'next-themes';

function hexToVec3(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { accent } = useAccentColor();
  const { reduceMotion } = useReduceMotionStore();
  const { resolvedTheme } = useTheme();

  const count = 600;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current && !reduceMotion) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      pointsRef.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });

  const opacity = resolvedTheme === 'light' ? 0.06 : 0.18;
  const [r, g, b] = hexToVec3(accent.value);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={new THREE.Color(r, g, b)}
        size={0.06}
        sizeAttenuation
        transparent
        opacity={opacity}
      />
    </points>
  );
}

export default function ParticleBackground() {
  const { reduceMotion } = useReduceMotionStore();
  if (reduceMotion) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
}
