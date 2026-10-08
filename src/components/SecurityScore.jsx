import React from "react";
import { ShieldCheck, ShieldAlert } from "lucide-react";

const SecurityScore = ({ score = 85 }) => {
  const isHealthy = score >= 70;
  const status = score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 50 ? "Fair" : "At Risk";

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-400">Security Score</h3>
        {isHealthy ? (
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
        ) : (
          <ShieldAlert className="w-6 h-6 text-rose-400" />
        )}
      </div>
      <div className="my-6 text-center">
        <div className="inline-flex items-baseline gap-1">
          <span className="text-5xl font-extrabold text-white">{score}</span>
          <span className="text-slate-400 font-medium">/ 100</span>
        </div>
        <p className="mt-2 text-sm text-slate-400">
          Posture Status:{" "}
          <span className={isHealthy ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
            {status}
          </span>
        </p>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${isHealthy ? "bg-emerald-500" : "bg-rose-500"}`}
          style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
        />
      </div>
    </div>
  );
};

export default SecurityScore;
