import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { useSocData } from '../../context/SocDataContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useSocData();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center justify-between gap-3 p-4 rounded-lg bg-[#0B1118] border border-cyan-500/30 text-slate-100 shadow-xl animate-slide-up"
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
            {toast.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};