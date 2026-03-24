import React, { useState } from 'react';
import './ContactForm.css';

const WEBHOOK_URL = 'https://n8n.srv834305.hstgr.cloud/webhook/website-contact-form';

export default function ContactForm() {
  const [form, setForm]       = useState({ email: '', message: '' });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.message) return;

    setLoading(true);
    setError('');

    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          message: form.message,
          submitted_at: new Date().toISOString(),
        }),
      });
      setSent(true);
    } catch (err) {
      setError('Something went wrong. Please try again or email me directly at jabezcollano@gmail.com');
    } finally {
      setLoading(false);
    }
  };

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
                disabled={loading}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="message">What would you like automated?</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Describe your workflow..."
                value={form.message}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            {error && <p className="form-error">{error}</p>}

            <button type="submit" className="form-submit" disabled={loading}>
              {loading ? (
                <>
                  <span className="form-spinner" />
                  Sending...
                </>
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