import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useAuth } from './AuthContext';

import * as assetService from '../services/assetService';
import * as vulnerabilityService from '../services/vulnerabilityService';
import * as scanService from '../services/scanService';
import * as reportService from '../services/reportService';
import * as remediationService from '../services/remediationService';
import * as teamService from '../services/teamService';
import * as userService from '../services/userService';

import {
  assetFromApi, assetToApi,
  vulnerabilityFromApi, vulnerabilityToApi,
  remediationFromApi, remediationToApi,
  teamToApi,
} from '../utils/mappers';
import {
  validateAsset, validateVulnerability, validateRemediation, validateTeamMember, validateScan,
} from '../utils/validators';

const SocDataContext = createContext(null);

// Settings are only UI preferences (the backend has no settings collection), so they stay in the browser.
const SETTINGS_KEY = 'ghostbreach_settings';
const DEFAULT_SETTINGS = {
  emailNotifications: true,
  scanCompletionAlerts: true,
  criticalVulnAlerts: true,
  weeklyDigest: false,
  darkMode: true,
};

const loadSettings = () => {
  try {
    return { ...DEFAULT_SETTINGS, ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

// A scan counts as "in progress" only if it was started recently (ignores stale demo records)
const isActiveScan = (scan) =>
  (scan.status === 'Queued' || scan.status === 'Running') &&
  Date.now() - new Date(scan.startedAt || scan.started).getTime() < 2 * 60 * 1000;

const severityToFeed = (severity) =>
  severity === 'Critical' ? 'critical' : severity === 'High' ? 'warning' : 'info';

export const SocDataProvider = ({ children }) => {
  const { user, setUser } = useAuth();

  const [assets, setAssets] = useState([]);
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [scans, setScans] = useState([]);
  const [reports, setReports] = useState([]);
  const [remediationTasks, setRemediationTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [sessionActivity, setSessionActivity] = useState([]);
  const [settings, setSettings] = useState(loadSettings);
  const [toasts, setToasts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const scansRef = useRef([]);
  useEffect(() => {
    scansRef.current = scans;
  }, [scans]);

  // ---------------------------------------------------------------- toasts
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), type === 'error' ? 6000 : 4000);
  }, [removeToast]);

  // -------------------------------------------------------------- activity
  // There is no activity collection in the database. The feed is built from real records
  // (recent findings and completed scans) plus events from the current session.
  const addActivity = useCallback((message, type = 'info', severity = 'info') => {
    const entry = { id: `act-${Date.now()}-${Math.random()}`, type, message, timestamp: new Date().toISOString(), severity };
    setSessionActivity((prev) => [entry, ...prev]);
  }, []);

  const activityLogs = useMemo(() => {
    const fromFindings = vulnerabilities.slice(0, 8).map((v) => ({
      id: `v-${v.id}`,
      type: 'vulnerability',
      message: `Vulnerability cataloged: ${v.title}`,
      timestamp: v.discoveredAt || v.createdAt,
      severity: severityToFeed(v.severity),
    }));
    const fromScans = scans
      .filter((s) => s.status === 'Completed')
      .slice(0, 5)
      .map((s) => ({
        id: `s-${s.id}`,
        type: 'scan',
        message: `Simulated scan completed: ${s.name}`,
        timestamp: s.completedAt || s.updatedAt,
        severity: 'success',
      }));
    return [...sessionActivity, ...fromFindings, ...fromScans]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 20);
  }, [vulnerabilities, scans, sessionActivity]);

  // ------------------------------------------------------------------ load
  const loadAll = useCallback(async () => {
    setError('');
    try {
      const [a, v, s, r, rem, t] = await Promise.all([
        assetService.getAll(),
        vulnerabilityService.getAll(),
        scanService.getAll(),
        reportService.getAll(),
        remediationService.getAll(),
        teamService.getAll(),
      ]);
      setAssets(a.map(assetFromApi));
      setVulnerabilities(v.map(vulnerabilityFromApi));
      setScans(s);
      setReports(r);
      setRemediationTasks(rem.map(remediationFromApi));
      setTeamMembers(t);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // Helpers used by every action below
  const run = async (action, successMessage) => {
    try {
      const result = await action();
      if (successMessage) addToast(successMessage, 'success');
      return result ?? true;
    } catch (err) {
      addToast(err.message, 'error');
      return null;
    }
  };
  const invalid = (message) => {
    addToast(message, 'error');
    return null;
  };

  // ---------------------------------------------------------------- assets
  const addAsset = async (asset) => {
    const problem = validateAsset(asset);
    if (problem) return invalid(problem);
    return run(async () => {
      const created = await assetService.create(assetToApi(asset));
      setAssets((prev) => [assetFromApi(created), ...prev]);
      addActivity(`New asset registered: ${created.name}`, 'asset', 'info');
    }, `Asset "${asset.name}" added successfully.`);
  };

  const updateAsset = async (id, fields) => {
    const current = assets.find((a) => a.id === id) || {};
    const problem = validateAsset({ ...current, ...fields });
    if (problem) return invalid(problem);
    return run(async () => {
      await assetService.update(id, assetToApi(fields));
      await loadAll(); // findings/tasks show the asset name, so refresh them too
    }, 'Asset details updated.');
  };

  const deleteAsset = async (id) => {
    const target = assets.find((a) => a.id === id);
    return run(async () => {
      await assetService.remove(id);
      await loadAll(); // linked findings/tasks are un-linked by the server
      if (target) addActivity(`Asset decommissioned: ${target.name}`, 'asset', 'warning');
    }, target ? `Asset "${target.name}" deleted.` : 'Asset deleted.');
  };

  // ------------------------------------------------------- vulnerabilities
  const addVulnerability = async (vuln) => {
    const problem = validateVulnerability(vuln);
    if (problem) return invalid(problem);
    return run(async () => {
      const created = await vulnerabilityService.create(vulnerabilityToApi(vuln));
      setVulnerabilities((prev) => [vulnerabilityFromApi(created), ...prev]);
      addActivity(`Vulnerability cataloged: ${created.title}`, 'vulnerability', severityToFeed(created.severity));
    }, 'Vulnerability added.');
  };

  const updateVulnerability = async (id, fields) => {
    const current = vulnerabilities.find((v) => v.id === id) || {};
    const problem = validateVulnerability({ ...current, ...fields });
    if (problem) return invalid(problem);
    return run(async () => {
      const updated = await vulnerabilityService.update(id, vulnerabilityToApi(fields));
      setVulnerabilities((prev) => prev.map((v) => (v.id === id ? vulnerabilityFromApi(updated) : v)));
    }, 'Vulnerability updated.');
  };

  const updateVulnerabilityStatus = async (id, status) => {
    const target = vulnerabilities.find((v) => v.id === id);
    return run(async () => {
      const updated = await vulnerabilityService.update(id, { status });
      setVulnerabilities((prev) => prev.map((v) => (v.id === id ? vulnerabilityFromApi(updated) : v)));
      if (target) addActivity(`Vulnerability "${target.title}" status changed to ${status}`, 'vulnerability', 'info');
    }, `Vulnerability status updated to ${status}`);
  };

  const deleteVulnerability = async (id) =>
    run(async () => {
      await vulnerabilityService.remove(id);
      setVulnerabilities((prev) => prev.filter((v) => v.id !== id));
    }, 'Vulnerability entry removed.');

  // ----------------------------------------------------------------- scans
  // The server runs the (safe, simulated) scan and saves progress and results to MongoDB.
  // The browser just starts it and polls for updates.
  const startSimulatedScan = async (scanConfig) => {
    const problem = validateScan(scanConfig);
    if (problem) return invalid(problem);
    return run(async () => {
      const created = await scanService.create({
        name: scanConfig.name,
        target: scanConfig.target,
        type: scanConfig.type,
      });
      setScans((prev) => [created, ...prev]);
      addActivity(`Simulated scan queued: ${created.name}`, 'scan', 'info');
    }, `Simulated scan "${scanConfig.name}" queued`);
  };

  const hasActiveScan = scans.some(isActiveScan);

  useEffect(() => {
    if (!hasActiveScan) return undefined;
    const timer = setInterval(async () => {
      try {
        const fresh = await scanService.getAll();
        const before = scansRef.current;
        const finished = fresh.filter(
          (s) => s.status === 'Completed' && before.some((p) => p.id === s.id && p.status !== 'Completed')
        );
        const failed = fresh.filter(
          (s) => s.status === 'Failed' && before.some((p) => p.id === s.id && p.status !== 'Failed')
        );
        setScans(fresh);

        if (finished.length) {
          // The server saved new findings, a report and an updated asset score: reload them
          loadAll();
          finished.forEach((s) => {
            addActivity(`Simulated scan completed: ${s.name}`, 'scan', 'success');
            addToast(`Scan "${s.name}" finished: ${s.findings} findings saved`, 'success');
          });
        }
        failed.forEach((s) => addToast(`Scan "${s.name}" failed`, 'error'));
      } catch {
        // temporary network problem: try again on the next tick
      }
    }, 1500);
    return () => clearInterval(timer);
  }, [hasActiveScan, loadAll, addActivity, addToast]);

  // ----------------------------------------------------------- remediation
  const addRemediationTask = async (task) => {
    const problem = validateRemediation(task);
    if (problem) return invalid(problem);
    const payload = {
      ...task,
      status: task.status || 'Open',
      dueDate: task.dueDate || new Date(Date.now() + 10 * 86400000).toISOString().split('T')[0],
    };
    return run(async () => {
      const created = await remediationService.create(remediationToApi(payload));
      setRemediationTasks((prev) => [remediationFromApi(created), ...prev]);
      addActivity(`Remediation task created: ${created.title}`, 'remediation', 'info');
    }, 'Remediation task created');
  };

  const updateRemediationTask = async (id, fields) =>
    run(async () => {
      const updated = await remediationService.update(id, remediationToApi(fields));
      setRemediationTasks((prev) => prev.map((t) => (t.id === id ? remediationFromApi(updated) : t)));
    }, 'Task updated');

  const deleteRemediationTask = async (id) =>
    run(async () => {
      await remediationService.remove(id);
      setRemediationTasks((prev) => prev.filter((t) => t.id !== id));
    }, 'Remediation task removed');

  // ------------------------------------------------------------------ team
  const addTeamMember = async (member) => {
    const problem = validateTeamMember(member);
    if (problem) return invalid(problem);
    return run(async () => {
      const created = await teamService.create(teamToApi({ ...member, status: 'Active', lastActive: 'Just now' }));
      setTeamMembers((prev) => [...prev, created]);
      addActivity(`Team member added: ${created.name}`, 'team', 'info');
    }, `Added team member ${member.name}`);
  };

  const updateTeamMember = async (id, fields) =>
    run(async () => {
      const updated = await teamService.update(id, teamToApi(fields));
      setTeamMembers((prev) => prev.map((m) => (m.id === id ? updated : m)));
    }, 'Team member updated');

  const deleteTeamMember = async (id) =>
    run(async () => {
      await teamService.remove(id);
      setTeamMembers((prev) => prev.filter((m) => m.id !== id));
    }, 'Team member removed');

  // ------------------------------------------------------ profile/settings
  const userProfile = {
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    organization: user?.organization || '',
    joinedDate: user?.createdAt ? user.createdAt.split('T')[0] : '',
    avatar: user?.avatar || null,
  };

  const updateProfile = async (fields) => {
    if (!String(fields.name || '').trim()) return invalid('Name is required.');
    return run(async () => {
      const updated = await userService.update(user.id, {
        name: fields.name.trim(),
        organization: (fields.organization || '').trim(),
      });
      setUser(updated);
    }, 'Profile updated successfully');
  };

  const updateSettings = (fields) => {
    setSettings((prev) => {
      const next = { ...prev, ...fields };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      } catch {
        // storage unavailable: settings just won't persist
      }
      return next;
    });
    addToast('Settings saved', 'success');
  };

  // ---------------------------------------------------------- derived data
  const openVulnerabilitiesCount = vulnerabilities.filter((v) => v.status !== 'Resolved').length;
  const criticalFindingsCount = vulnerabilities.filter((v) => v.severity === 'Critical' && v.status !== 'Resolved').length;

  return (
    <SocDataContext.Provider
      value={{
        assets,
        vulnerabilities,
        scans,
        reports,
        remediationTasks,
        teamMembers,
        activityLogs,
        userProfile,
        settings,
        loading,
        error,
        reload: loadAll,
        openVulnerabilitiesCount,
        criticalFindingsCount,
        toasts,
        addToast,
        removeToast,
        addAsset,
        updateAsset,
        deleteAsset,
        addVulnerability,
        updateVulnerability,
        updateVulnerabilityStatus,
        deleteVulnerability,
        startSimulatedScan,
        addRemediationTask,
        updateRemediationTask,
        deleteRemediationTask,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        updateProfile,
        updateSettings,
      }}
    >
      {children}
    </SocDataContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSocData = () => {
  const context = useContext(SocDataContext);
  if (!context) {
    throw new Error('useSocData must be used within a SocDataProvider');
  }
  return context;
};
