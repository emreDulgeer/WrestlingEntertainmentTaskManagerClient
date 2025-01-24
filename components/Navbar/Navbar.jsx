import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import GeneralManagerNavbar from './GeneralManagerNavbar'; // General Manager Navbar
import BrandManagerNavbar from './BrandManagerNavbar';
import CoachNavbar from './CoachNavbar';
import WriterNavbar from './WriterNavbar';
import WrestlerNavbar from './WrestlerNavbar';
const Navbar = () => {
  const { auth, logoutUser } = useAuth();
  const navigate = useNavigate();

 
  const userRole = auth.user?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];


  const handleLogoClick = () => {
    if (userRole === 'General Manager') {
      navigate('/general-manager');
    } 
    if (userRole === 'General Manager') {
      navigate('/brand-manager');
    }
    if (userRole === 'Coach') {
      navigate('/Coach');
    } 
    if (userRole === 'Writer') {
      navigate('/Writer');
    }
    if (userRole === 'Wrestler') {
      navigate('/Wrestler');
    }
    else {
      navigate('/');
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-black via-red-600 to-black text-white shadow-lg">
     
      <div className="flex items-center space-x-4 cursor-pointer" onClick={handleLogoClick}>
        <img
          src="https://freepnglogo.com/images/all_img/1717223569transparent-wwe-logo-png.png"
          alt="WWE Logo"
          className="w-16 h-16"
        />
        <span className="text-xl font-bold tracking-wide uppercase">WWE Task Manager</span>
      </div>

    
      <div className="flex-grow px-6 flex items-center space-x-6">
      
        <button
          onClick={() => navigate('/users')}
          className="text-white hover:underline"
        >
          Users
        </button>

       
        {userRole === 'General Manager' && <GeneralManagerNavbar />}
        {userRole === 'Brand Manager' && <BrandManagerNavbar />}
        {userRole === 'Coach' && <CoachNavbar />}
        {userRole === 'Writer' && <WriterNavbar />}
        {userRole === 'Wrestler' && <WrestlerNavbar />}
      </div>

   
      <div className="flex items-center space-x-4">
        <span className="hidden md:block text-white font-semibold">
          Hi, {auth.user?.FullName || 'Guest'}!
        </span>
        <button
          onClick={() => navigate('/profile')}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-lg"
        >
          Profile
        </button>
        <button
          onClick={logoutUser}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
