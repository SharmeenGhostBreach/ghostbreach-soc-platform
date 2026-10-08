import React from "react";

const LEVELS = [
  { label: "Critical", color: "bg-rose-500" },
  { label: "High", color: "bg-amber-500" },
  { label: "Medium", color: "bg-yellow-500" },
  { label: "Low", color: "bg-blue-500" },
];

const SeverityChart = ({ vulnerabilities = [] }) => {
  const items = LEVELS.map((l) => ({
    ...l,
    count: vulnerabilities.filter((v) => v.severity === l.label && v.status !== "Resolved").length,
  }));
  const maxVal = Math.max(...items.map((i) => i.count), 1);

  return (
    <div>
      <h3 className="text-sm font-medium text-slate-400 mb-4">Findings by Severity</h3>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-300 font-medium">{item.label}</span>
              <span className="text-slate-400">{item.count}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{ width: `${Math.round((item.count / maxVal) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeverityChart;
