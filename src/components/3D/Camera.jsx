import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Camera({ mouse }) {
  const targetPos = useRef(new THREE.Vector3(0, 0, 5.5));

  useFrame((state) => {
    // Subtle mouse sway
    targetPos.current.x = mouse.current.x * 0.5;
    targetPos.current.y = mouse.current.y * 0.3;
    
    state.camera.position.lerp(targetPos.current, 0.04);
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
