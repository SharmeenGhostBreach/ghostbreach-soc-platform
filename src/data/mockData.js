// ==========================================
// GHOSTBREACH SOC - MOCK DATA
// Phase 3 Frontend Demo Data
// ==========================================

// ==========================================
// ASSETS
// ==========================================

export const assets = [
  {
    id: 1,
    name: "GhostBreach Web Portal",
    type: "Web Application",
    url: "ghostbreachh.github.io",
    status: "Active",
    securityScore: 82,
    lastScan: "Today",
    owner: "Security Team",
    description: "Primary simulated GhostBreach web application used for security monitoring.",
  },
  {
    id: 2,
    name: "Client API",
    type: "API",
    url: "api.client.local",
    status: "Active",
    securityScore: 74,
    lastScan: "Yesterday",
    owner: "API Team",
    description: "Simulated client API environment used for API security assessment.",
  },
  {
    id: 3,
    name: "WordPress Client Site",
    type: "WordPress",
    url: "client-site.local",
    status: "Monitoring",
    securityScore: 68,
    lastScan: "2 days ago",
    owner: "Web Team",
    description: "Simulated WordPress environment under continuous security monitoring.",
  },
  {
    id: 4,
    name: "Security Testing Server",
    type: "Network",
    url: "192.168.1.100",
    status: "Active",
    securityScore: 88,
    lastScan: "Today",
    owner: "Infrastructure Team",
    description: "Simulated internal security testing environment.",
  },
  {
    id: 5,
    name: "Development API",
    type: "API",
    url: "dev-api.local",
    status: "Inactive",
    securityScore: 61,
    lastScan: "5 days ago",
    owner: "Development Team",
    description: "Simulated development API environment.",
  },
];

// ==========================================
// VULNERABILITIES
// ==========================================

export const vulnerabilities = [
  {
    id: "GB-001",
    title: "SQL Injection",
    asset: "Client API",
    severity: "Critical",
    category: "Injection",
    cvss: 9.8,
    status: "Open",
    discovered: "Today",
    description: "A simulated SQL injection finding identified in the API assessment environment.",
    impact: "Improper input handling could allow unauthorized database interaction in the simulated environment.",
    evidence: "Simulated scanner evidence indicates insufficient input validation.",
    remediation: "Use parameterized queries, server-side validation, and secure database access controls.",
  },
  {
    id: "GB-002",
    title: "Broken Authentication",
    asset: "GhostBreach Web Portal",
    severity: "High",
    category: "Authentication",
    cvss: 8.1,
    status: "Open",
    discovered: "Today",
    description: "A simulated authentication weakness identified during a security assessment.",
    impact: "Weak authentication controls could increase the risk of unauthorized account access.",
    evidence: "Simulated assessment identified inconsistent authentication controls.",
    remediation: "Strengthen authentication controls, session management, and account protection.",
  },
  {
    id: "GB-003",
    title: "Missing Security Headers",
    asset: "WordPress Client Site",
    severity: "Medium",
    category: "Security Configuration",
    cvss: 5.3,
    status: "Open",
    discovered: "Yesterday",
    description: "Several recommended HTTP security headers are missing in the simulated environment.",
    impact: "Missing security headers can reduce browser-side security protections.",
    evidence: "Simulated configuration review detected missing recommended headers.",
    remediation: "Configure appropriate security headers such as CSP and other recommended browser protections.",
  },
  {
    id: "GB-004",
    title: "Information Disclosure",
    asset: "Development API",
    severity: "Low",
    category: "Information Exposure",
    cvss: 3.7,
    status: "Open",
    discovered: "2 days ago",
    description: "The simulated development API exposes unnecessary informational responses.",
    impact: "Additional information could help an attacker understand the application's environment.",
    evidence: "Simulated API review identified excessive informational responses.",
    remediation: "Reduce unnecessary response information and review API error handling.",
  },
  {
    id: "GB-005",
    title: "Outdated JavaScript Library",
    asset: "GhostBreach Web Portal",
    severity: "Medium",
    category: "Vulnerable Component",
    cvss: 6.2,
    status: "Resolved",
    discovered: "3 days ago",
    description: "An outdated JavaScript dependency was identified in the simulated application.",
    impact: "Outdated dependencies can introduce known security weaknesses.",
    evidence: "Simulated dependency review identified an outdated package.",
    remediation: "Update the dependency to a supported secure version and verify compatibility.",
  },
];

export const findings = vulnerabilities;

// ==========================================
// SCANS
// ==========================================

export const scans = [
  {
    id: "SCAN-1001",
    name: "GhostBreach Web Portal Assessment",
    target: "GhostBreach Web Portal",
    type: "Web Application",
    status: "Completed",
    progress: 100,
    findings: 5,
    started: "Today, 09:15",
    completed: "Today, 09:23",
    duration: "8 min",
    date: "Today",
  },
  {
    id: "SCAN-1002",
    name: "Client API Security Assessment",
    target: "Client API",
    type: "API",
    status: "Running",
    progress: 72,
    findings: 3,
    started: "Today, 10:20",
    completed: null,
    duration: null,
    date: "Today",
  },
  {
    id: "SCAN-1003",
    name: "WordPress Security Audit",
    target: "WordPress Client Site",
    type: "WordPress",
    status: "Completed",
    progress: 100,
    findings: 7,
    started: "Yesterday, 14:10",
    completed: "Yesterday, 14:25",
    duration: "15 min",
    date: "Yesterday",
  },
  {
    id: "SCAN-1004",
    name: "Development API Assessment",
    target: "Development API",
    type: "Vulnerability Assessment",
    status: "Completed",
    progress: 100,
    findings: 2,
    started: "2 days ago",
    completed: "2 days ago",
    duration: "11 min",
    date: "2 days ago",
  },
];

