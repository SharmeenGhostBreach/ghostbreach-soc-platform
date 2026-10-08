import React, { useState } from 'react';
import { User, Mail, Shield, Building, Save } from 'lucide-react';
import { useSocData } from '../../context/SocDataContext';

const Profile = () => {
  const { userProfile, updateProfile } = useSocData();
  const [formData, setFormData] = useState({
    name: userProfile.name || 'Alex Vance',
    organization: userProfile.organization || 'GhostBreach Cyber Ops'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <User className="w-6 h-6 text-cyan-400" /> User Profile & Identity
        </h1>
        <p className="text-slate-400 text-sm mt-1">Manage your operator details and organization metadata.</p>
      </div>

      <div className="bg-[#0B1118] border border-gray-800 rounded-xl p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Organization</label>
            <input
              type="text"
              value={formData.organization}
              onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
              className="w-full bg-[#101923] border border-gray-700 rounded-lg px-3 py-2 text-sm text-slate-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-1">Email (Authenticated)</label>
            <input
              type="email"
              disabled
              value={userProfile.email}
              className="w-full bg-[#101923]/50 border border-gray-800 rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;