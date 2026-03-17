'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingOrb({
  position,
  color,
  speed,
  size,
  distort = 0.4,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  size: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed) * 0.002;
  });

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.5}
          distort={distort}
          speed={3}
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

function GlowRing({ position, color, size, speed }: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
    meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.15;
  });

  return (
    <Float speed={speed * 0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[size, 0.04, 16, 100]} />
        <meshStandardMaterial color={color} transparent opacity={0.3} emissive={color} emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
}

function Particles({ count = 150 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const palette = [
      new THREE.Color('#2563eb'), // blue-600
      new THREE.Color('#3b82f6'), // blue-500
      new THREE.Color('#1d4ed8'), // blue-700
      new THREE.Color('#f97316'), // orange-500
      new THREE.Color('#60a5fa'), // blue-400
      new THREE.Color('#fb923c'), // orange-400
    ];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      const c = palette[Math.floor(Math.random() * palette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    points.current.rotation.y = state.clock.elapsedTime * 0.03;
    points.current.rotation.x = state.clock.elapsedTime * 0.015;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

export default function ThreeScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#2563eb" />
        <pointLight position={[5, -3, 3]} intensity={0.5} color="#f97316" />

        {/* Main orbs — blue + orange */}
        <FloatingOrb position={[-5, 2.5, -2]} color="#2563eb" speed={1.2} size={2} distort={0.5} />
        <FloatingOrb position={[5, -1.5, -3]} color="#3b82f6" speed={0.8} size={1.6} distort={0.4} />
        <FloatingOrb position={[1.5, 3.5, -4]} color="#1d4ed8" speed={1} size={1.2} distort={0.35} />
        <FloatingOrb position={[-3, -3, -2]} color="#f97316" speed={0.6} size={1} distort={0.3} />
        <FloatingOrb position={[4, 2, -5]} color="#2563eb" speed={0.9} size={1.4} distort={0.45} />
        <FloatingOrb position={[-1, -1, -6]} color="#60a5fa" speed={0.7} size={0.9} distort={0.3} />
        <FloatingOrb position={[2, -3, -4]} color="#fb923c" speed={1.1} size={0.7} distort={0.35} />

        {/* Glow rings */}
        <GlowRing position={[-3, 1, -3]} color="#2563eb" size={2.5} speed={0.8} />
        <GlowRing position={[3, -1, -4]} color="#f97316" size={1.8} speed={0.6} />

        <Particles count={200} />
      </Canvas>
    </div>
  );
}
