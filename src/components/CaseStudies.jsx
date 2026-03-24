import React from 'react';
import './CaseStudies.css';
import leadNurturingImg from '../assets/lead_nurturing_system.png';
import bookingSystemImg from '../assets/booking_system.png';

const CASES = [
  {
    title: 'Lead Nurturing System',
    image: leadNurturingImg,
    imageAlt: 'Lead nurturing n8n workflow',
    problem: 'Client was manually qualifying and following up with leads, spending hours sorting form submissions and sending one-by-one emails with no consistent system.',
    solution: 'Built an automated lead nurturing pipeline that triggers from a Tally form, scores and segments each lead, saves to Google Sheets, then branches by fit and delivering a custom lead magnet email for high/medium leads and an acknowledgement for low fits. Includes email preference webhook and Calendly booking integration.',
    tools: ['n8n', 'Tally', 'Google Sheets', 'Gmail', 'Calendly'],
    metrics: [
      { value: '100%', label: 'Leads auto-qualified', accent: true },
      { value: '3x',   label: 'Faster follow-up',    accent: true },
      { value: '0',    label: 'Manual emails sent',  accent: false },
    ],
  },
  {
    title: 'Booking Automation System',
    image: bookingSystemImg,
    imageAlt: 'Booking automation n8n workflow',
    problem: 'Client was managing bookings manually — checking for duplicates, notifying the team, and sending confirmation emails by hand for every new appointment.',
    solution: 'Built an end-to-end booking automation that validates and normalises incoming form data, checks for existing leads and duplicate bookings, creates new leads when needed, and routes new vs. existing bookings. Automatically notifies the team on Slack, sends Gmail confirmation, and triggers a follow-up campaign, all without human intervention.',
    tools: ['n8n', 'Webhooks', 'Supabase', 'Gmail', 'Slack'],
    metrics: [
      { value: '0',    label: 'Duplicate bookings',     accent: false },
      { value: '5min', label: 'Avg. confirmation time', accent: true },
      { value: '100%', label: 'Team notified instantly', accent: true },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section className="cs-section" id="cases">
      <div className="section-header">
        <h2 className="section-title">Case <span className="accent">Studies</span></h2>
        <p className="section-sub">Real projects. Real results. Real screenshots.</p>
      </div>

      <div className="cs-grid">
        {CASES.map((c, i) => (
          <div className="cs-card" key={i}>
            <div className="cs-image">
              <img
                src={c.image}
                alt={c.imageAlt}
                className="cs-img"
              />
            </div>
            <div className="cs-content">
              <h3 className="cs-title">{c.title}</h3>

              <p className="cs-badge cs-badge--problem">PROBLEM</p>
              <p className="cs-text">{c.problem}</p>

              <p className="cs-badge cs-badge--solution">SOLUTION</p>
              <p className="cs-text">{c.solution}</p>

              <div className="cs-tools">
                {c.tools.map((t, j) => (
                  <span className="cs-tool" key={j}>{t}</span>
                ))}
              </div>

              <div className="cs-metrics">
                {c.metrics.map((m, j) => (
                  <div className="cs-metric" key={j}>
                    <p className={`cs-metric-val${m.accent ? ' cs-metric-val--accent' : ''}`}>{m.value}</p>
                    <p className="cs-metric-label">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}