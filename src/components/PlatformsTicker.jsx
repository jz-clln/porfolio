import React from 'react';
import { PLATFORMS } from '../data';
import './PlatformsTicker.css';

export default function PlatformsTicker() {
  const doubled = [...PLATFORMS, ...PLATFORMS];
  return (
    <div className="ticker-section">
      <p className="ticker-label">I Integrate &amp; Automate 500+ Platforms</p>
      <div className="ticker-mask">
        <div className="ticker-track">
          {doubled.map((p, i) => (
            <span className="ticker-pill" key={i}>{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
