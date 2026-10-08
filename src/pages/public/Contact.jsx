import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px' }}>
      <div style={{ marginBottom: '48px' }}>
        <span className="eyebrow">GET IN TOUCH</span>
        <h1 className="section-heading">LET'S SECURE WHAT MATTERS.</h1>
        <p className="section-desc">Reach out to our security team to discuss your assessment needs or platform questions.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
        <div>
          <div className="glass-card" style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail color="var(--accent-primary)" /> Contact Details
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '8px' }}>
              Email: <a href="mailto:ghostbreachh@gmail.com" style={{ color: 'var(--accent-primary)' }}>ghostbreachh@gmail.com</a>
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              Operations: Security Assessments, SOC Platform Inquiries, Mentoring.
            </p>
          </div>

          <div className="glass-card">
            <h4 style={{ marginBottom: '12px' }}>WHAT HAPPENS NEXT?</h4>
            <ol style={{ paddingLeft: '20px', color: 'var(--text-muted)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>We evaluate your operational scope.</li>
              <li>We perform surface area reconnaissance.</li>
              <li>We establish assessment goals and rules of engagement.</li>
            </ol>
          </div>
        </div>

        <div className="glass-card">
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--status-success)' }}>
              <CheckCircle size={48} style={{ margin: '0 auto 16px' }} />
              <h3 style={{ marginBottom: '8px' }}>Inquiry Received</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Our team will review your scope and get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem' }}>Full Name</label>
                <input type="text" required style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem' }}>Business Email</label>
                <input type="email" required style={{ width: '100%' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem' }}>Service Requested</label>
                <select style={{ width: '100%' }}>
                  <option>Web Security Assessment</option>
                  <option>Vulnerability Assessment</option>
                  <option>Penetration Testing</option>
                  <option>WordPress Security Audit</option>
                  <option>SOC Platform Inquiry</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.875rem' }}>Scope / Message</label>
                <textarea rows="4" required style={{ width: '100%' }}></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center' }}>SEND SECURITY INQUIRY</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;