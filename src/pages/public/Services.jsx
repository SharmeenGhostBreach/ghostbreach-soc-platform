import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Server, Globe, Lock, Code2, Users } from 'lucide-react';

const Services = () => {
  const serviceList = [
    { title: 'Web Security Assessment', icon: <Globe />, desc: 'Deep dive manual and automated security auditing of complex web platforms.' },
    { title: 'Vulnerability Assessment', icon: <Server />, desc: 'Systematic scans across internal and cloud network perimeters.' },
    { title: 'Penetration Testing', icon: <Lock />, desc: 'Simulated adversary attacks evaluating realistic exploitation vectors.' },
    { title: 'WordPress Security Audit', icon: <ShieldCheck />, desc: 'Comprehensive CMS plugin, database, and hardening inspections.' },
    { title: 'API & Cloud Security', icon: <Code2 />, desc: 'Microservice authorization checks, payload evaluations, and IAM audits.' },
    { title: 'Security Mentoring', icon: <Users />, desc: 'Guiding development teams on secure coding standards and patch cycles.' }
  ];

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      <div>
        <span className="eyebrow">OUR SERVICES</span>
        <h1 className="section-heading">Find the weakness before someone else does.</h1>
        <p className="section-desc">Tailored cybersecurity engagement models built for modern infrastructure.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {serviceList.map((srv, idx) => (
          <div key={idx} className="glass-card">
            <div style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>{srv.icon}</div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{srv.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '20px' }}>{srv.desc}</p>
            <Link to="/contact" className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>Inquire Service</Link>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', padding: '48px', backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '12px' }}>
        <h2>NEED A CUSTOM SECURITY ASSESSMENT?</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px', marginBottom: '24px' }}>Reach out to discuss your specific infrastructure and attack surface requirements.</p>
        <Link to="/contact" className="btn-primary">START A SECURITY DISCUSSION</Link>
      </div>
    </div>
  );
};

export default Services;