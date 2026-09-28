import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ArrowRight, Code2, Sparkles, MousePointer, ChevronDown } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import InteractiveCharacter from './InteractiveCharacter';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const introNameRef = useRef(null);
  const introTitleRef = useRef(null);
  const summaryRef = useRef(null);
  const ctaRef = useRef(null);
  const cursorHintRef = useRef(null);
  const scrollRef = useRef(null);

  const [activeZone, setActiveZone] = useState(null); // 'left' | 'center' | 'right'
  const [contextMessage, setContextMessage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const currentZoneRef = useRef(null);

  // Check mobile & accessibility settings
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    return () => {
      window.removeEventListener('resize', checkMobile);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // GSAP Entry Animation
  useEffect(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.7, delay: 0.2 })
      .to(introNameRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .to(introTitleRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .to(summaryRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .to(cursorHintRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
      .to(scrollRef.current, { opacity: 1, duration: 0.6 }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, [prefersReducedMotion]);

  // Handle cursor zone detection (Desktop)
  const handleMouseMove = useCallback(
    (e) => {
      if (isMobile || prefersReducedMotion || !heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const pct = relativeX / rect.width;

      let newZone = null;
      if (pct < 0.35) {
        newZone = 'left';
      } else if (pct <= 0.65) {
        newZone = 'center';
      } else {
        newZone = 'right';
      }

      // Only state update when crossing zone boundaries
      if (newZone !== currentZoneRef.current) {
        currentZoneRef.current = newZone;
        setActiveZone(newZone);
      }
    },
    [isMobile, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile || prefersReducedMotion) return;
    currentZoneRef.current = null;
    setActiveZone(null);
  }, [isMobile, prefersReducedMotion]);

  const handleMessageChange = useCallback((msg) => {
    setContextMessage(msg);
  }, []);

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="interactive-hero-fullbleed"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 1. Background Layer: Full-bleed Character Canvas Animation */}
      <InteractiveCharacter
        activeZone={activeZone}
        onMessageChange={handleMessageChange}
        isMobile={isMobile}
      />

      {/* 2. Soft Ambient Lighting & Edge Vignette */}
      <div className="hero-light-overlay">
        <div className="hero-pearl-center-glow" />
        <div className="hero-maroon-edge-vignette" />
      </div>

      {/* 3. Contextual Message Bubble Overlay (Centered above character) */}
      <div className={`contextual-message-bubble ${contextMessage ? 'visible' : ''}`}>
        <span className="bubble-text">{contextMessage || ''}</span>
        <div className="bubble-tail" />
      </div>

      {/* 4. Foreground Content Layer (Text Intro & Navigation Space) */}
      <div className="hero-content-container">
        <div className="hero-text-card">
          <div ref={badgeRef} className="hero-badge-wrapper">
            <span className="hero-badge-pill">
              <Sparkles size={14} className="sparkle-icon" /> Full Stack Software Engineer • Bengaluru, IN
            </span>
          </div>

          <h1 ref={introNameRef} className="hero-name-heading">
            I'm <span className="text-gradient-maroon">{portfolioData.personal.name || 'Suhas'}</span>
          </h1>

          <h2 ref={introTitleRef} className="hero-title-sub">
            Web Developer
          </h2>

          <p ref={summaryRef} className="hero-summary-text">
            Software Developer with 2 years of experience building scalable, production web applications using JavaScript, React.js, Node.js, Express.js, and MongoDB. Specialized in HRMS portals, LMS platforms, and responsive client web solutions.
          </p>

          <div ref={ctaRef} className="hero-cta-buttons">
            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, 'projects')}
              className="btn-maroon-primary"
            >
              <Code2 size={18} /> View Projects
            </a>
            <a
              href="#contact"
              onClick={(e) => handleScrollTo(e, 'contact')}
              className="btn-soft-secondary"
            >
              Contact Me
            </a>
          </div>

          {/* Interactive Cursor Indicator */}
          {!isMobile && (
            <div ref={cursorHintRef} className="interactive-cursor-hint">
              <div className="cursor-icon-pulse">
                <MousePointer size={16} className="pointer-svg" />
                <span className="pulse-ring" />
              </div>
              <span className="hint-text">Move cursor to call me !</span>
            </div>
          )}
        </div>
      </div>

      {/* 5. Scroll Down Exploration Indicator */}
      <a
        ref={scrollRef}
        href="#about"
        onClick={(e) => handleScrollTo(e, 'about')}
        className="hero-scroll-down"
        aria-label="Scroll to About section"
      >
        <span className="scroll-label">Explore Portfolio</span>
        <div className="scroll-chevron-bounce">
          <ChevronDown size={18} />
        </div>
      </a>
    </section>
  );
}
