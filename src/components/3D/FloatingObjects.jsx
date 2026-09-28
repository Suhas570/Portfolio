import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function FloatingObjects({ mouse, isMobile = false }) {
  const mainGroupRef = useRef();
  const nodeMeshRef = useRef();
  const ringRef1 = useRef();

  useFrame((state, delta) => {
    const targetX = (mouse.current.x * Math.PI) / 24;
    const targetY = (mouse.current.y * Math.PI) / 24;

    if (mainGroupRef.current) {
      mainGroupRef.current.rotation.y += (targetX - mainGroupRef.current.rotation.y) * 0.04;
      mainGroupRef.current.rotation.x += (-targetY - mainGroupRef.current.rotation.x) * 0.04;
    }

    if (nodeMeshRef.current) {
      nodeMeshRef.current.rotation.x += delta * 0.15;
      nodeMeshRef.current.rotation.y += delta * 0.2;
    }

    if (ringRef1.current) {
      ringRef1.current.rotation.z += delta * 0.1;
      ringRef1.current.rotation.x += delta * 0.08;
    }
  });

  if (isMobile) return null; // Keep mobile 100% clean

  return (
    <group ref={mainGroupRef}>
      {/* Subtle Background Geometric Node (Positioned far in background top-right) */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <group position={[4.2, 1.2, -3]}>
          <mesh ref={nodeMeshRef} scale={0.75}>
            <octahedronGeometry args={[1, 1]} />
            <meshStandardMaterial
              color="#FAF9F6"
              metalness={0.8}
              roughness={0.2}
              transparent
              opacity={0.6}
              wireframe
            />
          </mesh>

          {/* Delicate Champagne Gold Ring */}
          <mesh ref={ringRef1} scale={1.2}>
            <torusGeometry args={[1, 0.012, 16, 100]} />
            <meshStandardMaterial
              color="#C9A86A"
              metalness={0.9}
              roughness={0.1}
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      </Float>

      {/* Subtle Mist Blue Orbiting Spheres (Far background left) */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh position={[-4.5, -1.8, -4]} scale={0.35}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#8FAFC4"
            metalness={0.8}
            roughness={0.2}
            transparent
            opacity={0.5}
            wireframe
          />
        </mesh>
      </Float>

      {/* Tiny Floating Gold Dust Cubes (Far background top-left) */}
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.4}>
        <mesh position={[-3.8, 2.2, -3.5]} scale={0.25}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#C9A86A"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.4}
          />
        </mesh>
      </Float>
    </group>
  );
}
