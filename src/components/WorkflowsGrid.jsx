import React, { useState } from 'react';
import { WORKFLOW_CARDS, WORKFLOW_FILTERS } from '../data';
import './WorkflowsGrid.css';

function WorkflowCard({ card }) {
  return (
    <div className="wf-card">
      <div className="wf-card__top">
        <span className="wf-card__cat" style={{ color: card.catColor }}>{card.category}</span>
        <span className="wf-card__nodes">{card.nodes} nodes</span>
      </div>
      <h3 className="wf-card__title">{card.title}</h3>
      <p className="wf-card__desc">{card.desc}</p>

      <div className="wf-card__flow">
        {card.flow.map((step, i) => (
          <React.Fragment key={i}>
            <span className="wf-card__step">{step}</span>
            {i < card.flow.length - 1 && <span className="wf-card__arrow">→</span>}
          </React.Fragment>
        ))}
      </div>

      <div className="wf-card__tags">
        {card.tags.map((t, i) => <span className="wf-card__tag" key={i}>{t}</span>)}
        {card.extraTags > 0 && <span className="wf-card__tag wf-card__tag--extra">+{card.extraTags}</span>}
      </div>

      <p className="wf-card__result">{card.result}</p>
    </div>
  );
}

export default function WorkflowsGrid() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? WORKFLOW_CARDS
    : WORKFLOW_CARDS.filter(c => c.category === active || c.category.includes(active));

  // Split filters into two rows (match screenshot layout)
  const row1 = WORKFLOW_FILTERS.slice(0, 8);
  const row2 = WORKFLOW_FILTERS.slice(8);

  return (
    <section className="workflows-section" id="workflows">
      <div className="section-header">
        <h2 className="section-title">Workflows I've <span className="accent">Built</span></h2>
        <p className="section-sub">Real automation systems running in production for businesses across industries.</p>
      </div>

      <div className="filter-tabs">
        {row1.map(f => (
          <button
            key={f}
            className={`filter-tab${active === f ? ' filter-tab--active' : ''}`}
            onClick={() => setActive(f)}
          >{f}</button>
        ))}
      </div>
      <div className="filter-tabs filter-tabs--row2">
        {row2.map(f => (
          <button
            key={f}
            className={`filter-tab${active === f ? ' filter-tab--active' : ''}`}
            onClick={() => setActive(f)}
          >{f}</button>
        ))}
      </div>

      <div className="workflows-grid">
        {filtered.map((card, i) => <WorkflowCard key={i} card={card} />)}
      </div>
    </section>
  );
}
