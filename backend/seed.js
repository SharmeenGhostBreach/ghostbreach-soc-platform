// ============================================================================
// GhostBreach SOC - demo data seeder
// Run with:  npm run seed
//
// SAFETY: this script only empties the 7 GhostBreach collections inside the
// "ghostbreach_soc" database. It never drops a database and never touches
// sample_mflix, admin, local or config. If MONGO_URI points at any other
// database name, it stops before deleting anything.
// All data below is fictional demo data.
// ============================================================================
import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';

import User from './models/User.js';
import Asset from './models/Asset.js';
import Vulnerability from './models/Vulnerability.js';
import Scan from './models/Scan.js';
import Report from './models/Report.js';
import Remediation from './models/Remediation.js';
import TeamMember from './models/TeamMember.js';

const EXPECTED_DB = 'ghostbreach_soc';

// Demo login. The password is hashed by the User model's pre-save hook before it is stored.
const ADMIN = {
  name: 'GhostBreach Admin',
  email: 'admin@ghostbreach.com',
  password: process.env.SEED_ADMIN_PASSWORD || 'GhostBreach@2026!', // demo only
  role: 'Admin',
};

// Date helpers so the data always looks "recent"
const hoursAgo = (h) => new Date(Date.now() - h * 3600 * 1000);
const daysAgo = (d, h = 0) => hoursAgo(d * 24 + h);
const daysFromNow = (d) => new Date(Date.now() + d * 24 * 3600 * 1000);

