import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import CoachNavbar from '../components/Navbar/CoachNavbar';
import BrandManagerDashboard from '../pages/Dashboard/BrandManagerDashboard';

const CoachLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar>
        <CoachNavbar />
      </Navbar>

      {/* Dashboard İçeriği */}
      <main className="flex-grow bg-gradient-to-br from-black to-red-900 text-white p-6">
        <BrandManagerDashboard />
      </main>
    </div>
  );
};

export default CoachLayout;
