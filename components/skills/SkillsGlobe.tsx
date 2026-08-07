'use client';

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, AdaptiveEvents, Preload } from '@react-three/drei';
import * as THREE from 'three';
import { useAccentColor } from '@/lib/useAccentColor';
import { useReduceMotionStore } from '@/lib/useReduceMotion';
import { allSkillNames } from '@/lib/data/skills';

function hexToColor(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return new THREE.Color(r, g, b);
}

function SkillTag({
  text,
  position,
  opacity,
}: {
  text: string;
  position: THREE.Vector3;
  opacity: number;
}) {
  const { accent } = useAccentColor();
  const color = hexToColor(accent.value);

  return (
    <Text
      position={position}
      fontSize={0.18}
      color={color}
      anchorX="center"
      anchorY="middle"
      fillOpacity={opacity}
      outlineOpacity={0}
    >
      {text}
    </Text>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const { reduceMotion } = useReduceMotionStore();

  const skillData = useMemo(() => {
    const radius = 2.4;
    const count = allSkillNames.length;
    return allSkillNames.map((name, i) => {
      // Fibonacci sphere distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      const opacity = 0.4 + 0.6 * (z / radius + 1) / 2;
      return { name, position: new THREE.Vector3(x, y, z), opacity };
    });
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current && !reduceMotion) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere renders immediately, independent of text glyph loading */}
      <mesh>
        <sphereGeometry args={[2.4, 20, 20]} />
        <meshBasicMaterial color="white" wireframe transparent opacity={0.08} />
      </mesh>
      <Suspense fallback={null}>
        {skillData.map(({ name, position, opacity }) => (
          <SkillTag key={name} text={name} position={position} opacity={opacity} />
        ))}
      </Suspense>
    </group>
  );
}

export default function SkillsGlobe() {
  return (
    <div
      style={{ position: 'relative', width: '100%', height: '500px', overflow: 'hidden' }}
      aria-label="3D globe showing skills"
      role="img"
    >
      <Canvas
        frameloop="always"
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1} />
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
        <AdaptiveEvents />
        <Preload all />
      </Canvas>
    </div>
  );
}
