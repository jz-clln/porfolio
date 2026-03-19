import React, { useState } from 'react';
import './ContactForm.css';

export default function ContactForm() {
  const [form, setForm] = useState({ email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.message) return;
    setSent(true);
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
            <span className="contact-success-icon">✅</span>
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
              />
            </div>
            <button type="submit" className="form-submit">Send Message</button>
          </form>
        )}
      </div>
    </section>
  );
}
