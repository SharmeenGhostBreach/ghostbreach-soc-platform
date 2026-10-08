import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Server, AlertTriangle, Radar, FileText, CheckSquare } from 'lucide-react';

const Platform = () => {
  const [activeTab, setActiveTab] = useState('assets');

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px', display: 'flex', flexDirection: 'column', gap: '64px' }}>
      <div>
        <span className="eyebrow">PLATFORM OVERVIEW</span>
        <h1 className="section-heading">THE GHOSTBREACH SECURITY PLATFORM</h1>
        <p className="section-desc">From attack surface visibility to structured remediation tracking.</p>
      </div>

      {/* Tab Controls */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', overflowX: 'auto' }}>
        {[
          { id: 'assets', label: 'Assets Management', icon: <Server size={16} /> },
          { id: 'vulnerabilities', label: 'Vulnerabilities', icon: <AlertTriangle size={16} /> },
          { id: 'scans', label: 'Security Scans', icon: <Radar size={16} /> },
          { id: 'reports', label: 'Reports', icon: <FileText size={16} /> },
          { id: 'remediation', label: 'Remediation', icon: <CheckSquare size={16} /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Visuals */}
      <div className="glass-card" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        {activeTab === 'assets' && (
          <div>
            <h3>Centralized Asset Catalog</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Monitor web applications, API endpoints, microservices, and network assets in one unified console.</p>
          </div>
        )}
        {activeTab === 'vulnerabilities' && (
          <div>
            <h3>Vulnerability Tracking & CVSS Scoring</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Prioritize critical findings based on standardized severity scores and exploitability.</p>
          </div>
        )}
        {activeTab === 'scans' && (
          <div>
            <h3>Automated & Manual Scan Schedules</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Run and review continuous automated vulnerability scans on target perimeters.</p>
          </div>
        )}
        {activeTab === 'reports' && (
          <div>
            <h3>Executive & Technical Reports</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Export detailed audit reports formatted for engineering teams and stakeholders.</p>
          </div>
        )}
        {activeTab === 'remediation' && (
          <div>
            <h3>Task Assignment & Patch Verification</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Assign discovered weaknesses directly to engineering teams and track resolution status.</p>
          </div>
        )}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link to="/login" className="btn-primary">ENTER THE SECURITY CENTER</Link>
      </div>
    </div>
  );
};

export default Platform;