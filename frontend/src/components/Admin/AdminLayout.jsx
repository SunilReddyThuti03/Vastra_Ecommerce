import React,{ useState} from 'react';
import { Outlet } from 'react-router';
import { RxHamburgerMenu } from 'react-icons/rx';
import AdminSidebar from './AdminSidebar';


const AdminLayout = () => {

    const [isSidebarOpen , setIsSidebarOpen] = useState(true);
    const toggleSidebar = () =>{
        setIsSidebarOpen( !isSidebarOpen);
    }
  return (      
    <div className='min-h-screen flex flex-col md:flex-row relative'>
        <div className='flex p-4 md:hidden bg-black text-white z-20'>
            <button onClick={toggleSidebar}>
                <RxHamburgerMenu size={24} />
            </button>
            <h1 className='ml-4 text-xl font-medium'>Admin Dashboard</h1>
        </div>

        {
            isSidebarOpen && (
                <div className='fixed inset-0 z-10 bg-gray-900 bg-opacity-50 md:hidden'
                    onClick={toggleSidebar}></div>
            )
        }

        <div className={`bg-gray-900 min-h-screen text-white absolute md:relative transform
            ${isSidebarOpen ? 'translate-x-0 ' :'-translate-x-full'} transition-transform duration-300 md:static md:block z-20 `}>
                <AdminSidebar toggleSidebar={toggleSidebar}/>
            </div>

        <div className='flex-grow p-6 overflow-auto'>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout
