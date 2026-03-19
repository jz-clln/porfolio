import React from 'react';
import './Footer.css';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__left">
        © 2025 Workflow Automation Expert
      </div>

      <nav className="footer__links" aria-label="Footer navigation">
        <a href="#hero">Privacy</a>
        <a href="#hero">Terms</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="footer__socials">
        <a
          href="https://www.facebook.com/jabezcollano"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="footer__social-link"
        >
          <FacebookIcon />
        </a>
        <a
          href="mailto:jabezcollano@gmail.com"
          aria-label="Email"
          className="footer__social-link"
        >
          <EmailIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/jabez-clln/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="footer__social-link"
        >
          <LinkedInIcon />
        </a>
      </div>
    </footer>
  );
}