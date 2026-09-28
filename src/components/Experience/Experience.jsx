import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './Experience.css';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <div className="section-header">
          <span className="mono-badge">Career Track</span>
          <h2 className="section-title">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="section-subtitle">
            Demonstrated track record of delivering enterprise web applications and client solutions.
          </p>
        </div>

        <div className="timeline-container">
          {portfolioData.experience.map((exp) => (
            <motion.div
              key={exp.id}
              className="timeline-item"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="timeline-dot"></div>
              
              <div className="glass-card experience-card">
                <div className="experience-header">
                  <div>
                    <h3 className="exp-company">
                      <Briefcase size={20} className="text-accent" />
                      {exp.company}
                    </h3>
                    <div className="exp-title">{exp.title}</div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    <span className="exp-period">
                      <Calendar size={14} style={{ display: 'inline', marginRight: '0.35rem' }} />
                      {exp.period}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={12} /> {exp.location}
                    </span>
                  </div>
                </div>

                <ul className="exp-list">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="exp-item">
                      {resp}
                    </li>
                  ))}
                </ul>

                <div className="tech-tags">
                  {exp.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
