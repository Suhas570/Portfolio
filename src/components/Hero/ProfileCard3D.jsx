import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Code2, ShieldCheck, Sparkles } from 'lucide-react';
import profilePhoto from '../../assets/profile.jpg';
import './ProfileCard3D.css';

export default function ProfileCard3D() {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e) => {
      if (isMobile || !cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - cardCenterX;
      const mouseY = e.clientY - cardCenterY;

      // Gentle tilt angles (max ~12 degrees)
      const rX = (-mouseY / (rect.height / 2)) * 12;
      const rY = (mouseX / (rect.width / 2)) * 12;

      setRotateX(Math.max(-15, Math.min(15, rX)));
      setRotateY(Math.max(-15, Math.min(15, rY)));
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isMobile]);

  return (
    <div className="profile-3d-wrapper">
      {/* Background Ambient Glow */}
      <div
        className="profile-ambient-glow"
        style={{
          opacity: isHovered ? 0.95 : 0.65,
          transform: `scale(${isHovered ? 1.1 : 1})`
        }}
      />

      {/* Floating 3D Card Shell */}
      <motion.div
        ref={cardRef}
        className="profile-3d-card"
        animate={
          isMobile
            ? { y: [0, -8, 0] }
            : {
                y: [0, -12, 0],
                rotateX: rotateX,
                rotateY: rotateY,
              }
        }
        transition={
          isMobile
            ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
            : {
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotateX: { type: "spring", stiffness: 200, damping: 20 },
                rotateY: { type: "spring", stiffness: 200, damping: 20 },
              }
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setRotateX(0);
          setRotateY(0);
          setIsHovered(false);
        }}
      >
        {/* Metallic Border Frame */}
        <div className="profile-rim-accent" />

        {/* Dynamic Glass Glare */}
        <div
          className="profile-glare-overlay"
          style={{
            opacity: isHovered ? 0.8 : 0.45,
            backgroundPosition: `${(rotateY + 15) * 3}% ${(rotateX + 15) * 3}%`
          }}
        />

        {/* Real Profile Image (Natural, Unaltered) */}
        <div className="profile-img-container">
          <img
            src={profilePhoto}
            alt="Suhas G - Software Engineer"
            className="profile-real-img"
            loading="eager"
            style={{
              transform: `translateZ(${isHovered ? '35px' : '20px'}) scale(${isHovered ? 1.03 : 1})`
            }}
          />
        </div>

        {/* Floating 3D Glass Badges */}
        <motion.div
          className="profile-badge-float-1"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Sparkles size={14} /> Software Engineer
        </motion.div>

        <motion.div
          className="profile-badge-float-2"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <span className="profile-badge-dot" /> 2+ Years Experience
        </motion.div>
      </motion.div>
    </div>
  );
}
