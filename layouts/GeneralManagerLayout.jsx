import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import GeneralManagerNavbar from '../components/Navbar/GeneralManagerNavbar';
import GeneralManagerDashboard from '../pages/Dashboard/GeneralManagerDashboard';

const GeneralManagerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar>
        <GeneralManagerNavbar />
      </Navbar>

      {/* Dashboard İçeriği */}
      <main className="flex-grow bg-gradient-to-br from-black to-red-900 text-white p-6">
        <GeneralManagerDashboard />
      </main>
    </div>
  );
};

export default GeneralManagerLayout;
