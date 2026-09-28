import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Award } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './Certifications.css';

export default function Certifications() {
  if (!portfolioData.certifications || portfolioData.certifications.length === 0) {
    return null;
  }

  return (
    <section id="certifications" className="section">
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', margin: '0 auto 3rem auto' }}>
          <span className="mono-badge">Verified Credential</span>
          <h2 className="section-title">
            Professional <span className="text-gradient">Certifications</span>
          </h2>
        </div>

        {portfolioData.certifications.map((cert, idx) => (
          <motion.div
            key={idx}
            className="glass-card cert-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -4 }}
          >
            <div className="cert-icon-wrapper">
              <ShieldCheck size={28} />
            </div>

            <div>
              <h3 className="cert-title">{cert.title}</h3>
              <div className="cert-issuer">{cert.issuer}</div>
              <p className="cert-description">{cert.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
