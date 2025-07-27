import React,{ useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchAllOrders , updateOrderStatus } from '../../Redux/slices/adminOrderSlice';


const OrderManagementPage = () => {

    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state)=> state.adminOrders)

    useEffect(()=>{
        dispatch( fetchAllOrders());
    },[dispatch]);

    const handleStatusChange = (orderId, status)=>{
        dispatch( updateOrderStatus({id: orderId, status}))
    };

    if(loading)
        return <p>Loading...</p>
    if(error)
        return <p>Error: {error}</p>
  return (
    <div className='max-w-7xl p-6 mx-auto'>
        <h2 className='font-bold text-3xl mb-6 '>Order Management</h2>
        <div className='overflow-x-auto  shadow-md sm:rounded-lg'>
            <table className='min-w-full text-sm text-left text-gray-500 '>
                <thead className='text-gray-700 text-xs bg-gray-200 uppercase'>
                    <tr>
                        <th className='px-4 py-3 '>OrderId</th>
                        <th className='px-4 py-3 '>Customer</th>
                        <th className='px-4 py-3 '>Total Price</th>
                        <th className='px-4 py-3 '>Status</th>
                        <th className='px-4 py-3 '>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length > 0 ? (
                         orders.map((order)=>(
                       <tr key={order._id} className='border-b hover:bg-gray-100 cursor-pointer'>
                            <td className='px-4 py-2 text-gray-800 font-medium text-md whitespace-nowrap'>#{order._id}</td>
                            <td className='px-4 py-2 '>{order.user?.name}</td>
                            <td className='px-4 py-2'> ${order.totalPrice.toFixed(2)} </td>
                            <td className='px-4 py-2'>
                                <select name="status" value={order.status}
                                    onChange={(e)=> handleStatusChange(order._id, e.target.value)}
                                    className='border bg-gray-100 border-gray-300 text-gray-800 text-sm
                                    focus:ring-blue-500 focus:border-blue-500 block rounded p-2'>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Processing">Processing</option>
                                        <option value="Shipped">Shipped</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                            </td>
                            <td className=''>
                                <button onClick={()=> handleStatusChange(order._id,"Delivered")}
                                    className='px-2 py-2 rounded bg-gree-500 text-white hover:bg-green-600 transition-colors'>Mark as Delivered</button>
                            </td>
                       </tr> 
                    )))
                : (
                    <tr> <td colSpan={4} className='text-center text-gray-400  p-3'>No Orders Found!!</td></tr>
                )}
                </tbody>
            </table>
        </div>
      
    </div>
  )
}

export default OrderManagementPage
