import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Award, Calendar, Landmark } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './Education.css';

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <div className="section-header">
          <span className="mono-badge">Academic Background</span>
          <h2 className="section-title">
            Education & <span className="text-gradient">Qualifications</span>
          </h2>
          <p className="section-subtitle">
            Formal engineering degree and pre-university science background.
          </p>
        </div>

        <div className="education-grid">
          {portfolioData.education.map((edu, idx) => (
            <motion.div
              key={edu.degree}
              className="glass-card education-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
            >
              <div>
                <div className="edu-icon-badge">
                  <GraduationCap size={24} />
                </div>
                <h3 className="edu-degree">{edu.degree}</h3>
                <div className="edu-institution">
                  <Landmark size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />
                  {edu.institution}
                </div>
                <div className="edu-period">
                  <Calendar size={13} style={{ display: 'inline', marginRight: '0.4rem' }} />
                  {edu.period}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                  {edu.details}
                </p>
              </div>

              {edu.grade && (
                <div>
                  <span className="edu-cgpa">
                    <Award size={14} className="text-accent" /> Score: {edu.grade}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
