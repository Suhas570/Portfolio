import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Sparkles, Layers, Code2, Database } from 'lucide-react';
import shot1Img from '../../assets/cinematic_shot1.jpg';
import shot2Img from '../../assets/cinematic_hero.jpg';
import './CinematicProfile3D.css';

export default function CinematicProfile3D() {
  const [currentFrame, setCurrentFrame] = useState(0); // 0 = walking, 1 = standing pose
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const viewportRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    let animationInterval;
    if (isPlaying) {
      animationInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentFrame((f) => (f === 0 ? 1 : 0));
            return 0;
          }
          return prev + 2;
        });
      }, 90);
    }

    const handleMouseMove = (e) => {
      if (isMobile || !viewportRef.current) return;
      const rect = viewportRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rX = (-mouseY / (rect.height / 2)) * 8;
      const rY = (mouseX / (rect.width / 2)) * 8;

      setRotateX(Math.max(-10, Math.min(10, rX)));
      setRotateY(Math.max(-10, Math.min(10, rY)));
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationInterval) clearInterval(animationInterval);
    };
  }, [isPlaying, isMobile]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const restartSequence = () => {
    setCurrentFrame(0);
    setProgress(0);
    setIsPlaying(true);
  };

  return (
    <div className="cinematic-wrapper">
      <motion.div
        ref={viewportRef}
        className="cinematic-viewport"
        animate={
          isMobile
            ? { y: [0, -6, 0] }
            : {
                y: [0, -8, 0],
                rotateX: rotateX,
                rotateY: rotateY,
              }
        }
        transition={
          isMobile
            ? { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            : {
                y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                rotateX: { type: 'spring', stiffness: 200, damping: 20 },
                rotateY: { type: 'spring', stiffness: 200, damping: 20 },
              }
        }
      >
        {/* Soft Gold Rim Accent Border */}
        <div className="cinematic-gold-rim" />

        {/* Subtle Architectural Glass Overlay */}
        <div className="cinematic-overlay-glass" />

        {/* Sequence Image 1: Walking Entry */}
        <motion.img
          src={shot1Img}
          alt="Suhas G - Walking 3D Sequence"
          className="cinematic-frame-img"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: currentFrame === 0 ? 1 : 0,
            transform: currentFrame === 0 ? 'scale(1.02)' : 'scale(1.08)',
          }}
        />

        {/* Sequence Image 2: Confident Standing Pose with 3D Tech Nodes */}
        <motion.img
          src={shot2Img}
          alt="Suhas G - 3D Portfolio Pose"
          className="cinematic-frame-img"
          style={{
            position: 'absolute',
            inset: 0,
            opacity: currentFrame === 1 ? 1 : 0,
            transform: currentFrame === 1 ? 'scale(1.02)' : 'scale(0.98)',
          }}
        />

        {/* Floating Developer Tech Node 1 */}
        <motion.div
          className="cinematic-tech-node node-1"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Code2 size={15} style={{ color: '#C9A86A' }} /> React.js & JS
        </motion.div>

        {/* Floating Developer Tech Node 2 */}
        <motion.div
          className="cinematic-tech-node node-2"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        >
          <Database size={15} style={{ color: '#8FAFC4' }} /> Node & MongoDB
        </motion.div>

        {/* Floating Developer Tech Node 3 */}
        <motion.div
          className="cinematic-tech-node node-3"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        >
          <span className="cinematic-node-dot" /> Full Stack Engineer
        </motion.div>
      </motion.div>

      {/* Cinematic Controls Bar */}
      <div className="cinematic-controls-bar">
        <button
          onClick={togglePlay}
          className="cinematic-play-btn"
          aria-label={isPlaying ? 'Pause 3D Sequence' : 'Play 3D Sequence'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
        </button>

        <div className="cinematic-progress-track">
          <div
            className="cinematic-progress-fill"
            style={{ width: `${currentFrame === 0 ? progress / 2 : 50 + progress / 2}%` }}
          />
        </div>

        <div className="cinematic-badge-label">
          <Sparkles size={14} style={{ color: '#C9A86A' }} />
          <span>3D Cinematic Intro</span>
        </div>

        <button
          onClick={restartSequence}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#68717C',
            cursor: 'pointer',
            marginLeft: '0.75rem',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Restart Intro Sequence"
        >
          <RotateCcw size={15} />
        </button>
      </div>
    </div>
  );
}
