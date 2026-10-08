import React, { useState } from 'react';
import { CheckSquare, Plus, Search, Filter, Edit2, Trash2 } from 'lucide-react';
import { useSocData } from '../../context/SocDataContext';
import { Modal } from '../../components/soc/Modal';
import { ConfirmDialog } from '../../components/soc/ConfirmDialog';

const Remediation = () => {
  const { remediationTasks, assets, addRemediationTask, updateRemediationTask, deleteRemediationTask } = useSocData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [taskForm, setTaskForm] = useState({
    title: '',
    severity: 'High',
    asset: '', // empty = first registered asset (assets load asynchronously)
    assignedTo: 'Alex Vance',
    dueDate: '',
    status: 'Open'
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!taskForm.title) return;
    addRemediationTask({ ...taskForm, asset: taskForm.asset || assets[0]?.name || '' });
    setIsAddOpen(false);
  };

  const filtered = remediationTasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.asset.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-emerald-400" /> Remediation Management
          </h1>
          <p className="text-slate-400 text-sm mt-1">Assign, track, and resolve vulnerability patch tasks.</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#0B1118] border border-gray-800 p-4 rounded-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search remediation tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#101923] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      <div className="bg-[#0B1118] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#101923]/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Task Description</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Target Asset</th>
                <th className="py-3 px-4">Assigned To</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {filtered.map((task) => (
                <tr key={task.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-200">{task.title}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs font-bold text-amber-400">{task.severity}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{task.asset}</td>
                  <td className="py-3 px-4 text-slate-300">{task.assignedTo}</td>
                  <td className="py-3 px-4 text-slate-400 text-xs">{task.dueDate}</td>
                  <td className="py-3 px-4">
                    <select
                      value={task.status}
                      onChange={(e) => updateRemediationTask(task.id, { status: e.target.value })}
                      className="bg-[#101923] border border-gray-700 text-xs text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setDeleteId(task.id)}
                      className="p-1 hover:bg-gray-800 text-slate-400 hover:text-red-400 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Create Remediation Task"
        footer={
          <>
            <button onClick={() => setIsAddOpen(false)} className="px-4 py-2 text-sm text-slate-300">
              Cancel
            </button>
            <button
              onClick={handleCreate}
              className="px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium"
            >
              Create Task
            </button>
          </>
        }
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Task Title *</label>
            <input
              type="text"
              required
              value={taskForm.title}
              onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Severity</label>
              <select
                value={taskForm.severity}
                onChange={(e) => setTaskForm({ ...taskForm, severity: e.target.value })}
                className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200"
              >
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Target Asset</label>
              <select
                value={taskForm.asset || assets[0]?.name || ''}
                onChange={(e) => setTaskForm({ ...taskForm, asset: e.target.value })}
                className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200"
              >
                {assets.map((ast) => (
                  <option key={ast.id} value={ast.name}>
                    {ast.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Assigned To</label>
            <input
              type="text"
              value={taskForm.assignedTo}
              onChange={(e) => setTaskForm({ ...taskForm, assignedTo: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200"
            />
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteRemediationTask(deleteId)}
        title="Delete Remediation Task"
        message="Are you sure you want to remove this task?"
      />
    </div>
  );
};

export default Remediation;