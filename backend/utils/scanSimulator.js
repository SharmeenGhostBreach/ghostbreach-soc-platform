import Scan from '../models/Scan.js';
import Asset from '../models/Asset.js';
import Vulnerability from '../models/Vulnerability.js';
import Report from '../models/Report.js';

// =============================================================================
// SAFE SIMULATION ONLY.
// This file never contacts a target, never opens a network connection to it and
// never runs any security tool. A "scan" is just a timed progress animation that
// writes fictional findings into the local database for a REGISTERED demo asset.
// =============================================================================

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fictional finding templates (generic, educational wording)
const FINDING_CATALOG = [
  { title: 'Missing HTTP security headers', severity: 'Low', cvss: 3.1, category: 'Security Misconfiguration', impact: 'Browsers are not told to enable protections such as CSP or HSTS.', remediation: 'Add Content-Security-Policy, Strict-Transport-Security and X-Content-Type-Options headers.' },
  { title: 'Verbose error messages exposed', severity: 'Low', cvss: 3.7, category: 'Information Disclosure', impact: 'Error pages reveal framework details that help an attacker profile the system.', remediation: 'Return generic error messages and log details on the server only.' },
  { title: 'Session cookie without Secure flag', severity: 'Medium', cvss: 5.3, category: 'Session Management', impact: 'Session cookies could be sent over an unencrypted connection.', remediation: 'Set the Secure and HttpOnly flags on all session cookies.' },
  { title: 'Outdated third-party library', severity: 'Medium', cvss: 5.9, category: 'Vulnerable Components', impact: 'A dependency has known issues fixed in later releases.', remediation: 'Update the dependency to the latest supported version and re-test.' },
  { title: 'Weak password policy', severity: 'Medium', cvss: 5.4, category: 'Authentication', impact: 'Short or simple passwords are accepted, making guessing easier.', remediation: 'Require longer passwords and block commonly used ones.' },
  { title: 'Broken access control on resource endpoint', severity: 'High', cvss: 7.5, category: 'Access Control', impact: 'A user may be able to read records that belong to another user.', remediation: 'Enforce server-side authorization checks on every request.' },
  { title: 'Missing rate limiting on login', severity: 'High', cvss: 7.1, category: 'Authentication', impact: 'Unlimited login attempts make automated guessing practical.', remediation: 'Add rate limiting and temporary lockouts for repeated failures.' },
  { title: 'Input not validated on search parameter', severity: 'High', cvss: 7.3, category: 'Injection', impact: 'Unvalidated input could change how a back-end query behaves.', remediation: 'Validate input and use parameterized queries.' },
  { title: 'Hard-coded credential in configuration', severity: 'Critical', cvss: 9.1, category: 'Secrets Management', impact: 'A secret stored in source code could be reused by anyone who reads it.', remediation: 'Move secrets to environment variables or a secrets manager and rotate them.' },
  { title: 'Unauthenticated administrative endpoint', severity: 'Critical', cvss: 9.4, category: 'Access Control', impact: 'An administrative function can be reached without signing in.', remediation: 'Require authentication and an Admin role for administrative routes.' },
];

const SEVERITY_PENALTY = { Critical: 12, High: 7, Medium: 3, Low: 1 };

const pickFindings = () => {
  const shuffled = [...FINDING_CATALOG].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3 + Math.floor(Math.random() * 3)); // 3 to 5 findings
};

// Phases of the simulated lifecycle: Queued -> Running (progress updates) -> Completed
const PHASES = [
  { delay: 1500, status: 'Running', progress: 25, currentStep: 'Analyzing target headers & routes...' },
  { delay: 2000, status: 'Running', progress: 60, currentStep: 'Running synthetic audit rules...' },
  { delay: 1500, status: 'Running', progress: 85, currentStep: 'Correlating simulated findings...' },
];

export const runScanSimulation = async (scanId) => {
  const startedAt = Date.now();
  try {
    for (const phase of PHASES) {
      await wait(phase.delay);
      const updated = await Scan.findByIdAndUpdate(scanId, {
        status: phase.status,
        progress: phase.progress,
        currentStep: phase.currentStep,
      });
      if (!updated) return; // scan was deleted while running: stop quietly
    }

    await wait(1000);
    const scan = await Scan.findById(scanId);
    if (!scan) return;

    // Save fictional findings against the registered asset
    const asset = await Asset.findOne({ name: scan.target });
    const findings = pickFindings();
    const counts = { critical: 0, high: 0, medium: 0, low: 0 };
    const docs = findings.map((f) => {
      counts[f.severity.toLowerCase()] += 1;
      return {
        ...f,
        description: f.impact,
        asset: asset ? asset._id : null,
        status: 'Open',
        evidence: `Simulated finding generated by scan "${scan.name}". No real target was contacted.`,
      };
    });
    await Vulnerability.insertMany(docs);

    // Update the asset: last scan time and a recalculated security score
    if (asset) {
      const open = await Vulnerability.find({ asset: asset._id, status: { $ne: 'Resolved' } }).select('severity');
      const penalty = open.reduce((sum, v) => sum + (SEVERITY_PENALTY[v.severity] || 0), 0);
      asset.lastScan = new Date();
      asset.securityScore = Math.max(30, 100 - penalty);
      await asset.save();
    }

    // Save a report summarising the scan
    const riskLevel = counts.critical ? 'Critical' : counts.high ? 'High' : counts.medium ? 'Medium' : 'Low';
    await Report.create({
      name: `${scan.name} Report`,
      client: 'Demo Client',
      target: scan.target,
      assessmentType: scan.type,
      riskLevel,
      status: 'Completed',
    });

    // Finally mark the scan itself as completed
    const seconds = Math.max(1, Math.round((Date.now() - startedAt) / 1000));
    await Scan.findByIdAndUpdate(scanId, {
      status: 'Completed',
      progress: 100,
      currentStep: 'Scan complete',
      completedAt: new Date(),
      duration: `${seconds}s`,
      findings: findings.length,
      findingsCount: counts,
    });
  } catch (error) {
    console.error('Scan simulation failed:', error.message);
    await Scan.findByIdAndUpdate(scanId, { status: 'Failed', currentStep: 'Simulation failed' }).catch(() => {});
  }
};
