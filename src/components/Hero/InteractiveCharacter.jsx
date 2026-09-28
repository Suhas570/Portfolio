import React, { useEffect, useRef, useState } from 'react';
import './InteractiveCharacter.css';

const TOTAL_FRAMES = 110;

// Frame range definitions
const FRAMES = {
  WORKING_START: 1,
  WORKING_END: 20,
  LEFT_START: 21,
  LEFT_PEAK: 26,
  LEFT_END: 29,
  RIGHT_START: 31,
  RIGHT_PEAK: 37,
  RIGHT_END: 41,
  CENTER_NOTICE_START: 42,
  CENTER_NOTICE_END: 55,
  CENTER_HEADSET_START: 56,
  CENTER_HEADSET_END: 75,
  CENTER_WAVE_START: 76,
  CENTER_WAVE_END: 95,
  CENTER_POINT_START: 96,
  CENTER_POINT_END: 110
};

export default function InteractiveCharacter({ activeZone, onMessageChange, isMobile }) {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // State machine refs for zero-rerender animation loop
  const animStateRef = useRef('WORKING');
  const currentFrameRef = useRef(1);
  const holdTimerRef = useRef(null);

  // 1. Preload all 4K WebP frames (3840x2160) into memory
  useEffect(() => {
    let loadedCount = 0;
    const imgArray = new Array(TOTAL_FRAMES);

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, '0');
      img.src = `/character-frames/frame_${numStr}.webp`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = imgArray;
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        // Fallback to original JPG if webp fails
        img.src = `/character-frames/ezgif-frame-${numStr}.jpg`;
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = imgArray;
          setImagesLoaded(true);
        }
      };

      imgArray[i - 1] = img;
    }
  }, []);

  // 2. Zone change handler trigger
  useEffect(() => {
    if (!imagesLoaded) return;

    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }

    if (isMobile) {
      // Auto-trigger full greeting sequence on mobile after load
      animStateRef.current = 'CENTER_SEQUENCE';
      currentFrameRef.current = FRAMES.CENTER_NOTICE_START;
      return;
    }

    if (activeZone === 'left') {
      if (animStateRef.current !== 'LOOK_LEFT' && animStateRef.current !== 'HOLD_LEFT') {
        animStateRef.current = 'LOOK_LEFT';
        currentFrameRef.current = FRAMES.LEFT_START;
        onMessageChange('Anyone here on the left?');
      }
    } else if (activeZone === 'right') {
      if (animStateRef.current !== 'LOOK_RIGHT' && animStateRef.current !== 'HOLD_RIGHT') {
        animStateRef.current = 'LOOK_RIGHT';
        currentFrameRef.current = FRAMES.RIGHT_START;
        onMessageChange('Anyone here on the right?');
      }
    } else if (activeZone === 'center') {
      if (animStateRef.current !== 'CENTER_SEQUENCE' && animStateRef.current !== 'HOLD_CENTER') {
        animStateRef.current = 'CENTER_SEQUENCE';
        currentFrameRef.current = FRAMES.CENTER_NOTICE_START;
        onMessageChange("Hey, it's you!");
      }
    }
  }, [activeZone, imagesLoaded, isMobile, onMessageChange]);

  // 3. Ultra-HD 4K Canvas Render Ticker with requestAnimationFrame (~24 FPS)
  useEffect(() => {
    if (!imagesLoaded) return;

    let animFrameId;
    let lastFrameTime = 0;
    const FRAME_INTERVAL = 1000 / 24; // 24 FPS target

    const render = (now) => {
      animFrameId = requestAnimationFrame(render);

      if (now - lastFrameTime < FRAME_INTERVAL) return;
      lastFrameTime = now;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const state = animStateRef.current;
      let frame = currentFrameRef.current;

      // State machine transitions
      switch (state) {
        case 'WORKING':
          frame++;
          if (frame > FRAMES.WORKING_END) {
            frame = FRAMES.WORKING_START;
          }
          break;

        case 'LOOK_LEFT':
          frame++;
          if (frame >= FRAMES.LEFT_END) {
            frame = FRAMES.LEFT_END;
            animStateRef.current = 'HOLD_LEFT';
            holdTimerRef.current = setTimeout(() => {
              animStateRef.current = 'RETURN_LEFT';
              onMessageChange(null);
            }, 2500);
          }
          break;

        case 'HOLD_LEFT':
          frame = FRAMES.LEFT_PEAK;
          break;

        case 'RETURN_LEFT':
          frame--;
          if (frame <= FRAMES.LEFT_START) {
            frame = FRAMES.WORKING_START;
            animStateRef.current = 'WORKING';
          }
          break;

        case 'LOOK_RIGHT':
          frame++;
          if (frame >= FRAMES.RIGHT_END) {
            frame = FRAMES.RIGHT_END;
            animStateRef.current = 'HOLD_RIGHT';
            holdTimerRef.current = setTimeout(() => {
              animStateRef.current = 'RETURN_RIGHT';
              onMessageChange(null);
            }, 2500);
          }
          break;

        case 'HOLD_RIGHT':
          frame = FRAMES.RIGHT_PEAK;
          break;

        case 'RETURN_RIGHT':
          frame--;
          if (frame <= FRAMES.RIGHT_START) {
            frame = FRAMES.WORKING_START;
            animStateRef.current = 'WORKING';
          }
          break;

        case 'CENTER_SEQUENCE':
          frame++;
          if (frame >= FRAMES.CENTER_NOTICE_START && frame < FRAMES.CENTER_HEADSET_START) {
            onMessageChange("Hey, it's you!");
          } else if (frame >= FRAMES.CENTER_HEADSET_START && frame < FRAMES.CENTER_POINT_START) {
            onMessageChange("Hiiii!");
          } else if (frame >= FRAMES.CENTER_POINT_START) {
            onMessageChange("Check out the portfolio");
          }

          if (frame >= FRAMES.CENTER_POINT_END) {
            frame = FRAMES.CENTER_POINT_END;
            animStateRef.current = 'HOLD_CENTER';
            holdTimerRef.current = setTimeout(() => {
              animStateRef.current = 'RETURN_CENTER';
              onMessageChange(null);
            }, 3500);
          }
          break;

        case 'HOLD_CENTER':
          frame = FRAMES.CENTER_POINT_END;
          break;

        case 'RETURN_CENTER':
          frame--;
          if (frame <= FRAMES.WORKING_START) {
            frame = FRAMES.WORKING_START;
            animStateRef.current = 'WORKING';
          }
          break;

        default:
          frame = FRAMES.WORKING_START;
      }

      currentFrameRef.current = frame;

      // Draw 4K Ultra-HD frame to canvas with crisp DPI scaling
      const img = imagesRef.current[frame - 1];
      if (img && img.complete) {
        // High DPI multiplier (supports 4K display density)
        const dpr = Math.max(window.devicePixelRatio || 1, 2);
        const rect = canvas.getBoundingClientRect();
        
        if (rect.width > 0 && rect.height > 0) {
          const targetW = Math.floor(rect.width * dpr);
          const targetH = Math.floor(rect.height * dpr);

          if (canvas.width !== targetW || canvas.height !== targetH) {
            canvas.width = targetW;
            canvas.height = targetH;
          }

          ctx.save();
          ctx.scale(dpr, dpr);
          
          // Ultra-HD rendering quality settings
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          
          ctx.clearRect(0, 0, rect.width, rect.height);

          // Cover scaling math preserving character composition & 4K sharpness
          const imgWidth = img.width;   // 3840 px
          const imgHeight = img.height; // 2160 px
          const scale = Math.max(rect.width / imgWidth, rect.height / imgHeight);
          
          const drawWidth = imgWidth * scale;
          const drawHeight = imgHeight * scale;
          
          // Center horizontally
          const offsetX = (rect.width - drawWidth) / 2;
          
          // Anchor top/center vertically so head is never cut off
          let offsetY = (rect.height - drawHeight) * 0.45;
          if (offsetY > 0) offsetY = 0;

          ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          ctx.restore();
        }
      }
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
      }
    };
  }, [imagesLoaded, onMessageChange]);

  return (
    <div className="fullbleed-character-wrapper">
      {!imagesLoaded && (
        <div className="character-loader">
          <div className="loader-spinner" />
          <p className="loader-text">Loading 4K Ultra-HD Hero Animation... {loadProgress}%</p>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className={`fullbleed-character-canvas ${imagesLoaded ? 'loaded' : ''}`}
        aria-label="4K Ultra-HD Interactive Character Hero"
      />
    </div>
  );
}
