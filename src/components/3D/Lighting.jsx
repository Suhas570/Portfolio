import React from 'react';

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.95} color="#FAF9F6" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.6}
        color="#FFFFFF"
        castShadow={false}
      />
      <directionalLight
        position={[-10, -10, -5]}
        intensity={1.1}
        color="#C9A86A"
      />
      <pointLight
        position={[0, 0, 3]}
        intensity={1.3}
        color="#8FAFC4"
        distance={10}
      />
    </>
  );
}
