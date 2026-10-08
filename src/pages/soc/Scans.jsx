import React, { useState } from 'react';
import { Play, Activity, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { useSocData } from '../../context/SocDataContext';
import { Modal } from '../../components/soc/Modal';

const Scans = () => {
  const { scans, assets, startSimulatedScan } = useSocData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScanDetails, setSelectedScanDetails] = useState(null);

  const [scanConfig, setScanConfig] = useState({
    name: 'Standard Audit Scan',
    target: '', // empty = use the first registered asset (assets load asynchronously)
    type: 'Web Application'
  });

  const handleLaunch = (e) => {
    e.preventDefault();
    startSimulatedScan({ ...scanConfig, target: scanConfig.target || assets[0]?.name || '' });
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Activity className="w-6 h-6 text-cyan-400" /> Simulated Security Scans
          </h1>
          <p className="text-slate-400 text-sm mt-1">Execute safe, simulated vulnerability assessments on target assets.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Play className="w-4 h-4" /> Start New Scan
        </button>
      </div>

      {/* Scans List */}
      <div className="bg-[#0B1118] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#101923]/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Scan Name</th>
                <th className="py-3 px-4">Target</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Progress / Stage</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {scans.map((scan) => (
                <tr key={scan.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-200">{scan.name}</td>
                  <td className="py-3 px-4 text-slate-400">{scan.target}</td>
                  <td className="py-3 px-4 text-slate-400">{scan.type}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        scan.status === 'Completed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : scan.status === 'Running'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-pulse'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {scan.status === 'Completed' && <CheckCircle2 className="w-3 h-3" />}
                      {scan.status === 'Running' && <Activity className="w-3 h-3 animate-spin" />}
                      {scan.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {scan.status === 'Running' ? (
                      <div className="w-full max-w-xs space-y-1">
                        <div className="flex justify-between text-xs text-cyan-400">
                          <span>{scan.currentStep}</span>
                          <span>{scan.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-cyan-500 h-full transition-all duration-500"
                            style={{ width: `${scan.progress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">{scan.currentStep || 'Finished'}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedScanDetails(scan)}
                      className="text-xs text-cyan-400 hover:underline"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Start Scan Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Configure Simulated Scan"
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm text-slate-300">
              Cancel
            </button>
            <button
              onClick={handleLaunch}
              className="px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium"
            >
              Run Scan
            </button>
          </>
        }
      >
        <form onSubmit={handleLaunch} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Scan Task Name</label>
            <input
              type="text"
              required
              value={scanConfig.name}
              onChange={(e) => setScanConfig({ ...scanConfig, name: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Target Asset</label>
            <select
              value={scanConfig.target || assets[0]?.name || ''}
              onChange={(e) => setScanConfig({ ...scanConfig, target: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {assets.map((ast) => (
                <option key={ast.id} value={ast.name}>
                  {ast.name} ({ast.url})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Scan Profile</label>
            <select
              value={scanConfig.type}
              onChange={(e) => setScanConfig({ ...scanConfig, type: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              <option value="Web Application">Web Application Security Audit</option>
              <option value="API">API Threat Model Check</option>
              <option value="WordPress">WordPress Core & Plugin Assessment</option>
              <option value="Network">Network Port & Surface Audit</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Details Modal */}
      <Modal
        isOpen={!!selectedScanDetails}
        onClose={() => setSelectedScanDetails(null)}
        title="Simulated Scan Summary"
      >
        {selectedScanDetails && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#101923] border border-gray-800 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Target:</span>
                <span className="font-semibold text-slate-200">{selectedScanDetails.target}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Duration:</span>
                <span className="text-slate-300">{selectedScanDetails.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="text-emerald-400 font-bold">{selectedScanDetails.status}</span>
              </div>
            </div>

            {selectedScanDetails.findingsCount && (
              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="p-2 bg-red-500/10 border border-red-500/20 rounded">
                  <span className="block font-bold text-red-400 text-lg">
                    {selectedScanDetails.findingsCount.critical || 0}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">Critical</span>
                </div>
                <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded">
                  <span className="block font-bold text-amber-400 text-lg">
                    {selectedScanDetails.findingsCount.high || 0}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">High</span>
                </div>
                <div className="p-2 bg-yellow-500/10 border border-yellow-500/20 rounded">
                  <span className="block font-bold text-yellow-400 text-lg">
                    {selectedScanDetails.findingsCount.medium || 0}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">Medium</span>
                </div>
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded">
                  <span className="block font-bold text-emerald-400 text-lg">
                    {selectedScanDetails.findingsCount.low || 0}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase">Low</span>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Scans;