import React from 'react';
import { Modal } from './Modal';
import { AlertTriangle } from 'lucide-react';

export const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', isDangerous = true }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <AlertTriangle className={`w-5 h-5 ${isDangerous ? 'text-red-400' : 'text-amber-400'}`} />
          <span>{title}</span>
        </div>
      }
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-300 hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
              isDangerous ? 'bg-red-600 hover:bg-red-500' : 'bg-cyan-600 hover:bg-cyan-500'
            }`}
          >
            {confirmText}
          </button>
        </>
      }
    >
      <p className="text-slate-300 text-sm leading-relaxed">{message}</p>
    </Modal>
  );
};