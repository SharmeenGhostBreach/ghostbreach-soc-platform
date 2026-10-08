import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import ScrollToTop from '../components/public/ScrollToTop';

const PublicLayout = () => {
  return (
    <div className="public-layout bg-grid">
      <ScrollToTop />
      <Navbar />
      <main style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;