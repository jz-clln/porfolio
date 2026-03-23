import React, { useState, useEffect } from 'react';
import LiveWorkflow from './LiveWorkflow';
import './Hero.css';

const CYCLING_WORDS = [
  'Voice Agents',
  'AI Agents',
  'Chatbot',
  'Helpdesk Bot',
  'Ecommerce Workflow',
  'Social Media Bot',
  'RAG Pipelines',
  'Dashboard Automation',
  'CRM Automation',
  'Data Pipeline',
  'Invoice System',
];

function CyclingText() {
  const [index, setIndex]     = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex(i => (i + 1) % CYCLING_WORDS.length);
        setVisible(true);
      }, 400);
    }, 2000);
    return () => clearInterval(cycle);
  }, []);

  return (
    <span className={`hero__cycling${visible ? ' hero__cycling--in' : ' hero__cycling--out'}`}>
      {CYCLING_WORDS[index]}
    </span>
  );
}

export default function Hero() {
  const scrollToWork = () => {
    document.getElementById('workflows')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__left">
        <div className="hero__badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          Workflow Automation Expert
        </div>

        <h1 className="hero__h1">
          Your Business on<br />
          <span className="hero__h1--accent">Autopilot</span>
        </h1>

        <h2 className="hero__h2">
          Building <CyclingText />
        </h2>

        <p className="hero__desc">
          From CRMs and chatbots to voice agents, RAG pipelines, e-commerce
          flows, and custom integrations — I build production-ready automation
          systems that connect any software to any workflow.
        </p>

        <div className="hero__btns">
          <a
            href="https://calendly.com/jabez-collano/discovery-call"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Book Free Consultation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <button className="btn-secondary" onClick={scrollToWork}>
            View My Work
          </button>
        </div>
      </div>

      <div className="hero__right">
        <LiveWorkflow />
      </div>
    </section>
  );
}