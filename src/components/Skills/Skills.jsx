import React from 'react';
import { motion } from 'motion/react';
import { Code2, Database, Globe, Layers, Layout, Server, Wrench } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './Skills.css';

export default function Skills() {
  const categories = [
    {
      title: "Frontend Engineering",
      icon: <Layout size={22} />,
      items: portfolioData.skills.frontend,
    },
    {
      title: "Backend & APIs",
      icon: <Server size={22} />,
      items: portfolioData.skills.backend,
    },
    {
      title: "Programming Languages",
      icon: <Code2 size={22} />,
      items: portfolioData.skills.languages,
    },
    {
      title: "Databases",
      icon: <Database size={22} />,
      items: portfolioData.skills.databases,
    },
    {
      title: "Tools & Deployment",
      icon: <Wrench size={22} />,
      items: portfolioData.skills.toolsAndDeployment,
    },
    {
      title: "Core Specializations",
      icon: <Layers size={22} />,
      items: portfolioData.skills.specializations,
    },
  ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <div className="section-header">
          <span className="mono-badge">Technical Expertise</span>
          <h2 className="section-title">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Engineered software solutions powered by proven modern technologies from the resume.
          </p>
        </div>

        <div className="skills-grid">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.title}
              className="glass-card skill-category-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="skill-category-header">
                <div className="category-icon-wrapper">{cat.icon}</div>
                <h3 className="category-title">{cat.title}</h3>
              </div>

              <div className="skills-pill-group">
                {cat.items.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-chip">
                    <span className="skill-dot"></span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Spoken Languages */}
        <motion.div
          className="languages-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Globe className="text-accent" size={20} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Languages Spoken</h3>
          </div>
          <div className="languages-grid">
            {portfolioData.languagesSpoken.map((lang, idx) => (
              <div key={idx} className="language-card">
                <span className="lang-name">{lang.language}</span>
                <span className="lang-level">{lang.level}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
