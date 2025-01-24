import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import BrandManagerNavbar from '../components/Navbar/BrandManagerNavbar';
import BrandManagerDashboard from '../pages/Dashboard/BrandManagerDashboard';

const BrandManagerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar>
        <BrandManagerNavbar />
      </Navbar>

      {/* Dashboard İçeriği */}
      <main className="flex-grow bg-gradient-to-br from-black to-red-900 text-white p-6">
        <BrandManagerDashboard />
      </main>
    </div>
  );
};

export default BrandManagerLayout;
