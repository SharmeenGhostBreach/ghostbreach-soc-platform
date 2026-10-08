import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const caseStudies = [
  { category: 'WEB', title: 'Aegis Logistics — Simulated Breach Assessment', desc: 'Identified critical access control flaws in perimeter API gateways.', result: 'Remediated 3 high severity vulnerabilities.' },
  { category: 'WEB', title: 'Web Application Security Audit', desc: 'Evaluation of authentication mechanics and persistent cross-site scripting risks.', result: 'Fully patched & verified.' },
  { category: 'API', title: 'API Gateway Authorization Review', desc: 'Assessed OAuth2 scopes and authorization token leakage risks.', result: 'Hardened token handling.' },
  { category: 'WORDPRESS', title: 'WordPress CMS Security Hardening', desc: 'Plugin vulnerability mitigation and secure database routing.', result: 'Zero known vulnerabilities remaining.' }
];

const Work = () => {
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL' ? caseStudies : caseStudies.filter(c => c.category === filter);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      <div>
        <span className="eyebrow">SECURITY CASE STUDIES</span>
        <h1 className="section-heading">SECURITY WORK THAT TURNS FINDINGS INTO ACTION</h1>
        <p className="section-desc">Simulated operational engagements and security posture enhancements.</p>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        {['ALL', 'WEB', 'API', 'WORDPRESS'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={filter === cat ? 'btn-primary' : 'btn-secondary'}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {filtered.map((study, idx) => (
          <div key={idx} className="glass-card">
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 700 }}>{study.category} • SIMULATED</span>
            <h3 style={{ margin: '8px 0' }}>{study.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>{study.desc}</p>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '0.875rem', color: 'var(--status-success)' }}>
              Result: {study.result}
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <h2>HAVE A UNIQUE SECURITY CHALLENGE?</h2>
        <p style={{ color: 'var(--text-muted)', margin: '8px 0 24px' }}>Let's discuss how our security assessment models can harden your digital footprint.</p>
        <Link to="/contact" className="btn-primary">CONTACT SECURITY TEAM</Link>
      </div>
    </div>
  );
};

export default Work;