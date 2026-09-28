import React, { useRef, useState, useEffect, Component } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Lighting from './Lighting';
import FloatingObjects from './FloatingObjects';
import Particles from './Particles';
import Camera from './Camera';
import FallbackCanvas from './FallbackCanvas';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn("WebGL Scene rendering failed, falling back to 2D background:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function Scene() {
  const mouse = useRef({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    // Mobile viewport detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // WebGL availability check
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }

    // Mouse movement listener
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!webglSupported) {
    return <FallbackCanvas />;
  }

  return (
    <ErrorBoundary fallback={<FallbackCanvas />}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5.5], fov: 45 }}
          gl={{
            antialias: !isMobile,
            powerPreference: 'high-performance',
            alpha: true
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
        >
          <Lighting />
          <Camera mouse={mouse} />
          <FloatingObjects mouse={mouse} isMobile={isMobile} />
          <Particles count={isMobile ? 35 : 75} isMobile={isMobile} />

          {/* Subtle Postprocessing for desktop / performant devices */}
          {!isMobile && (
            <EffectComposer disableNormalPass>
              <Bloom
                intensity={0.35}
                luminanceThreshold={0.7}
                luminanceSmoothing={0.9}
              />
              <Vignette eskil={false} offset={0.1} darkness={0.6} />
            </EffectComposer>
          )}
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
