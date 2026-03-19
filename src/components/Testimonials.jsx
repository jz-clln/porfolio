import React from 'react';
import { TESTIMONIALS_ROW1, TESTIMONIALS_ROW2 } from '../data';
import './Testimonials.css';

function TestimonialCard({ t }) {
  return (
    <div className="tc-card">
      <div className="tc-top">
        <div className="tc-stars">
          {[...Array(5)].map((_, i) => <span key={i} className="tc-star">★</span>)}
        </div>
        <span className="tc-quote-icon">"</span>
      </div>
      <p className="tc-text">{t.text}</p>
      <p className="tc-name">{t.name}</p>
      <p className="tc-role">{t.role}</p>
    </div>
  );
}

function TestimonialRow({ items, direction }) {
  // Duplicate for seamless loop
  const all = [...items, ...items, ...items];
  return (
    <div className="tc-mask">
      <div className={`tc-track tc-track--${direction}`}>
        {all.map((t, i) => <TestimonialCard key={i} t={t} />)}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="section-header" style={{ padding: '0 60px' }}>
        <h2 className="section-title">What Clients <span className="accent">Say</span></h2>
        <p className="section-sub">Real feedback from businesses running my automations in production.</p>
      </div>

      <TestimonialRow items={TESTIMONIALS_ROW1} direction="left" />
      <TestimonialRow items={TESTIMONIALS_ROW2} direction="right" />
    </section>
  );
}
