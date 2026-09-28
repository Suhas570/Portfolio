import React from 'react';
import { motion } from 'motion/react';
import { Trophy, TrendingUp, Users } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './Achievements.css';

export default function Achievements() {
  if (!portfolioData.achievements || portfolioData.achievements.length === 0) {
    return null;
  }

  const icons = [<TrendingUp size={24} />, <Users size={24} />];

  return (
    <section id="achievements" className="section">
      <div className="container">
        <div className="section-header">
          <span className="mono-badge">Proven Impact</span>
          <h2 className="section-title">
            Key <span className="text-gradient">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Quantitative performance and leadership metrics strictly verified by candidate experience.
          </p>
        </div>

        <div className="achievements-grid">
          {portfolioData.achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              className="glass-card achievement-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -4 }}
            >
              <div style={{ color: 'var(--accent-cyan)', marginBottom: '1rem' }}>
                {icons[idx % icons.length]}
              </div>
              <div className="achievement-metric">{ach.metric}</div>
              <h3 className="achievement-title">{ach.title}</h3>
              <p className="achievement-desc">{ach.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
