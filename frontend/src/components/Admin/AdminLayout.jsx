import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { RxHamburgerMenu } from 'react-icons/rx';
import AdminSidebar from './AdminSidebar';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // closed on mobile by default

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>

      {/* Top Navigation Bar (Mobile Only) */}
      <div className='flex items-center p-4 md:hidden bg-black text-white z-20'>
        <button onClick={toggleSidebar}>
          <RxHamburgerMenu size={24} />
        </button>
        <h1 className='ml-4 text-xl font-medium'>Admin Dashboard</h1>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 z-10 bg-black bg-opacity-50 md:hidden'
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed z-20 md:relative md:z-auto 
          bg-gray-900 text-white min-h-screen w-64
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className='flex-grow p-6 overflow-auto'>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
