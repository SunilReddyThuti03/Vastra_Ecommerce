import React, {useEffect, useState} from 'react';
import MyorderPage from './MyorderPage';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {logout} from "../Redux/slices/AuthSlice";
import { clearCart } from '../Redux/slices/cartSlice';
import { FaGift } from 'react-icons/fa';

const Profile = () => {
    const {user, guestId} = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [openBox, setOpenBox] = useState(false);
    useEffect(()=>{
        if(!user){
            navigate("/login");
        }
    },[user, navigate]);

    const handleLogout=()=>{
        dispatch( logout() );
        dispatch( clearCart() );
        navigate("/login");
    }

  return (
    <div className='min-h-screen flex flex-col'>
        <div className='flex-grow container mx-auto p-4 md:p-6'>
            <div className='flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0'>
                <div className='w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6'>
                <h1 className='text-2xl md:text-3xl font-bold mb-4'> {user.name}</h1>
                <p className='text-lg text-gray-600 mb-4'> {user.email}</p>

                <button onClick={handleLogout}
                    className='w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700'>
                        Logout
                    </button>
                    <div className='mt-10'>
                        <h1 className='text-pink-600 font-bold text-2xl'>SUPRISE !!</h1>
                        <FaGift className='text-5xl text-red-700 mx-auto mt-4'  onClick={()=>setOpenBox(!openBox)}/>
                    </div>
                   {openBox && <div className='mt-5'>
                        <label> Experience website as Admin:</label>
                        <p className='text-sm font-bold text-black'>email: admin2@gmail.com</p>
                        <p className='text-sm font-bold text-black'>password: Admin@2</p>
                        <label> </label>
                    </div>}
                </div>
                <div className='w-full md:w-2/3 lg:w-3/4'>
                    <MyorderPage/>
                </div>
            </div>
        </div>
    </div>
  )
};

export default Profile
