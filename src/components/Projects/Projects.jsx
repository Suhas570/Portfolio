import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, FolderGit2, Sparkles } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import ProjectModal from './ProjectModal';
import './Projects.css';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className="section-header">
          <span className="mono-badge">Featured Work</span>
          <h2 className="section-title">
            Production <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">
            Major enterprise portals, learning management systems, and client solutions engineered by Suhas G.
          </p>
        </div>

        <div className="projects-grid">
          {portfolioData.projects.map((proj, idx) => (
            <motion.div
              key={proj.id}
              className="glass-card project-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6, scale: 1.01 }}
              onClick={() => setSelectedProject(proj)}
            >
              <div>
                <span className="project-card-badge">{proj.category}</span>
                <h3 className="project-title">{proj.title}</h3>
                <p className="project-overview">{proj.overview}</p>

                <ul className="project-highlights">
                  {proj.highlights.slice(0, 3).map((hl, hIdx) => (
                    <li key={hIdx} className="project-highlight-item">
                      <CheckCircle2 size={14} className="text-accent" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="project-tech-group">
                  {proj.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="project-tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-card-action">
                  <span className="btn-case-study">
                    View Case Study <ArrowRight size={16} />
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    Vercel Deployed
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