// ==========================================
// REPORTS
// ==========================================

export const reports = [
  {
    id: "RPT-001",
    name: "Web Application Security Assessment",
    title: "Web Application Security Assessment",
    client: "Demo Client",
    target: "GhostBreach Web Portal",
    assessmentType: "Web Application",
    date: "September 25, 2026",
    createdDate: "September 25, 2026",
    risk: "High",
    riskLevel: "High",
    status: "Completed",
  },
  {
    id: "RPT-002",
    name: "API Security Assessment",
    title: "API Security Assessment",
    client: "Demo Client",
    target: "Client API",
    assessmentType: "API",
    date: "September 24, 2026",
    createdDate: "September 24, 2026",
    risk: "Critical",
    riskLevel: "Critical",
    status: "Completed",
  },
  {
    id: "RPT-003",
    name: "WordPress Security Audit",
    title: "WordPress Security Audit",
    client: "Demo Client",
    target: "WordPress Client Site",
    assessmentType: "WordPress",
    date: "September 23, 2026",
    createdDate: "September 23, 2026",
    risk: "Medium",
    riskLevel: "Medium",
    status: "Completed",
  },
];

// ==========================================
// REMEDIATION TASKS
// ==========================================

export const remediationTasks = [
  {
    id: "TASK-8092",
    title: "Fix API authorization controls",
    description: "Review and strengthen authorization checks in the simulated API environment.",
    vulnerabilityId: "GB-001",
    severity: "Critical",
    asset: "Client API",
    assignedTo: "Security Analyst",
    status: "In Progress",
    dueDate: "October 5, 2026",
    notes: "Review server-side authorization logic.",
  },
  {
    id: "TASK-8093",
    title: "Strengthen authentication controls",
    description: "Review simulated authentication and session-management controls.",
    vulnerabilityId: "GB-002",
    severity: "High",
    asset: "GhostBreach Web Portal",
    assignedTo: "Security Analyst",
    status: "Open",
    dueDate: "October 7, 2026",
    notes: "",
  },
  {
    id: "TASK-8094",
    title: "Configure recommended security headers",
    description: "Apply recommended browser security headers to the simulated WordPress environment.",
    vulnerabilityId: "GB-003",
    severity: "Medium",
    asset: "WordPress Client Site",
    assignedTo: "Developer",
    status: "Open",
    dueDate: "October 10, 2026",
    notes: "",
  },
];

// ==========================================
// TEAM MEMBERS
// ==========================================

export const teamMembers = [
  {
    id: "TEAM-001",
    name: "GhostBreach Admin",
    email: "admin@ghostbreach.com",
    role: "Admin",
    status: "Active",
    lastActive: "Now",
  },
  {
    id: "TEAM-002",
    name: "Security Analyst",
    email: "analyst@ghostbreach.com",
    role: "Security Analyst",
    status: "Active",
    lastActive: "10 minutes ago",
  },
  {
    id: "TEAM-003",
    name: "Development Team",
    email: "developer@ghostbreach.com",
    role: "Developer",
    status: "Active",
    lastActive: "1 hour ago",
  },
  {
    id: "TEAM-004",
    name: "Security Viewer",
    email: "viewer@ghostbreach.com",
    role: "Viewer",
    status: "Invited",
    lastActive: "Never",
  },
];

// ==========================================
// ACTIVITY LOGS & NOTIFICATIONS
// ==========================================

export const activityLogs = [
  {
    id: "ACT-001",
    type: "vulnerability",
    message: "Critical vulnerability detected in Client API",
    timestamp: "Today, 10:25",
    severity: "critical",
  },
  {
    id: "ACT-002",
    type: "scan",
    message: "Client API security scan started",
    timestamp: "Today, 10:20",
    severity: "info",
  },
  {
    id: "ACT-003",
    type: "remediation",
    message: "Remediation task TASK-8092 moved to In Progress",
    timestamp: "Today, 09:55",
    severity: "warning",
  },
  {
    id: "ACT-004",
    type: "scan",
    message: "GhostBreach Web Portal scan completed",
    timestamp: "Today, 09:23",
    severity: "success",
  },
  {
    id: "ACT-005",
    type: "asset",
    message: "GhostBreach Web Portal asset updated",
    timestamp: "Yesterday, 16:40",
    severity: "info",
  },
];

export const notifications = [
  {
    id: "NOT-001",
    title: "Critical vulnerability detected",
    message: "A critical finding was detected in Client API.",
    type: "critical",
    read: false,
    timestamp: "Today, 10:25",
  },
  {
    id: "NOT-002",
    title: "Scan completed",
    message: "GhostBreach Web Portal assessment has completed.",
    type: "success",
    read: false,
    timestamp: "Today, 09:23",
  },
  {
    id: "NOT-003",
    title: "Remediation task assigned",
    message: "TASK-8092 has been assigned to the Security Analyst.",
    type: "info",
    read: true,
    timestamp: "Today, 09:00",
  },
];

// ==========================================
// MOCK USER / AUTHENTICATION
// ==========================================

export const mockUser = {
  id: "USR-001",
  name: "GhostBreach Admin",
  email: "admin@ghostbreach.com",
  role: "Admin",
  avatar: null,
};

// ==========================================
// PHASE 3 COMPATIBILITY EXPORTS
// ==========================================

export const mockAssets = assets;
export const mockVulnerabilities = vulnerabilities;
export const mockScans = scans;
export const mockReports = reports;
export const mockRemediationTasks = remediationTasks;
export const mockTeamMembers = teamMembers;
export const mockActivityLogs = activityLogs;

export const mockSecurityMetrics = {
  securityScore: 78,
  protectedAssets: 24,
  openVulnerabilities: 18,
  criticalFindings: 6,
};