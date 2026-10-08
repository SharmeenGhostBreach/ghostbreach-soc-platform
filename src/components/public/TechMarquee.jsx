import React from 'react';

const techList = [
  "OWASP TOP 10", "BURP SUITE", "RECONNAISSANCE", "WEB SECURITY",
  "API SECURITY", "WORDPRESS SECURITY", "CLOUD SECURITY", "VULNERABILITY MANAGEMENT"
];

const TechMarquee = () => {
  return (
    <div style={{ overflow: 'hidden', borderY: '1px solid var(--border-color)', padding: '16px 0', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ display: 'flex', width: '200%', animation: 'marquee 25s linear infinite' }}>
        {[...techList, ...techList].map((tech, idx) => (
          <div key={idx} style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '1px', color: 'var(--text-muted)' }}>
            {tech} •
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;