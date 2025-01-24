import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import WrestlerNavbar from '../components/Navbar/WrestlerNavbar';
import WrestlerDashboard from '../pages/Dashboard/WrestlerDashboard';

const WrestlerLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      <Navbar>
        <WrestlerNavbar />
      </Navbar>

      
      <main className="flex-grow bg-gradient-to-br from-black to-red-900 text-white p-6">
        <WrestlerDashboard />
      </main>
    </div>
  );
};

export default WrestlerLayout;
