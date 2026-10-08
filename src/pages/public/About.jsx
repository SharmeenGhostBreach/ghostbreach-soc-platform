import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const About = () => {
  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      <div>
        <span className="eyebrow">ABOUT GHOSTBREACH</span>
        <h1 className="section-heading">Security starts with understanding how systems fail.</h1>
        <p className="section-desc">
          GhostBreach was engineered to transform complex technical vulnerability findings into structured, trackable, and actionable SOC intelligence.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--accent-primary)' }}>Our Methodology</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            We leverage offensive testing tactics aligned with the OWASP framework, manual inspection, and continuous monitoring paradigms to reveal true architectural exposure.
          </p>
        </div>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', color: 'var(--accent-primary)' }}>Our Mission</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Make enterprise security assessment and posture tracking completely transparent, actionable, and achievable for modern operational teams.
          </p>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '40px' }}>
        <h2 style={{ marginBottom: '24px' }}>The Core Pillars</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
          <div>
            <h4 style={{ color: 'var(--accent-primary)', marginBottom: '8px' }}>LEARN</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Continuous research into threat vectors and perimeter surface weaknesses.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--status-success)', marginBottom: '8px' }}>SECURE</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Direct execution of patches and strategic risk mitigations.</p>
          </div>
          <div>
            <h4 style={{ color: 'var(--status-warning)', marginBottom: '8px' }}>DEFEND</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Ongoing monitoring and incident management tracking.</p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h2 className="section-heading">Ready to understand your security posture?</h2>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '24px' }}>
          <Link to="/contact" className="btn-primary">Contact Security Team</Link>
          <Link to="/login" className="btn-secondary">Access SOC Portal</Link>
        </div>
      </div>
    </div>
  );
};

export default About;