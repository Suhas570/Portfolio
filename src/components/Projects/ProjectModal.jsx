import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, Code, Layers, Server, CloudCheck } from 'lucide-react';
import './Projects.css';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="modal-overlay" onClick={onClose}>
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose} aria-label="Close Modal">
            <X size={20} />
          </button>

          <div className="modal-header">
            <span className="project-card-badge">{project.category}</span>
            <h3 className="modal-title">{project.title}</h3>
          </div>

          <div className="modal-section-heading">
            <Layers size={18} /> Project Context & Overview
          </div>
          <p className="modal-body-text">{project.overview}</p>

          <div className="modal-section-heading">
            <CheckCircle size={18} /> Detailed Contributions & Architecture
          </div>
          <p className="modal-body-text">{project.details}</p>

          <div className="modal-section-heading">
            <Code size={18} /> Core Key Features
          </div>
          <ul className="project-highlights">
            {project.highlights.map((h, idx) => (
              <li key={idx} className="project-highlight-item" style={{ fontSize: '0.95rem' }}>
                <CheckCircle size={16} className="text-accent" />
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <div className="modal-section-heading">
            <Server size={18} /> Technologies & Stack
          </div>
          <div className="project-tech-group" style={{ marginTop: '0.5rem' }}>
            {project.technologies.map((t, idx) => (
              <span key={idx} className="project-tech-badge" style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem' }}>
                {t}
              </span>
            ))}
          </div>

          <div className="modal-deployment-info">
            <CloudCheck size={22} className="text-accent" />
            <div>
              <strong style={{ color: 'var(--text-primary)' }}>Deployment Status:</strong> Deployed and maintained on <strong>{project.deployment}</strong>. Production-tested workflows and API integrations.
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
