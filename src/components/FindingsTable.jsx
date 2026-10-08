import React from "react";

const badge = (severity) => {
  switch (severity?.toLowerCase()) {
    case "critical":
      return "bg-rose-500/10 text-rose-400 border-rose-500/20";
    case "high":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "medium":
      return "bg-yellow-500/10 text-yellow-400 border-yellow-500/20";
    default:
      return "bg-blue-500/10 text-blue-400 border-blue-500/20";
  }
};

const FindingsTable = ({ findings = [] }) => {
  if (findings.length === 0) {
    return <p className="text-sm text-slate-500">No findings to display.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="text-xs uppercase text-slate-400 border-b border-slate-700">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Finding</th>
            <th className="px-4 py-3">Severity</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {findings.map((item) => (
            <tr key={item.id} className="hover:bg-slate-700/30">
              <td className="px-4 py-3 font-mono text-xs font-semibold text-slate-400">{item.id}</td>
              <td className="px-4 py-3 text-slate-200">{item.title}</td>
              <td className="px-4 py-3">
                <span className={`px-2.5 py-1 text-xs rounded-full border ${badge(item.severity)}`}>
                  {item.severity}
                </span>
              </td>
              <td className="px-4 py-3 text-slate-400">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FindingsTable;
