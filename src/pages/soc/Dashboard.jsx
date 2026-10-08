import React from 'react';
import { Shield, Server, AlertTriangle, Bug, Activity, Play, Plus } from 'lucide-react';
import { useSocData } from '../../context/SocDataContext';
import StatCard from '../../components/StatCard';
import SecurityScore from '../../components/SecurityScore';
import SeverityChart from '../../components/SeverityChart';
import ActivityFeed from '../../components/ActivityFeed';
import FindingsTable from '../../components/FindingsTable';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const {
    assets,
    vulnerabilities,
    scans,
    activityLogs,
    openVulnerabilitiesCount,
    criticalFindingsCount
  } = useSocData();

  const activeAssetsCount = assets.length;
  
  // Calculate dynamic security score based on active vulnerabilities
  const scorePenalty = vulnerabilities.reduce((acc, v) => {
    if (v.status === 'Resolved') return acc;
    if (v.severity === 'Critical') return acc + 6;
    if (v.severity === 'High') return acc + 3;
    if (v.severity === 'Medium') return acc + 1;
    return acc;
  }, 0);
  const calculatedScore = Math.max(30, 100 - scorePenalty);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0B1118] border border-gray-800 p-6 rounded-xl">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            Security Operations Overview
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              LIVE DATA
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Live metrics from your MongoDB-backed SOC data.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/soc/scans"
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Play className="w-4 h-4" /> Run Simulated Scan
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Security Score"
          value={`${calculatedScore}/100`}
          icon={Shield}
          change={calculatedScore >= 75 ? "+2%" : "-4%"}
          changeType={calculatedScore >= 75 ? "positive" : "negative"}
          subtext="Calculated dynamically"
        />
        <StatCard
          title="Protected Assets"
          value={activeAssetsCount}
          icon={Server}
          change="Updated"
          changeType="neutral"
          subtext="Active inventory"
        />
        <StatCard
          title="Open Vulnerabilities"
          value={openVulnerabilitiesCount}
          icon={Bug}
          change={openVulnerabilitiesCount > 5 ? "Action required" : "Healthy"}
          changeType={openVulnerabilitiesCount > 5 ? "negative" : "positive"}
          subtext="Unresolved findings"
        />
        <StatCard
          title="Critical Findings"
          value={criticalFindingsCount}
          icon={AlertTriangle}
          change={criticalFindingsCount > 0 ? "High Risk" : "Zero Critical"}
          changeType={criticalFindingsCount > 0 ? "negative" : "positive"}
          subtext="Requires immediate remediation"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-[#0B1118] border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
          <h2 className="text-base font-semibold text-slate-100 mb-4">Postural Health</h2>
          <SecurityScore score={calculatedScore} />
        </div>
        <div className="lg:col-span-2 bg-[#0B1118] border border-gray-800 rounded-xl p-5">
          <h2 className="text-base font-semibold text-slate-100 mb-4">Vulnerability Severity Distribution</h2>
          <SeverityChart vulnerabilities={vulnerabilities} />
        </div>
      </div>

      {/* Findings & Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0B1118] border border-gray-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-slate-100">Top Priority Vulnerabilities</h2>
            <Link to="/soc/vulnerabilities" className="text-xs text-cyan-400 hover:underline">
              View all
            </Link>
          </div>
          <FindingsTable findings={vulnerabilities.slice(0, 5)} />
        </div>
        <div className="lg:col-span-1 bg-[#0B1118] border border-gray-800 rounded-xl p-5">
          <h2 className="text-base font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" /> Recent Activity
          </h2>
          <ActivityFeed activities={activityLogs.slice(0, 6)} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;