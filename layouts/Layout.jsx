import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black to-red-900 text-white">
      {/* Navbar */}
      <Navbar />
      
      {/* Sayfa İçeriği */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
