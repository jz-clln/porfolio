import React from 'react';
import './FinalCTA.css';

export default function FinalCTA() {
  return (
    <section className="cta-section">
      <div className="cta-glow" aria-hidden="true" />
      <h2 className="cta-title">
        Ready to <span className="accent">Automate?</span>
      </h2>
      <p className="cta-sub">
        Book a free automation strategy call and discover how I can save you
        hours every week with custom workflow automation.
      </p>
      <button className="btn-primary cta-btn">
        Book Free Consultation
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </button>
    </section>
  );
}
