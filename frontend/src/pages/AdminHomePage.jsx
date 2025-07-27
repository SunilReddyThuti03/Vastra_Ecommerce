import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router';
import { fetchAllOrders} from '../Redux/slices/adminOrderSlice';
import { fetchAdminProducts } from '../Redux/slices/adminProductsSlice';

const AdminHomePage = () => {

    const dispatch = useDispatch();
    const { orders, totalOrders, loading: ordersLoading , error : ordersError} = useSelector((state)=> state.adminOrders);
    const { products, loading: productsLoading, error: productsError}  = useSelector((state)=> state.adminProducts);

    useEffect(()=>{
        dispatch (fetchAllOrders());
        dispatch(fetchAdminProducts());
    },[dispatch]);

    const totalPrice = orders.reduce((total, item)=> item.totalPrice + total,0);

    return (
        <div className='max-w-7xl mx-auto p-6'>
            <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
            {
                productsLoading || ordersLoading ? (
                    <p>Loading...</p>
                ) : productsError ? (
                    <p className='text-red-500'>Error fetching Products: {productsError}</p>
                ) : ordersError ? (
                    <p className='text-red-500'>Error fetching orders: {ordersError}</p>
                ) :(
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        <div className='p-4 shadow-md rounded-lg'>
                            <h2 className='text-xl font-semibold'>Revenue</h2>
                            <p className='text-2xl '>${totalPrice.toFixed(2)}</p>
                        </div>
                        <div className='p-4 shadow-md rounded-lg'>
                            <h2 className='text-xl font-semibold'>Total Orders</h2>
                            <p className='text-2xl '>${totalOrders}</p>
                            <Link to="/admin/orders" className='text-blue-500 hover:underline'>Manage Orders</Link>
                        </div>
                        <div className='p-4 shadow-md rounded-lg'>
                            <h2 className='text-xl font-semibold'>Total Products</h2>
                            <p className='text-2xl '>{products.length}</p>
                            <Link to="/admin/products" className='text-blue-500 hover:underline'>Manage Products</Link>
                        </div>
                    </div>)}
            <div className='mt-6'>
                <h2 className='font-semibold text-2xl mb-5'>Recent Orders</h2>
                <div className='overflow-x-auto'>
                    <table className='min-w-full text-left text-gray-500'>
                        <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                            <tr>
                                <th className='py-2 px-4 sm:px-3'>ORDER ID</th>
                                <th className='py-2 px-4 sm:px-3'>USER</th>
                                <th className='py-2 px-4 sm:px-3'>TOTAL PRICE</th>
                                <th className='py-2 px-4 sm:px-3'>STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders.length > 0 ? ( orders.map((product)=>(
                                    <tr key={ product._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                        <td className='p-4'>{product._id}</td>
                                        <td className='p-4'>{product.user?.name}</td>
                                        <td className='p-4'>{product.totalPrice.toFixed(2)}</td>
                                        <td className='p-4'>{product.status}</td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan={4} className='text-center text-gray-400 p-4 '>No Recent Orders.</td>    
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
)};

export default AdminHomePage
