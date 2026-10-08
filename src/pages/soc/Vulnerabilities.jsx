import React, { useState } from 'react';
import { Bug, Search, Filter, Eye, Plus, Pencil, Trash2 } from 'lucide-react';
import { useSocData } from '../../context/SocDataContext';
import { Modal } from '../../components/soc/Modal';
import { ConfirmDialog } from '../../components/soc/ConfirmDialog';

const Vulnerabilities = () => {
  const { vulnerabilities, assets, updateVulnerabilityStatus, addVulnerability, updateVulnerability, deleteVulnerability } = useSocData();
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedVuln, setSelectedVuln] = useState(null);

  // Add / edit form (editId === null means "adding a new one")
  const emptyForm = { title: '', asset: '', severity: 'Medium', cvss: '5.0', status: 'Open', category: '', description: '', remediation: '' };
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => {
    setEditId(null);
    setForm({ ...emptyForm, asset: assets[0]?.name || '' });
    setIsFormOpen(true);
  };

  const openEdit = (v) => {
    setEditId(v.id);
    setForm({
      title: v.title,
      asset: v.asset || '',
      severity: v.severity,
      cvss: String(v.cvss ?? ''),
      status: v.status,
      category: v.category || '',
      description: v.description || '',
      remediation: v.remediation || ''
    });
    setIsFormOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (editId) updateVulnerability(editId, form);
    else addVulnerability(form);
    setIsFormOpen(false);
  };

  const filtered = vulnerabilities.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.asset.toLowerCase().includes(search.toLowerCase()) ||
      (v.description && v.description.toLowerCase().includes(search.toLowerCase()));
    const matchesSev = severityFilter === 'All' || v.severity === severityFilter;
    const matchesStat = statusFilter === 'All' || v.status === statusFilter;
    return matchesSearch && matchesSev && matchesStat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Bug className="w-6 h-6 text-red-400" /> Discovered Vulnerabilities
          </h1>
          <p className="text-slate-400 text-sm mt-1">Review synthetic risk findings, CVSS metrics, and status lifecycles.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Vulnerability
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0B1118] border border-gray-800 p-4 rounded-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search vulnerabilities or assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#101923] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
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

      {/* Vulnerabilities Table */}
      <div className="bg-[#0B1118] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#101923]/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Vulnerability Title</th>
                <th className="py-3 px-4">Target Asset</th>
                <th className="py-3 px-4">CVSS</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No vulnerabilities matching current criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs font-bold rounded ${
                          item.severity === 'Critical'
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : item.severity === 'High'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            : item.severity === 'Medium'
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {item.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-200">{item.title}</td>
                    <td className="py-3 px-4 text-slate-400">{item.asset}</td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-300">{item.cvss}</td>
                    <td className="py-3 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => updateVulnerabilityStatus(item.id, e.target.value)}
                        className="bg-[#101923] border border-gray-700 text-xs text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-cyan-500"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedVuln(item)}
                        className="p-1.5 hover:bg-gray-700/50 text-slate-400 hover:text-cyan-400 rounded transition-colors"
                        title="View Finding Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openEdit(item)}
                        className="p-1.5 hover:bg-gray-700/50 text-slate-400 hover:text-cyan-400 rounded transition-colors"
                        title="Edit Finding"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(item.id)}
                        className="p-1.5 hover:bg-gray-700/50 text-slate-400 hover:text-red-400 rounded transition-colors"
                        title="Delete Finding"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editId ? 'Edit Vulnerability' : 'Add Vulnerability'}
        footer={
          <>
            <button onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-sm text-slate-300">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium"
            >
              {editId ? 'Save Changes' : 'Add Vulnerability'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Title</label>
            <input type="text" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Asset</label>
              <select value={form.asset} onChange={(e) => setForm({ ...form, asset: e.target.value })} className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500">
                <option value="">(none)</option>
                {assets.map((a) => (
                  <option key={a.id} value={a.name}>{a.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Category</label>
              <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Severity</label>
              <select value={form.severity} onChange={(e) => setForm({ ...form, severity: e.target.value })} className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500">
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
                <option value="Informational">Informational</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">CVSS (0-10)</label>
              <input type="number" min="0" max="10" step="0.1" value={form.cvss} onChange={(e) => setForm({ ...form, cvss: e.target.value })} className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500">
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Recommended Remediation</label>
            <textarea rows={2} value={form.remediation} onChange={(e) => setForm({ ...form, remediation: e.target.value })} className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500" />
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          deleteVulnerability(deleteId);
          setDeleteId(null);
        }}
        title="Delete Vulnerability"
        message="This permanently removes the finding from the database. Continue?"
        confirmText="Delete"
      />

      {/* Details Modal */}
      <Modal
        isOpen={!!selectedVuln}
        onClose={() => setSelectedVuln(null)}
        title="Vulnerability Finding Details"
      >
        {selectedVuln && (
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-[#101923] border border-gray-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Title:</span>
                <span className="font-bold text-slate-200 text-sm">{selectedVuln.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Target Asset:</span>
                <span className="text-cyan-400 font-mono">{selectedVuln.asset}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">CVSS Score:</span>
                <span className="font-mono font-bold text-amber-400">{selectedVuln.cvss}</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-slate-300 uppercase mb-1">Impact & Threat Description</h4>
              <p className="p-3 bg-[#101923] border border-gray-800 rounded text-slate-300 leading-relaxed">
                {selectedVuln.description || 'Simulated assessment identified structural authorization vulnerability in active parameters.'}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-300 uppercase mb-1">Recommended Remediation</h4>
              <p className="p-3 bg-[#101923] border border-gray-800 rounded text-emerald-400 leading-relaxed">
                {selectedVuln.remediation || 'Enforce server-side authorization validation and check caller parameters against active sessions.'}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Vulnerabilities;