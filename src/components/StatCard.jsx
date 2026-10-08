import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const StatCard = ({
  title,
  value,
  change,
  changeType = "neutral",
  subtext,
  icon: Icon,
}) => {
  const tone =
    changeType === "positive"
      ? "text-emerald-400"
      : changeType === "negative"
      ? "text-rose-400"
      : "text-slate-400";

  const TrendIcon =
    changeType === "positive"
      ? TrendingUp
      : changeType === "negative"
      ? TrendingDown
      : Minus;

  return (
    <div className="bg-[#0B1118] border border-gray-800 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-400">{title}</span>
        {Icon && (
          <div className="p-2 bg-slate-700/50 rounded-lg text-cyan-400">
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-bold text-white">{value}</span>
        {change && (
          <span className={`inline-flex items-center text-xs font-semibold ${tone}`}>
            <TrendIcon className="w-3.5 h-3.5 mr-1" />
            {change}
          </span>
        )}
      </div>
      {subtext && <p className="mt-2 text-xs text-slate-500">{subtext}</p>}
    </div>
  );
};

export default StatCard;
