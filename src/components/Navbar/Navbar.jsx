import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Section spy
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="navbar-logo">
          <span className="navbar-logo-dot"></span>
          <span>{portfolioData.personal.name}</span>
        </a>

        {/* Desktop Links */}
        <nav aria-label="Main Navigation">
          <ul className="navbar-links">
            {navItems.map((item) => {
              const sectionId = item.href.substring(1);
              const isActive = activeSection === sectionId;
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`navbar-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="btn-primary navbar-cta"
          style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
        >
          Let's Talk <ArrowUpRight size={16} />
        </a>

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Menu Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="navbar-menu-mobile"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="mobile-nav-link"
                >
                  {item.label}
                </a>
              ))}
              <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  Get In Touch
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
