import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Copy, Check, Send } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './Contact.css';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = `Suhas G - Software Engineer\nEmail: ${portfolioData.personal.email}\nPhone: ${portfolioData.personal.phone}\nLocation: ${portfolioData.personal.location}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          className="glass-card contact-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="mono-badge">Initiate Contact</span>
          <h2 className="contact-headline">
            Let's Build <span className="text-gradient">Something Great</span>
          </h2>
          <p className="contact-subtitle">
            Whether you have a full stack role, enterprise HRMS/LMS project, or client application in mind, feel free to reach out directly.
          </p>

          <div className="contact-cards-grid">
            <a href={`mailto:${portfolioData.personal.email}`} className="contact-info-card">
              <div className="contact-icon-bubble">
                <Mail size={22} />
              </div>
              <span className="contact-info-label">Email Address</span>
              <span className="contact-info-val">{portfolioData.personal.email}</span>
            </a>

            <a href={`tel:${portfolioData.personal.phone}`} className="contact-info-card">
              <div className="contact-icon-bubble">
                <Phone size={22} />
              </div>
              <span className="contact-info-label">Direct Phone / WhatsApp</span>
              <span className="contact-info-val">{portfolioData.personal.phone}</span>
            </a>

            <div className="contact-info-card" style={{ cursor: 'default' }}>
              <div className="contact-icon-bubble">
                <MapPin size={22} />
              </div>
              <span className="contact-info-label">Current Location</span>
              <span className="contact-info-val">{portfolioData.personal.location}</span>
            </div>
          </div>

          <div className="contact-action-group">
            <a href={`mailto:${portfolioData.personal.email}`} className="btn-primary">
              <Send size={18} /> Email Me
            </a>
            <button onClick={handleCopy} className="btn-secondary">
              {copied ? <Check size={18} className="text-accent" /> : <Copy size={18} />}
              {copied ? 'Details Copied!' : 'Copy Contact Info'}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="toast-alert"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Check size={18} className="text-accent" />
            <span>Contact details copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
