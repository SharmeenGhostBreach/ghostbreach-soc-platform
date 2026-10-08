import React, { useState } from 'react';
import { Server, Plus, Search, Filter, Edit2, Trash2, Eye, ExternalLink } from 'lucide-react';
import { useSocData } from '../../context/SocDataContext';
import { Modal } from '../../components/soc/Modal';
import { ConfirmDialog } from '../../components/soc/ConfirmDialog';

const Assets = () => {
  const { assets, addAsset, updateAsset, deleteAsset, vulnerabilities } = useSocData();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editAssetItem, setEditAssetItem] = useState(null);
  const [viewAssetItem, setViewAssetItem] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    type: 'Web Application',
    url: '',
    owner: '',
    description: '',
    status: 'Active'
  });

  const handleOpenAdd = () => {
    setFormData({ name: '', type: 'Web Application', url: '', owner: '', description: '', status: 'Active' });
    setIsAddOpen(true);
  };

  const handleOpenEdit = (asset) => {
    setEditAssetItem(asset);
    setFormData({
      name: asset.name,
      type: asset.type,
      url: asset.url,
      owner: asset.owner || '',
      description: asset.description || '',
      status: asset.status || 'Active'
    });
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.url) return;
    addAsset(formData);
    setIsAddOpen(false);
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.url) return;
    updateAsset(editAssetItem.id, formData);
    setEditAssetItem(null);
  };

  const filteredAssets = assets.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || a.type === typeFilter;
    const matchesStatus = statusFilter === 'All' || a.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Server className="w-6 h-6 text-cyan-400" /> Protected Assets Inventory
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage web applications, APIs, networks, and cloud targets.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Add Asset
        </button>
      </div>

      {/* Search & Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-[#0B1118] border border-gray-800 p-4 rounded-xl">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, URL, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#101923] border border-gray-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Asset Types</option>
            <option value="Web Application">Web Application</option>
            <option value="API">API</option>
            <option value="WordPress">WordPress</option>
            <option value="Network">Network</option>
            <option value="Cloud">Cloud</option>
          </select>
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0B1118] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#101923]/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Asset Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">URL / Endpoint</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Owner</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No assets found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-gray-800/40 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-200">{asset.name}</td>
                    <td className="py-3 px-4 text-slate-400">{asset.type}</td>
                    <td className="py-3 px-4 text-cyan-400 font-mono text-xs">{asset.url}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          asset.status === 'Active'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : asset.status === 'Monitoring'
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}
                      >
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400">{asset.owner || 'Unassigned'}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => setViewAssetItem(asset)}
                        className="p-1.5 hover:bg-gray-700/50 text-slate-400 hover:text-cyan-400 rounded transition-colors"
                        title="View Asset Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(asset)}
                        className="p-1.5 hover:bg-gray-700/50 text-slate-400 hover:text-amber-400 rounded transition-colors"
                        title="Edit Asset"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(asset.id)}
                        className="p-1.5 hover:bg-gray-700/50 text-slate-400 hover:text-red-400 rounded transition-colors"
                        title="Delete Asset"
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

      {/* Add Asset Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Add Protected Asset"
        footer={
          <>
            <button
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 text-sm text-slate-300 hover:bg-gray-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitAdd}
              className="px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium"
            >
              Save Asset
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmitAdd} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Asset Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              placeholder="e.g. Production Payment Portal"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Asset Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Web Application">Web Application</option>
                <option value="API">API</option>
                <option value="WordPress">WordPress</option>
                <option value="Network">Network</option>
                <option value="Cloud">Cloud</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Active">Active</option>
                <option value="Monitoring">Monitoring</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Target URL / Host *</label>
            <input
              type="text"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              placeholder="e.g. https://api.ghostbreach.com"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Owner / Lead Engineer</label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              placeholder="e.g. SecOps Team"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              placeholder="Scope details and notes..."
            />
          </div>
        </form>
      </Modal>

      {/* Edit Asset Modal */}
      <Modal
        isOpen={!!editAssetItem}
        onClose={() => setEditAssetItem(null)}
        title="Edit Asset"
        footer={
          <>
            <button
              onClick={() => setEditAssetItem(null)}
              className="px-4 py-2 text-sm text-slate-300 hover:bg-gray-800 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitEdit}
              className="px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium"
            >
              Update Asset
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmitEdit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Asset Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Asset Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Web Application">Web Application</option>
                <option value="API">API</option>
                <option value="WordPress">WordPress</option>
                <option value="Network">Network</option>
                <option value="Cloud">Cloud</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Active">Active</option>
                <option value="Monitoring">Monitoring</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">URL / Endpoint</label>
            <input
              type="text"
              required
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Owner</label>
            <input
              type="text"
              value={formData.owner}
              onChange={(e) => setFormData({ ...formData, owner: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </form>
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={!!viewAssetItem}
        onClose={() => setViewAssetItem(null)}
        title="Asset Specification"
      >
        {viewAssetItem && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 bg-[#101923] p-4 rounded-lg border border-gray-800">
              <div>
                <span className="text-xs text-slate-500 uppercase block">Name</span>
                <span className="text-sm font-semibold text-slate-200">{viewAssetItem.name}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase block">Type</span>
                <span className="text-sm text-slate-300">{viewAssetItem.type}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase block">Endpoint</span>
                <a
                  href={viewAssetItem.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-cyan-400 hover:underline flex items-center gap-1 mt-0.5"
                >
                  {viewAssetItem.url} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div>
                <span className="text-xs text-slate-500 uppercase block">Owner</span>
                <span className="text-sm text-slate-300">{viewAssetItem.owner || 'N/A'}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Description / Scope</h4>
              <p className="text-xs text-slate-300 bg-[#101923] p-3 rounded border border-gray-800">
                {viewAssetItem.description || 'No detailed scope description registered.'}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase mb-2">Associated Vulnerabilities</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {vulnerabilities.filter((v) => v.asset === viewAssetItem.name).length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No vulnerabilities recorded against this asset.</p>
                ) : (
                  vulnerabilities
                    .filter((v) => v.asset === viewAssetItem.name)
                    .map((v) => (
                      <div
                        key={v.id}
                        className="flex items-center justify-between p-2 rounded bg-[#101923] border border-gray-800 text-xs"
                      >
                        <span className="font-medium text-slate-300">{v.title}</span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            v.severity === 'Critical'
                              ? 'bg-red-500/20 text-red-400'
                              : 'bg-amber-500/20 text-amber-400'
                          }`}
                        >
                          {v.severity}
                        </span>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteAsset(deleteId)}
        title="Decommission Asset"
        message="Are you sure you want to delete this asset from the SOC inventory? Associated historical scan targets will remain archived."
      />
    </div>
  );
};

export default Assets;