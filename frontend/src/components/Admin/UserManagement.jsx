import React,{useDebugValue, useEffect, useState} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { addUser,deleteUser, fetchUsers, updateUser} from '../../Redux/slices/adminSlice';
import { useNavigate } from 'react-router';


const UserManagement = () => {
    const { user } = useSelector((state)=> state.auth);
    const { users, loading, error } = useSelector((state)=> state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        if(user && user.role !== "admin")
            navigate("/");
    },[user,navigate]);

    const [formData, setformData] = useState({
        name:"",
        email:"",
        password:"",
        role:"customer",
    })

    useEffect(()=>{
        if(user && user.role ==="admin"){
            dispatch(fetchUsers());
        }
    }, [dispatch, user]);

    const handleChange= (e)=>{
        setformData({...formData, [e.target.name]: e.target.value});
    }

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        dispatch(addUser(formData));
        setformData({
            name:"",
            email:"",
            password:"",
            role:"customer",
        })
    }

    const handleRoleChange = (userId, newRole)=>{
        dispatch( updateUser({id: userId, role:newRole}));
    }

    const handleDeleteUser = (userId) =>{
        if(window.confirm("Are you sure you want to delete this user ?")){
            dispatch( deleteUser(userId));
        }
    }

    if(loading)
        return <p>Loading...</p>

    if(error)
        return <p>Error: {error}</p>

  return (
    <div className='max-w-7xl mx-auto p-6 '>
        <h2 className='font-bold text-3xl mb-6'>User Management</h2>
        { error && <p>Error : {error}</p>}
        <div className='p-6 rounded-lg mb-6'>
            <h2 className='font-semibold text-xl mb-4'>Add New User</h2>
            <form onSubmit={(e)=> handleFormSubmit(e)}>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Name</label>
                    <input type="text"
                    name='name'
                    onChange={(e)=> handleChange(e)}
                    value = { formData.name}
                    className='w-full p-2 border rounded-md'
                    required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Email</label>
                    <input type="text"
                    name='email'
                    onChange={(e)=> handleChange(e)}
                    value = { formData.email}
                    className='w-full p-2 border rounded-md'
                    required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Password</label>
                    <input type="text"
                    name='password'
                    onChange={(e)=> handleChange(e)}
                    value = { formData.password}
                    className='w-full p-2 border rounded-md'
                    required />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700'>Role</label>
                    <select
                        name='role'
                        onChange={(e)=> handleChange(e)}
                        value = { formData.role}
                        className='w-full p-2 border rounded-md' >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className='mb-4'>
                    <button className='bg-green-500 px-4 py-2 rounded-lg text-white'>Add User</button>
                </div>
            </form>
        </div>
        <div  className='p-6 overflow-x-auto shadow-md '>
            <table className='min-w-full text-left text0gray-600 text-sm '>
                <thead className='text-gray-700 bg-gray-100 uppercase text-md'>
                    <tr>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Email</th>
                        <th className='px-4 py-2'>Role</th>
                        <th className='px-4 py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user?._id} className='border-b p-2'>
                            <td className='px-4 py-2'> {user?.name} </td>
                            <td className='px-4 py-2'> {user?.email} </td>
                            <td className='px-4 py-2'> 
                                <select  
                                    value ={user?.role} 
                                    className='border rounded p-2'
                                    onChange={(e)=>handleRoleChange(user._id, e.target.value)}
                                    >
                                    <option value="customer">Customer</option>
                                    <option value="admin">Admin</option>        
                                </select>
                            </td>
                            <td className='px-4 py-2'>
                                <button className='bg-red-500 text-white rounded p-2'
                                    onClick={()=>handleDeleteUser(user?._id)}>Delete</button>
                            </td>
                        </tr> 
                    ))}
                </tbody>
            </table>
        </div>
    </div>
)
}

export default UserManagement;
