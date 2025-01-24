import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import WriterNavbar from '../components/Navbar/WriterNavbar';
import BrandManagerDashboard from '../pages/Dashboard/BrandManagerDashboard';

const WriterLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar>
        <WriterNavbar />
      </Navbar>

      {/* Dashboard İçeriği */}
      <main className="flex-grow bg-gradient-to-br from-black to-red-900 text-white p-6">
        <BrandManagerDashboard />
      </main>
    </div>
  );
};

export default WriterLayout;