const seed = async () => {
  await connectDB();

  // ---- Safety check ----
  if (mongoose.connection.name !== EXPECTED_DB) {
    console.error(`Refusing to seed: connected database is "${mongoose.connection.name}", expected "${EXPECTED_DB}".`);
    console.error('Add /ghostbreach_soc to MONGO_URI in backend/.env (before the "?").');
    await mongoose.disconnect();
    process.exit(1);
  }

  // ---- 1. Clear ONLY the seven project collections ----
  console.log('Clearing GhostBreach collections...');
  await Remediation.deleteMany({});
  await Vulnerability.deleteMany({});
  await Scan.deleteMany({});
  await Report.deleteMany({});
  await Asset.deleteMany({});
  await TeamMember.deleteMany({});
  await User.deleteMany({});

  // ---- 2. Users (create() runs the bcrypt pre-save hook) ----
  await User.create(ADMIN);

  // ---- 3. Assets ----
  const assets = await Asset.insertMany([
    { name: 'GhostBreach Web Portal', type: 'Web Application', url: 'ghostbreachh.github.io', status: 'Active', securityScore: 82, lastScan: hoursAgo(2), owner: 'Security Team', description: 'Primary simulated GhostBreach web application used for security monitoring.' },
    { name: 'Client API', type: 'API', url: 'api.client.local', status: 'Active', securityScore: 74, lastScan: daysAgo(1), owner: 'API Team', description: 'Simulated client API environment used for API security assessment.' },
    { name: 'WordPress Client Site', type: 'WordPress', url: 'client-site.local', status: 'Monitoring', securityScore: 68, lastScan: daysAgo(2), owner: 'Web Team', description: 'Simulated WordPress environment under continuous security monitoring.' },
    { name: 'Security Testing Server', type: 'Network', url: '192.168.1.100', status: 'Active', securityScore: 88, lastScan: hoursAgo(5), owner: 'Infrastructure Team', description: 'Simulated internal security testing environment.' },
    { name: 'Development API', type: 'API', url: 'dev-api.local', status: 'Inactive', securityScore: 61, lastScan: daysAgo(5), owner: 'Development Team', description: 'Simulated development API environment.' },
    { name: 'Cloud Storage Gateway', type: 'Cloud', url: 'storage-gw.cloud.local', status: 'Monitoring', securityScore: 71, lastScan: daysAgo(3), owner: 'Cloud Team', description: 'Simulated cloud storage gateway used for backup and file exchange.' },
    { name: 'Internal HR Portal', type: 'Web Application', url: 'hr-portal.local', status: 'Active', securityScore: 79, lastScan: daysAgo(1, 4), owner: 'IT Operations', description: 'Simulated internal HR web portal used for demonstration purposes.' },
  ]);
  const assetId = (name) => assets.find((a) => a.name === name)._id; // look up an asset's _id by name

  // ---- 4. Vulnerabilities ----
  const vulns = await Vulnerability.insertMany([
    { title: 'SQL Injection', asset: assetId('Client API'), severity: 'Critical', category: 'Injection', cvss: 9.8, status: 'Open', discoveredAt: hoursAgo(3), description: 'A simulated SQL injection finding identified in the API assessment environment.', impact: 'Improper input handling could allow unauthorized database interaction in the simulated environment.', evidence: 'Simulated scanner evidence indicates insufficient input validation.', remediation: 'Use parameterized queries, server-side validation, and secure database access controls.' },
    { title: 'Broken Authentication', asset: assetId('GhostBreach Web Portal'), severity: 'High', category: 'Authentication', cvss: 8.1, status: 'Open', discoveredAt: hoursAgo(5), description: 'A simulated authentication weakness identified during a security assessment.', impact: 'Weak authentication controls could increase the risk of unauthorized account access.', evidence: 'Simulated assessment identified inconsistent authentication controls.', remediation: 'Strengthen authentication controls, session management, and account protection.' },
    { title: 'Missing Security Headers', asset: assetId('WordPress Client Site'), severity: 'Medium', category: 'Security Configuration', cvss: 5.3, status: 'Open', discoveredAt: daysAgo(1), description: 'Several recommended HTTP security headers are missing in the simulated environment.', impact: 'Missing security headers can reduce browser-side security protections.', evidence: 'Simulated configuration review detected missing recommended headers.', remediation: 'Configure appropriate security headers such as CSP and other recommended browser protections.' },
    { title: 'Information Disclosure', asset: assetId('Development API'), severity: 'Low', category: 'Information Exposure', cvss: 3.7, status: 'Open', discoveredAt: daysAgo(2), description: 'The simulated development API exposes unnecessary informational responses.', impact: "Additional information could help an attacker understand the application's environment.", evidence: 'Simulated API review identified excessive informational responses.', remediation: 'Reduce unnecessary response information and review API error handling.' },
    { title: 'Outdated JavaScript Library', asset: assetId('GhostBreach Web Portal'), severity: 'Medium', category: 'Vulnerable Component', cvss: 6.2, status: 'Resolved', discoveredAt: daysAgo(3), description: 'An outdated JavaScript dependency was identified in the simulated application.', impact: 'Outdated dependencies can introduce known security weaknesses.', evidence: 'Simulated dependency review identified an outdated package.', remediation: 'Update the dependency to a supported secure version and verify compatibility.' },
    { title: 'Cross-Site Scripting (XSS)', asset: assetId('Internal HR Portal'), severity: 'High', category: 'Injection', cvss: 7.4, status: 'Open', discoveredAt: daysAgo(1, 2), description: 'A simulated reflected XSS finding in a search form of the demo HR portal.', impact: 'Unsanitized input could allow script injection in a user\'s browser session in the simulated environment.', evidence: 'Simulated scanner reported unescaped user input in a response.', remediation: 'Encode output, validate input, and apply a Content Security Policy.' },
    { title: 'Insecure Direct Object Reference', asset: assetId('Client API'), severity: 'High', category: 'Access Control', cvss: 7.5, status: 'In Progress', discoveredAt: daysAgo(2, 3), description: 'Simulated API endpoints return records without checking ownership.', impact: 'Users could view records that belong to other accounts in the simulated environment.', evidence: 'Simulated assessment showed sequential identifiers accepted without authorization checks.', remediation: 'Enforce object-level authorization checks on every request.' },
    { title: 'Weak TLS Configuration', asset: assetId('Cloud Storage Gateway'), severity: 'Medium', category: 'Security Configuration', cvss: 5.9, status: 'Open', discoveredAt: daysAgo(3, 5), description: 'The simulated gateway still allows outdated TLS protocol versions.', impact: 'Older protocol versions weaken the protection of data in transit.', evidence: 'Simulated configuration review listed legacy protocol support.', remediation: 'Disable legacy protocol versions and enforce modern cipher suites.' },
    { title: 'Verbose Error Messages', asset: assetId('Development API'), severity: 'Low', category: 'Information Exposure', cvss: 3.1, status: 'Resolved', discoveredAt: daysAgo(4), description: 'Simulated stack traces were visible in API error responses.', impact: 'Internal details could assist reconnaissance.', evidence: 'Simulated API review captured detailed error output.', remediation: 'Return generic error messages and log details server-side.' },
  ]);
  const vulnId = (title) => vulns.find((v) => v.title === title)._id;

  // ---- 5. Scans (simulated records only) ----
  await Scan.insertMany([
    { name: 'GhostBreach Web Portal Assessment', target: 'GhostBreach Web Portal', type: 'Web Application', status: 'Completed', progress: 100, currentStep: 'Scan complete', startedAt: hoursAgo(5), completedAt: hoursAgo(4.9), duration: '8 min', findings: 5, findingsCount: { critical: 1, high: 1, medium: 2, low: 1 } },
    { name: 'Client API Security Assessment', target: 'Client API', type: 'API', status: 'Running', progress: 72, currentStep: 'Running synthetic audit rules...', startedAt: hoursAgo(1), completedAt: null, duration: 'In progress', findings: 3, findingsCount: { critical: 1, high: 1, medium: 1, low: 0 } },
    { name: 'WordPress Security Audit', target: 'WordPress Client Site', type: 'WordPress', status: 'Completed', progress: 100, currentStep: 'Scan complete', startedAt: daysAgo(1, 2), completedAt: daysAgo(1, 1.75), duration: '15 min', findings: 7, findingsCount: { critical: 0, high: 2, medium: 3, low: 2 } },
    { name: 'Development API Assessment', target: 'Development API', type: 'Vulnerability Assessment', status: 'Completed', progress: 100, currentStep: 'Scan complete', startedAt: daysAgo(2), completedAt: daysAgo(2) , duration: '11 min', findings: 2, findingsCount: { critical: 0, high: 0, medium: 1, low: 1 } },
    { name: 'Internal HR Portal Assessment', target: 'Internal HR Portal', type: 'Web Application', status: 'Completed', progress: 100, currentStep: 'Scan complete', startedAt: daysAgo(1, 6), completedAt: daysAgo(1, 5.8), duration: '12 min', findings: 4, findingsCount: { critical: 0, high: 1, medium: 2, low: 1 } },
    { name: 'Cloud Storage Configuration Review', target: 'Cloud Storage Gateway', type: 'Vulnerability Assessment', status: 'Failed', progress: 40, currentStep: 'Simulated target unreachable', startedAt: daysAgo(3), completedAt: daysAgo(3), duration: '2 min', findings: 0, findingsCount: { critical: 0, high: 0, medium: 0, low: 0 } },
  ]);

  // ---- 6. Reports ----
  const reportDates = [
    new Date('2026-09-25T09:00:00Z'),
    new Date('2026-09-24T09:00:00Z'),
    new Date('2026-09-23T09:00:00Z'),
    new Date('2026-09-22T09:00:00Z'),
    new Date('2026-09-21T09:00:00Z'),
  ];
  const reports = await Report.insertMany([
    { name: 'Web Application Security Assessment', client: 'Demo Client', target: 'GhostBreach Web Portal', assessmentType: 'Web Application', riskLevel: 'High', status: 'Completed' },
    { name: 'API Security Assessment', client: 'Demo Client', target: 'Client API', assessmentType: 'API', riskLevel: 'Critical', status: 'Completed' },
    { name: 'WordPress Security Audit', client: 'Demo Client', target: 'WordPress Client Site', assessmentType: 'WordPress', riskLevel: 'Medium', status: 'Completed' },
    { name: 'Internal HR Portal Assessment', client: 'Demo Client', target: 'Internal HR Portal', assessmentType: 'Web Application', riskLevel: 'High', status: 'Completed' },
    { name: 'Cloud Gateway Configuration Review', client: 'Demo Client', target: 'Cloud Storage Gateway', assessmentType: 'Vulnerability Assessment', riskLevel: 'Medium', status: 'Draft' },
  ]);
  // Give each report the intended creation date (so the Reports page shows September dates)
  for (let i = 0; i < reports.length; i++) {
    await Report.updateOne({ _id: reports[i]._id }, { $set: { createdAt: reportDates[i] } }, { timestamps: false, overwriteImmutable: true });
  }

  // ---- 7. Remediation tasks ----
  await Remediation.insertMany([
    { title: 'Fix API authorization controls', description: 'Review and strengthen authorization checks in the simulated API environment.', vulnerability: vulnId('SQL Injection'), severity: 'Critical', asset: assetId('Client API'), assignedTo: 'Security Analyst', status: 'In Progress', dueDate: daysFromNow(2), notes: 'Review server-side authorization logic.' },
    { title: 'Strengthen authentication controls', description: 'Review simulated authentication and session-management controls.', vulnerability: vulnId('Broken Authentication'), severity: 'High', asset: assetId('GhostBreach Web Portal'), assignedTo: 'Security Analyst', status: 'Open', dueDate: daysFromNow(4), notes: '' },
    { title: 'Configure recommended security headers', description: 'Apply recommended browser security headers to the simulated WordPress environment.', vulnerability: vulnId('Missing Security Headers'), severity: 'Medium', asset: assetId('WordPress Client Site'), assignedTo: 'Developer', status: 'Open', dueDate: daysFromNow(7), notes: '' },
    { title: 'Sanitize HR portal search input', description: 'Encode output and validate input on the demo HR portal search form.', vulnerability: vulnId('Cross-Site Scripting (XSS)'), severity: 'High', asset: assetId('Internal HR Portal'), assignedTo: 'Developer', status: 'Open', dueDate: daysFromNow(5), notes: 'Add a Content Security Policy afterwards.' },
    { title: 'Add object-level authorization checks', description: 'Verify record ownership on all simulated API endpoints.', vulnerability: vulnId('Insecure Direct Object Reference'), severity: 'High', asset: assetId('Client API'), assignedTo: 'Developer', status: 'In Progress', dueDate: daysFromNow(3), notes: '' },
    { title: 'Disable legacy TLS versions', description: 'Restrict the simulated gateway to modern TLS versions.', vulnerability: vulnId('Weak TLS Configuration'), severity: 'Medium', asset: assetId('Cloud Storage Gateway'), assignedTo: 'Security Analyst', status: 'Resolved', dueDate: daysFromNow(-1), notes: 'Verified after reconfiguration.' },
  ]);

  // ---- 8. Team members ----
  await TeamMember.insertMany([
    { name: 'GhostBreach Admin', email: 'admin@ghostbreach.com', role: 'Admin', status: 'Active', lastActive: 'Now' },
    { name: 'Security Analyst', email: 'analyst@ghostbreach.com', role: 'Security Analyst', status: 'Active', lastActive: '10 minutes ago' },
    { name: 'Development Team', email: 'developer@ghostbreach.com', role: 'Developer', status: 'Active', lastActive: '1 hour ago' },
    { name: 'Security Viewer', email: 'viewer@ghostbreach.com', role: 'Viewer', status: 'Invited', lastActive: 'Never' },
  ]);

  // ---- Summary ----
  console.log('\nSeed complete. Documents in database "' + mongoose.connection.name + '":');
  const models = [User, Asset, Vulnerability, Scan, Report, Remediation, TeamMember];
  for (const m of models) {
    console.log(`  ${m.collection.name.padEnd(16)} ${await m.countDocuments()}`);
  }
  console.log(`\nDemo login: ${ADMIN.email}  (password hashed in the database)`);

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch(async (error) => {
  console.error('Seed failed:', error.message);
  await mongoose.disconnect();
  process.exit(1);
});

export {};
