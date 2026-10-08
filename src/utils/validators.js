// Simple form validation (no extra libraries). Each function returns an error
// message string, or null when the input is valid.

export const ASSET_TYPES = ['Web Application', 'API', 'WordPress', 'Network', 'Cloud'];
export const ASSET_STATUSES = ['Active', 'Monitoring', 'Inactive'];
export const SEVERITIES = ['Critical', 'High', 'Medium', 'Low', 'Informational'];
export const WORK_STATUSES = ['Open', 'In Progress', 'Resolved'];
export const TEAM_ROLES = ['Admin', 'Security Analyst', 'Developer', 'Viewer'];

export const isEmail = (value) => /^\S+@\S+\.\S+$/.test(String(value || '').trim());

// At least 8 characters with a letter and a number (same rule as the backend)
export const passwordProblem = (password) => {
  const value = String(password || '');
  if (value.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return 'Password must contain at least one letter and one number.';
  return null;
};

const blank = (v) => !String(v ?? '').trim();

export const validateAsset = (a) => {
  if (blank(a.name)) return 'Asset name is required.';
  if (blank(a.url)) return 'Asset URL / host is required.';
  if (a.type && !ASSET_TYPES.includes(a.type)) return 'Please choose a valid asset type.';
  if (a.status && !ASSET_STATUSES.includes(a.status)) return 'Please choose a valid asset status.';
  if (a.securityScore !== undefined && a.securityScore !== '') {
    const score = Number(a.securityScore);
    if (Number.isNaN(score) || score < 0 || score > 100) return 'Security score must be between 0 and 100.';
  }
  return null;
};

export const validateVulnerability = (v) => {
  if (blank(v.title)) return 'Title is required.';
  if (!SEVERITIES.includes(v.severity)) return 'Please choose a valid severity.';
  if (v.status && !WORK_STATUSES.includes(v.status)) return 'Please choose a valid status.';
  if (v.cvss !== undefined && v.cvss !== '') {
    const cvss = Number(v.cvss);
    if (Number.isNaN(cvss) || cvss < 0 || cvss > 10) return 'CVSS score must be a number between 0 and 10.';
  }
  return null;
};

export const validateRemediation = (t) => {
  if (blank(t.title)) return 'Task title is required.';
  if (!SEVERITIES.includes(t.severity)) return 'Please choose a valid severity.';
  if (t.status && !WORK_STATUSES.includes(t.status)) return 'Please choose a valid status.';
  return null;
};

export const validateTeamMember = (m) => {
  if (blank(m.name)) return 'Name is required.';
  if (!isEmail(m.email)) return 'Please enter a valid email address.';
  if (m.role && !TEAM_ROLES.includes(m.role)) return 'Please choose a valid role.';
  return null;
};

export const validateScan = (s) => {
  if (blank(s.name)) return 'Scan name is required.';
  if (blank(s.target)) return 'Please choose a target asset (add one on the Assets page first).';
  return null;
};
