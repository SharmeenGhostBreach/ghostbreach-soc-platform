import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,

} from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { SocDataProvider } from './context/SocDataContext';

import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AuthLayout from './layouts/AuthLayout';
import SocLayout from './layouts/SocLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Platform from './pages/public/Platform';
import Work from './pages/public/Work';
import Contact from './pages/public/Contact';

// Auth Pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';

// SOC Pages
import Dashboard from './pages/soc/Dashboard';
import Assets from './pages/soc/Assets';
import Vulnerabilities from './pages/soc/Vulnerabilities';
import Scans from './pages/soc/Scans';
import Reports from './pages/soc/Reports';
import Remediation from './pages/soc/Remediation';
import Team from './pages/soc/Team';
import Settings from './pages/soc/Settings';
import Profile from './pages/soc/Profile';

// 404
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>

        <Routes>

          {/* =========================
              PUBLIC WEBSITE
          ========================== */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/platform" element={<Platform />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
          </Route>


          {/* =========================
              AUTHENTICATION
          ========================== */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />
          </Route>


          {/* =========================
              PROTECTED SOC
          ========================== */}

          <Route element={<ProtectedRoute />}>

            <Route
              path="/soc"
              element={
                <SocDataProvider>
                  <SocLayout />
                </SocDataProvider>
              }
            >

              <Route index element={<Dashboard />} />

              <Route
                path="assets"
                element={<Assets />}
              />

              <Route
                path="vulnerabilities"
                element={<Vulnerabilities />}
              />

              <Route
                path="scans"
                element={<Scans />}
              />

              <Route
                path="reports"
                element={<Reports />}
              />

              <Route
                path="remediation"
                element={<Remediation />}
              />

              <Route
                path="team"
                element={<Team />}
              />

              <Route
                path="settings"
                element={<Settings />}
              />

              <Route
                path="profile"
                element={<Profile />}
              />

            </Route>

          </Route>


          {/* =========================
              404
          ========================== */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;