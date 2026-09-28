import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Cpu, Database, Layout, ShieldCheck, Zap } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './About.css';

export default function About() {
  const features = [
    { icon: <Layout className="feature-icon" size={20} />, label: "Responsive Web Development" },
    { icon: <Cpu className="feature-icon" size={20} />, label: "REST API Integration" },
    { icon: <Database className="feature-icon" size={20} />, label: "Database Management" },
    { icon: <ShieldCheck className="feature-icon" size={20} />, label: "Role-Based Authentication" },
    { icon: <Zap className="feature-icon" size={20} />, label: "Performance & Query Optimization" },
    { icon: <CheckCircle2 className="feature-icon" size={20} />, label: "SEO & Application Deployment" },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="section-header">
          <span className="mono-badge">About Me</span>
          <h2 className="section-title">
            Crafting Scalable <span className="text-gradient">Web Applications</span>
          </h2>
          <p className="section-subtitle">
            A software engineer dedicated to building efficient, business-driven full stack applications.
          </p>
        </div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p>
              I am a <span className="highlight">Software Engineer based in Bengaluru, India</span> with 2 years of hands-on experience developing and maintaining modern web applications using JavaScript, React.js, Node.js, Express.js, and MongoDB.
            </p>

            <p>
              My background encompasses contributing to major <span className="highlight">HRMS (Human Resource Management System)</span> and <span className="highlight">Learning Management System (LMS)</span> applications, as well as engineering custom client websites. I specialize in building role-based dashboards, authentication mechanisms, dynamic REST API integrations, and database schemas.
            </p>

            <p>
              Beyond feature engineering, I focus heavily on <span className="highlight">software quality and performance optimization</span>. By implementing caching and database query tuning, I have successfully reduced page load times by up to 40% and server response times by 30%, while mentoring junior engineers and maintaining high code standards.
            </p>

            <div className="about-features">
              {features.map((feat, idx) => (
                <div key={idx} className="feature-pill">
                  {feat.icon}
                  <span>{feat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-stats-grid"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {portfolioData.personal.stats.map((stat, index) => (
              <div key={index} className="glass-card stat-card">
                <div className="stat-number">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-subtitle">{stat.subtitle}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
