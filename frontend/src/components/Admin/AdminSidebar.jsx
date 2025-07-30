import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import {FaUsers, FaBoxOpen, FaStore, FaClipboardList} from "react-icons/fa";
import { HiOutlineLogout} from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/slices/AuthSlice';
import { clearCart } from '../../Redux/slices/cartSlice';


const AdminSidebar = ({toggleSidebar}) => {
    const navigate =useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () =>{
        dispatch( logout());
        dispatch( clearCart());
        navigate('/');
    }
  return (
    <div className='p-6'>
        <div className='mb-6'>
            <Link to="/admin" className='text-2xl font-medium'>Vastra</Link>
        </div>
        <h2 className='text-xl font-medium mb-6 text-center'> Admin Dashboard</h2>
        <nav className='flex flex-col space-y-2 '>
            <NavLink
                to="/admin/users"
                onClick={()=>toggleSidebar()}
                className={({isActive})=>
                isActive  ? " bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4  rounded flex items-center space-x-2"
            }
            >
                <FaUsers/> <span>Users</span>
            </NavLink>
            <NavLink
                to="/admin/products"
                onClick={()=>toggleSidebar()}
                className={({isActive})=>
                isActive  ? " bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4  rounded flex items-center space-x-2"
            }
            >
                <FaBoxOpen/> <span>Products</span>
            </NavLink>
            <NavLink
                to="/admin/orders"
                onClick={()=>toggleSidebar()}
                className={({isActive})=>
                isActive  ? " bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4  rounded flex items-center space-x-2"
            }
            >
                <FaClipboardList/> <span>Orders</span>
            </NavLink>
            <NavLink
                to="/"
                onClick={()=>toggleSidebar()}
                className={({isActive})=>
                isActive  ? " bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2"
                : "text-gray-300 hover:bg-gray-700 hover:text-white py-3 px-4  rounded flex items-center space-x-2"
            }
            >
                <FaStore/> <span>Shop</span>
            </NavLink>
        </nav>
            <button onClick={handleLogout}
                className='w-full mt-5 text-white text-2xl bg-gray-800 p-2 flex items-center justify-center space-x-2 rounded'>
                    <HiOutlineLogout size={24}/> <span>Logout</span>
                </button>
    </div>
  )
}

export default AdminSidebar
