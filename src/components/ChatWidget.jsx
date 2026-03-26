import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';

const WEBHOOK_URL = process.env.REACT_APP_CHAT_WEBHOOK;

const WELCOME_MESSAGE = {
  role: 'assistant',
  text: "👋 Hi! I'm Jabez's AI assistant. I can answer questions about his automation services, past projects, pricing, and how he can help your business. What would you like to know?",
};


// Converts markdown links [text](url) and bare URLs into clickable <a> tags
function renderText(text) {
  const parts = [];
  let lastIndex = 0;
  const combined = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s)]+)/g;
  let match;

  while ((match = combined.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    if (match[1] && match[2]) {
      // Markdown link
      parts.push(
        <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer" className="chat-link">
          {match[1]}
        </a>
      );
    } else {
      // Bare URL
      parts.push(
        <a key={match.index} href={match[0]} target="_blank" rel="noopener noreferrer" className="chat-link">
          {match[0]}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export default function ChatWidget() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef             = useRef(null);
  const inputRef              = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({ role: m.role, content: m.text })),
        }),
      });

      // Wait 6 seconds so typing indicator shows before reply appears
      await new Promise(resolve => setTimeout(resolve, 6000));

      const data = await res.json();

      // Handle different n8n response shapes
      const reply =
        data?.output ||
        data?.text ||
        data?.message ||
        data?.response ||
        data?.[0]?.output ||
        data?.[0]?.text ||
        "I'm sorry, I didn't get a response. Please try again.";

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', text: "Sorry, I'm having trouble connecting right now. Please try again shortly." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

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
          {/* Header */}
          <div className="chat-popup__header">
            <div className="chat-popup__avatar">🤖</div>
            <div>
              <p className="chat-popup__name">Jabez's Assistant</p>
              <p className="chat-popup__status">
                <span className="chat-popup__dot"/>AI-Powered Support
              </p>
            </div>
            <button className="chat-popup__close" onClick={() => setOpen(false)} aria-label="Close chat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="chat-popup__body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble chat-bubble--${msg.role}`}>
                {renderText(msg.text)}
              </div>
            ))}

            {loading && (
              <div className="chat-bubble chat-bubble--assistant chat-bubble--typing">
                <span/><span/><span/>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chat-popup__input-row">
            <input
              ref={inputRef}
              className="chat-popup__input"
              placeholder="Ask me anything..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={loading}
            />
            <button
              className="chat-popup__send"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}