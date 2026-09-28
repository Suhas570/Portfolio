import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Experience from './components/Experience/Experience';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Education from './components/Education/Education';
import Certifications from './components/Certifications/Certifications';
import Achievements from './components/Achievements/Achievements';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="portfolio-app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
