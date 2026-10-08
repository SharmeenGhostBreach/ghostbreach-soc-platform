import React, { useState, useEffect } from 'react';

const logs = [
  "[+] Initializing asset discovery pipeline...",
  "[+] Mapping target surface area: app.ghostbreach.com",
  "[+] Executing authenticated API surface audit...",
  "[!] Critical vulnerability detected: IDOR in User Scope",
  "[!] High risk finding: Outdated JWT Signing Algorithm",
  "[✓] Incident remediation task created: TASK-8092",
  "[✓] Security Posture recalculated: 78/100"
];

const HeroTerminal = () => {
  const [displayedLogs, setDisplayedLogs] = useState([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < logs.length) {
        const currentLog = logs[index];
        if (currentLog) {
          setDisplayedLogs((prev) => [...prev, currentLog]);
        }
        index++;
      } else {
        clearInterval(interval);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-dots">
          <div className="dot dot-red"></div>
          <div className="dot dot-yellow"></div>
          <div className="dot dot-green"></div>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ghostbreach-soc-cli v2.4</div>
      </div>
      <div className="terminal-body">
        {displayedLogs.map((log, i) => (
          <div 
            key={i} 
            style={{ 
              marginBottom: '8px', 
              color: log?.includes('!') ? 'var(--status-danger)' : log?.includes('✓') ? 'var(--status-success)' : 'var(--accent-primary)' 
            }}
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroTerminal;