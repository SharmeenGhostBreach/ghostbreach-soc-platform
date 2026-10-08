import React, { useState } from 'react';
import { FileText, Download, Eye } from 'lucide-react';
import { useSocData } from '../../context/SocDataContext';
import { Modal } from '../../components/soc/Modal';

const Reports = () => {
  const { reports } = useSocData();
  const [selectedReport, setSelectedReport] = useState(null);

  const handleDownloadMockReport = (report) => {
    const reportData = JSON.stringify(report, null, 2);
    const blob = new Blob([reportData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GhostBreach_Report_${report.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <FileText className="w-6 h-6 text-cyan-400" /> Executive Security Reports
        </h1>
        <p className="text-slate-400 text-sm mt-1">Review generated assessment summaries and download structured audit outputs.</p>
      </div>

      <div className="bg-[#0B1118] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#101923]/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Report Name</th>
                <th className="py-3 px-4">Target Asset</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Risk Rating</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-200">{report.title}</td>
                  <td className="py-3 px-4 text-slate-400">{report.target}</td>
                  <td className="py-3 px-4 text-slate-400">{report.type}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded ${
                        report.riskLevel === 'High'
                          ? 'bg-amber-500/20 text-amber-400'
                          : 'bg-emerald-500/20 text-emerald-400'
                      }`}
                    >
                      {report.riskLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{report.createdDate}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="p-1.5 hover:bg-gray-700/50 text-slate-400 hover:text-cyan-400 rounded transition-colors"
                      title="View Executive Summary"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadMockReport(report)}
                      className="p-1.5 hover:bg-gray-700/50 text-slate-400 hover:text-emerald-400 rounded transition-colors"
                      title="Download Mock JSON Report"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        title="Executive Report Summary"
      >
        {selectedReport && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#101923] border border-gray-800 rounded-lg space-y-2">
              <h3 className="text-sm font-bold text-slate-200">{selectedReport.title}</h3>
              <p className="text-slate-400">Target: {selectedReport.target}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-300 uppercase">Assessment Summary</h4>
              <p className="p-3 bg-[#101923] border border-gray-800 rounded text-slate-300">
                {selectedReport.summary || 'Simulated assessment generated synthetic audit metrics and risk vectors.'}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Reports;