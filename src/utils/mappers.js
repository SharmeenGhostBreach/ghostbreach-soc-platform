// Translate between API records (MongoDB) and the shapes the existing UI expects.
// The backend already sends `id` instead of `_id` and flattens asset names.

// Date/ISO string -> "Never" | "Today" | "Yesterday" | "3 days ago" | "2026-09-01"
export const relativeDay = (value) => {
  if (!value) return 'Never';
  const then = new Date(value);
  if (isNaN(then)) return String(value);
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const days = Math.round((startOfDay(new Date()) - startOfDay(then)) / 86400000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  return then.toISOString().split('T')[0];
};

// ---------- API -> UI ----------
export const assetFromApi = (a) => ({ ...a, lastScanAt: a.lastScan, lastScan: relativeDay(a.lastScan) });
export const vulnerabilityFromApi = (v) => ({ ...v, asset: v.asset || '' }); // unlinked finding -> empty text
export const remediationFromApi = (r) => ({ ...r, asset: r.asset || '' });

// ---------- UI -> API (send only fields the backend model has) ----------
const pick = (obj, keys) => {
  const out = {};
  keys.forEach((k) => {
    if (obj[k] !== undefined) out[k] = obj[k];
  });
  return out;
};

export const assetToApi = (a) => {
  const body = pick(a, ['name', 'type', 'url', 'status', 'owner', 'description', 'securityScore']);
  if (body.securityScore !== undefined && body.securityScore !== '') body.securityScore = Number(body.securityScore);
  else delete body.securityScore;
  return body;
};

export const vulnerabilityToApi = (v) => {
  const body = pick(v, ['title', 'severity', 'cvss', 'status', 'category', 'description', 'impact', 'evidence', 'remediation', 'assignedTo', 'asset']);
  if (body.cvss !== undefined) body.cvss = body.cvss === '' ? 0 : Number(body.cvss);
  return body;
};

export const remediationToApi = (t) => {
  const body = pick(t, ['title', 'description', 'severity', 'assignedTo', 'status', 'dueDate', 'notes', 'asset']);
  if (body.dueDate === '') delete body.dueDate;
  return body;
};

export const teamToApi = (m) => pick(m, ['name', 'email', 'role', 'status', 'lastActive']);
