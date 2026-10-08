import React from "react";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

const ActivityFeed = ({ activities = [] }) => {
  const getIcon = (severity) => {
    switch (severity) {
      case "critical":
      case "warning":
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case "success":
        return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      default:
        return <Info className="w-4 h-4 text-blue-400" />;
    }
  };

  const formatTime = (t) => {
    if (!t) return "";
    const d = new Date(t);
    return /^\d{4}-/.test(t) && !isNaN(d) ? d.toLocaleString() : t;
  };

  if (activities.length === 0) {
    return <p className="text-sm text-slate-500">No recent activity.</p>;
  }

  return (
    <div className="space-y-4">
      {activities.map((item) => (
        <div key={item.id} className="flex items-start gap-3 text-sm">
          <div className="mt-0.5">{getIcon(item.severity)}</div>
          <div className="flex-1">
            <p className="text-slate-200">{item.message || item.title}</p>
            <span className="text-xs text-slate-500">{formatTime(item.timestamp || item.time)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
