import React from 'react';
import { TIMELINE_STEPS } from '../data';
import './HowItWorks.css';

export default function HowItWorks() {
  return (
    <section className="how-section" id="process">
      <div className="section-header">
        <h2 className="section-title">
          How It <span className="accent">Works</span>
        </h2>
        <p className="section-sub">
          A proven 8-step process from first call to full handover.
        </p>
      </div>

      <div className="timeline">
        <div className="timeline__line" aria-hidden="true" />

        {TIMELINE_STEPS.map((step, index) => (
          <div
            key={step.num}
            className={`timeline__item timeline__item--${step.side}`}
            style={{ '--step-delay': `${index * 0.45}s` }}
          >
            {/* Card only */}
            <div className="timeline__card">
              <div className="timeline__icon">{step.icon}</div>
              <div className="timeline__text">
                <p className="timeline__title">{step.title}</p>
                <p className="timeline__sub">{step.sub}</p>
              </div>
            </div>

            {/* Orb pinned to middle line */}
            <div className="timeline__orb-wrap" aria-hidden="true">
              <div className="timeline__orb-connector" />
              <div className="timeline__num">{step.num}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}