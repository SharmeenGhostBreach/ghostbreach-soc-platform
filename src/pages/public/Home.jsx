import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, CheckCircle2, Lock, Cpu, Eye, AlertTriangle, FileCode2 } from 'lucide-react';
import HeroTerminal from '../../components/public/HeroTerminal';
import TechMarquee from '../../components/public/TechMarquee';

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '80px', paddingBottom: '40px' }}>
      
      {/* SECTION 1 — HERO */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
        <div>
          <span className="eyebrow">OFFENSIVE SECURITY • DEFENSIVE ENGINEERING</span>
          <h1 style={{ fontSize: '3.25rem', fontWeight: 900, lineHeight: 1.1, marginBottom: '20px' }}>
            THINK LIKE AN ATTACKER.<br />
            <span style={{ color: 'var(--accent-primary)' }}>DEFEND LIKE A PRO.</span>
          </h1>
          <p className="section-desc" style={{ marginBottom: '32px' }}>
            GhostBreach delivers real-world vulnerability intelligence, continuous asset visibility, and offensive testing frameworks to secure your enterprise digital surface.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn-primary">ENTER SECURITY CENTER <ArrowRight size={16} /></Link>
            <Link to="/platform" className="btn-secondary">EXPLORE PLATFORM</Link>
          </div>
        </div>
        <div>
          <HeroTerminal />
        </div>
      </section>

      {/* SECTION 2 — TRUST MARQUEE */}
      <TechMarquee />

      {/* SECTION 3 — WHO WE ARE */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
        <div>
          <span className="eyebrow">WHO WE ARE</span>
          <h2 className="section-heading">Security is not just about finding vulnerabilities. It's about knowing what to do next.</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.6 }}>
            Modern security vectors change rapidly. Traditional point-in-time scanning leaves vast blind spots across web, API, and cloud workloads.
          </p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', lineHeight: 1.6 }}>
            At GhostBreach, we bridge offensive security insights directly into SOC execution, helping your teams track, prioritize, and fix critical risks immediately.
          </p>
          <Link to="/about" className="btn-secondary">ABOUT GHOSTBREACH →</Link>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <Eye color="var(--accent-primary)" size={28} />
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '4px' }}>LEARN</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Analyze actual attacker TTPs to discover unknown perimeter risks.</p>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <Lock color="var(--status-success)" size={28} />
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '4px' }}>SECURE</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Harden codebases and infrastructure with actionable remediation guidance.</p>
            </div>
          </div>
          <div className="glass-card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <Shield color="var(--status-warning)" size={28} />
            <div>
              <h3 style={{ fontSize: '1.125rem', marginBottom: '4px' }}>DEFEND</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Track security posture metrics continuously within a unified SOC dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SERVICES */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="eyebrow">OUR CAPABILITIES</span>
          <h2 className="section-heading">SECURITY SERVICES BUILT AROUND REAL ATTACK SURFACES</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { icon: <Cpu />, title: 'Web Security Assessment', desc: 'Thorough evaluation of web application security flaws and logic bugs.' },
            { icon: <AlertTriangle />, title: 'Vulnerability Assessment', desc: 'Automated and manual discovery of known system infrastructure risks.' },
            { icon: <Shield />, title: 'Penetration Testing', desc: 'Simulated real-world offensive attacks against specified targets.' },
            { icon: <FileCode2 />, title: 'WordPress Security', desc: 'Plugin, theme, and core configuration auditing for CMS environments.' }
          ].map((srv, idx) => (
            <div key={idx} className="glass-card">
              <div style={{ color: 'var(--accent-primary)', marginBottom: '16px' }}>{srv.icon}</div>
              <h3 style={{ marginBottom: '8px' }}>{srv.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '16px' }}>{srv.desc}</p>
              <Link to="/services" style={{ color: 'var(--accent-primary)', fontSize: '0.875rem', fontWeight: 600 }}>Learn more →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — PLATFORM SHOWCASE */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div className="glass-card" style={{ padding: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <span className="eyebrow">UNIFIED CONTROL</span>
            <h2 className="section-heading">ONE SECURITY PLATFORM. FROM DISCOVERY TO REMEDIATION.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '12px' }}>GhostBreach SOC Core</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Gain full visibility into internal and public asset security ratings, critical findings, active scan schedules, and engineering remediation workflows.
              </p>
              <Link to="/platform" className="btn-primary">EXPLORE PLATFORM</Link>
            </div>
            <div style={{ backgroundColor: '#030508', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <span>SOC Overview Preview</span>
                <span style={{ color: 'var(--status-success)' }}>● ONLINE</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '0.75rem', textAlign: 'center' }}>
                <div style={{ padding: '12px', backgroundColor: 'var(--bg-surface)' }}>
                  <div>Score</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--accent-primary)' }}>78/100</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: 'var(--bg-surface)' }}>
                  <div>Assets</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700 }}>24 Active</div>
                </div>
                <div style={{ padding: '12px', backgroundColor: 'var(--bg-surface)' }}>
                  <div>Critical</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--status-danger)' }}>6 Open</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <h2 className="section-heading">YOUR SECURITY STARTS WITH VISIBILITY.</h2>
        <p className="section-desc" style={{ margin: '0 auto 32px' }}>
          Know your assets. Understand your weaknesses. Track what needs to be fixed.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/contact" className="btn-primary">START A SECURITY DISCUSSION</Link>
          <Link to="/login" className="btn-secondary">ENTER SOC</Link>
        </div>
      </section>

    </div>
  );
};

export default Home;