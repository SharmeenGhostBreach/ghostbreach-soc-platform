import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ToastContainer } from '../components/soc/Toast';
import { useSocData } from '../context/SocDataContext';
import {
  LayoutDashboard,
  Server,
  AlertTriangle,
  Radar,
  FileText,
  CheckSquare,
  Users,
  Settings,
  User,
  LogOut,
  Shield
} from 'lucide-react';

const SocLayout = () => {
  const { user, logout } = useAuth();
  const { loading, error, reload } = useSocData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      className="soc-layout"
      style={{
        display: 'flex',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden'
      }}
    >
      <aside
        className="soc-sidebar"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flexShrink: 0
        }}
      >
        <div>
          <div className="soc-sidebar-header">
            <div className="soc-sidebar-title">
              GHOSTBREACH
            </div>

            <div className="soc-sidebar-subtitle">
              SECURITY OPERATIONS CENTER
            </div>
          </div>

          <nav className="soc-sidebar-nav">
            <NavLink
              to="/soc"
              end
              className={({ isActive }) =>
                `soc-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <LayoutDashboard size={18} />
              Overview
            </NavLink>

            <NavLink
              to="/soc/assets"
              className={({ isActive }) =>
                `soc-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Server size={18} />
              Assets
            </NavLink>

            <NavLink
              to="/soc/vulnerabilities"
              className={({ isActive }) =>
                `soc-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <AlertTriangle size={18} />
              Vulnerabilities
            </NavLink>

            <NavLink
              to="/soc/scans"
              className={({ isActive }) =>
                `soc-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Radar size={18} />
              Scans
            </NavLink>

            <NavLink
              to="/soc/reports"
              className={({ isActive }) =>
                `soc-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <FileText size={18} />
              Reports
            </NavLink>

            <NavLink
              to="/soc/remediation"
              className={({ isActive }) =>
                `soc-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <CheckSquare size={18} />
              Remediation
            </NavLink>

            <NavLink
              to="/soc/team"
              className={({ isActive }) =>
                `soc-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Users size={18} />
              Team
            </NavLink>

            <div className="soc-sidebar-divider" />

            <NavLink
              to="/soc/settings"
              className={({ isActive }) =>
                `soc-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Settings size={18} />
              Settings
            </NavLink>

            <NavLink
              to="/soc/profile"
              className={({ isActive }) =>
                `soc-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <User size={18} />
              Profile
            </NavLink>
          </nav>
        </div>

        <div className="soc-sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name ? user.name[0] : 'A'}
            </div>

            <div>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600
                }}
              >
                {user?.name || 'Administrator'}
              </div>

              <div
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)'
                }}
              >
                {user?.role || 'Analyst'}
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              color: 'var(--text-muted)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
      </aside>

      <div
        className="soc-main"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          overflow: 'hidden'
        }}
      >
        <header className="soc-header">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <Shield
              size={20}
              color="var(--accent-primary, #00D4FF)"
            />

            <span style={{ fontWeight: 600 }}>
              GhostBreach SOC Platform
            </span>
          </div>

          <div
            style={{
              fontSize: '0.875rem',
              color: 'var(--text-muted)'
            }}
          >
            System Status:{' '}
            <span
              style={{
                color: 'var(--status-success, #10B981)',
                fontWeight: 600
              }}
            >
              OPERATIONAL
            </span>
          </div>
        </header>

        <main
          className="soc-content"
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem'
          }}
        >
          {loading && (
            <div
              style={{
                padding: '8px 12px',
                marginBottom: '16px',
                borderRadius: '6px',
                border: '1px solid var(--border-color, #1f2937)',
                color: 'var(--text-muted)',
                fontSize: '0.875rem'
              }}
            >
              Loading SOC data...
            </div>
          )}
          {error && (
            <div
              style={{
                padding: '8px 12px',
                marginBottom: '16px',
                borderRadius: '6px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid var(--status-danger)',
                color: 'var(--status-danger)',
                fontSize: '0.875rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <span>Could not load data: {error}</span>
              <button
                onClick={reload}
                style={{
                  background: 'none',
                  border: '1px solid var(--status-danger)',
                  color: 'var(--status-danger)',
                  borderRadius: '4px',
                  padding: '2px 10px',
                  cursor: 'pointer'
                }}
              >
                Retry
              </button>
            </div>
          )}
          <Outlet />
        </main>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SocLayout;