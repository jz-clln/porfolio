import React, { useState, useRef } from 'react';
import './ContactForm.css';

const WEBHOOK_URL = process.env.REACT_APP_CONTACT_WEBHOOK;

// Sanitize input — strip HTML tags and trim whitespace
function sanitize(str) {
  return str.replace(/<[^>]*>/g, '').trim();
}

// Basic email format validation
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const RATE_LIMIT_SECONDS = 30;

export default function ContactForm() {
  const [form, setForm]         = useState({ email: '', message: '', honeypot: '' });
  const [sent, setSent]         = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');
  const [cooldown, setCooldown] = useState(0);
  const timerRef                = useRef(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const startCooldown = () => {
    setCooldown(RATE_LIMIT_SECONDS);
    timerRef.current = setInterval(() => {
      setCooldown(prev => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check — bots fill this hidden field, humans don't
    if (form.honeypot) return;

    // Rate limit check
    if (cooldown > 0) return;

    // Sanitize inputs
    const email   = sanitize(form.email);
    const message = sanitize(form.message);

    // Validation
    if (!email || !message) return;
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (message.length < 10) {
      setError('Please write a bit more about what you need.');
      return;
    }
    if (message.length > 2000) {
      setError('Message is too long. Please keep it under 2000 characters.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          message,
          submitted_at: new Date().toISOString(),
        }),
      });
      setSent(true);
    } catch (err) {
      setError('Something went wrong. Please try again or email me directly at jabezcollano@gmail.com');
      startCooldown();
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = loading || cooldown > 0;

  return (
    <section className="contact-section" id="contact">
      <div className="section-header">
        <h2 className="section-title">Let's Build <span className="accent">Your System</span></h2>
        <p className="section-sub">Tell me what you'd like automated. I'll respond within 24 hours.</p>
      </div>

      <div className="contact-card">
        {sent ? (
          <div className="contact-success">
            <span className="contact-success-icon">✔</span>
            <p className="contact-success-title">Message sent!</p>
            <p className="contact-success-sub">I'll get back to you within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>

            {/* Honeypot — hidden from real users, bots fill it */}
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleChange}
              autoComplete="off"
              tabIndex="-1"
              aria-hidden="true"
              className="form-honeypot"
            />

            <div className="form-group">
              <label className="form-label" htmlFor="email">Your email</label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
                disabled={isDisabled}
                maxLength={254}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">
                What would you like automated?
                <span className="form-char-count">{form.message.length}/2000</span>
              </label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Describe your workflow..."
                value={form.message}
                onChange={handleChange}
                required
                disabled={isDisabled}
                maxLength={2000}
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="form-submit" disabled={isDisabled}>
              {loading ? (
                <><span className="form-spinner" />Sending...</>
              ) : cooldown > 0 ? (
                `Please wait ${cooldown}s...`
              ) : (
                'Send Message'
              )}
            </button>

          </form>
        )}
      </div>
    </section>
  );
}