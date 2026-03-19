import React, { useState } from 'react';
import './ChatWidget.css';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="chat-widget"
        onClick={() => setOpen(!open)}
        aria-label="Open chat"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      {open && (
        <div className="chat-popup">
          <div className="chat-popup__header">
            <div className="chat-popup__avatar">🤖</div>
            <div>
              <p className="chat-popup__name">Jabez</p>
              <p className="chat-popup__status"><span className="chat-popup__dot"/>AI Assistant</p>
            </div>
          </div>
          <div className="chat-popup__body">
            <div className="chat-bubble">
              👋 Hi! I'm the automation assistant. What would you like to automate today?
            </div>
          </div>
          <div className="chat-popup__input-row">
            <input className="chat-popup__input" placeholder="Type a message..." />
            <button className="chat-popup__send">→</button>
          </div>
        </div>
      )}
    </>
  );
}
