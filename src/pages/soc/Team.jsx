import React, { useState } from 'react';
import { Users, UserPlus, Trash2, Shield } from 'lucide-react';
import { useSocData } from '../../context/SocDataContext';
import { Modal } from '../../components/soc/Modal';
import { ConfirmDialog } from '../../components/soc/ConfirmDialog';

const Team = () => {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember } = useSocData();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'Security Analyst'
  });

  const handleInvite = (e) => {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.email) return;
    addTeamMember(inviteForm);
    setIsInviteOpen(false);
    setInviteForm({ name: '', email: '', role: 'Security Analyst' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" /> Security Team Operations
          </h1>
          <p className="text-slate-400 text-sm mt-1">Manage platform access, roles, and analyst permissions.</p>
        </div>
        <button
          onClick={() => setIsInviteOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <UserPlus className="w-4 h-4" /> Invite Member
        </button>
      </div>

      <div className="bg-[#0B1118] border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-[#101923]/60 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">Member</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Active</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800 text-sm">
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-medium text-slate-200">{member.name}</div>
                    <div className="text-xs text-slate-500">{member.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={member.role}
                      onChange={(e) => updateTeamMember(member.id, { role: e.target.value })}
                      className="bg-[#101923] border border-gray-700 text-xs text-slate-300 rounded px-2 py-1 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Security Analyst">Security Analyst</option>
                      <option value="Developer">Developer</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {member.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400">{member.lastActive || 'Today'}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setDeleteId(member.id)}
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
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        title="Invite Team Member"
        footer={
          <>
            <button onClick={() => setIsInviteOpen(false)} className="px-4 py-2 text-sm text-slate-300">
              Cancel
            </button>
            <button
              onClick={handleInvite}
              className="px-4 py-2 text-sm bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-medium"
            >
              Add Member
            </button>
          </>
        }
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={inviteForm.name}
              onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={inviteForm.email}
              onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Role</label>
            <select
              value={inviteForm.role}
              onChange={(e) => setInviteForm({ ...inviteForm, role: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200"
            >
              <option value="Admin">Admin</option>
              <option value="Security Analyst">Security Analyst</option>
              <option value="Developer">Developer</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => deleteTeamMember(deleteId)}
        title="Revoke Team Access"
        message="Are you sure you want to remove this member from the SOC environment?"
      />
    </div>
  );
};

export default Team;