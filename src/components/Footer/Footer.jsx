import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-name">{portfolioData.personal.name}</span>
            <span className="footer-role">{portfolioData.personal.title} • Bengaluru, IN</span>
          </div>

          <ul className="footer-nav">
            <li><a href="#hero" className="footer-nav-link">Home</a></li>
            <li><a href="#about" className="footer-nav-link">About</a></li>
            <li><a href="#experience" className="footer-nav-link">Experience</a></li>
            <li><a href="#skills" className="footer-nav-link">Skills</a></li>
            <li><a href="#projects" className="footer-nav-link">Projects</a></li>
            <li><a href="#education" className="footer-nav-link">Education</a></li>
            <li><a href="#contact" className="footer-nav-link">Contact</a></li>
          </ul>

          <button onClick={handleScrollTop} className="back-to-top-btn" aria-label="Back to Top">
            <ArrowUp size={18} />
          </button>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} {portfolioData.personal.name}. All rights reserved.</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
            Built with React • Three.js • GSAP • Lenis
          </p>
        </div>
      </div>
    </footer>
  );
}
