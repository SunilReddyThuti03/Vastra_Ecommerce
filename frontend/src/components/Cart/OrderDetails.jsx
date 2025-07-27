import React,{useEffect} from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router';
import { fetchDetailsById} from "../../Redux/slices/orderSlice";

const OrderDetails = () => {

    const { id} = useParams();
    const dispatch = useDispatch();
    const { orderDetails, loading, error } = useSelector((state)=> state.orders);

    useEffect(()=>{
        dispatch( fetchDetailsById(id))
    },[dispatch, id]);

    if(loading)
        return <p>Order details are loading...</p>

    if(error)
        return <p> Error: {error}</p>

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6'>
        <h1 className='text-2xl md:text-3xl mb-6 font-bold'>Order Details</h1>
        {
            !orderDetails ? <p>No Order Details Found!!</p> :
            <div className='border w-full p-4 sm:p-6 bg-white rounded-lg '>
                <div  className='flex flex-col sm:flex-row justify-between mb-8 '>
                    <div>
                        <h2 className='font-semibold text-lg md:text-xl'> Order ID: #{orderDetails?._id}</h2>
                        <p className='text-gray-600 '> {new Date(orderDetails.createdAt).toLocaleDateString()} </p>
                    </div>
                    <div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
                        <span className={`${orderDetails.isPaid ? "text-green-700 bg-green-100" : "bg-red-100 text-red-700 "} px-3 py-1 rounded-full text-sm font-medium mb-2 `}> {orderDetails.isPaid ? "Paid" : "Pending"} </span>
                        <span className={`${orderDetails.isDelivered ? "text-green-700 bg-green-100" : "bg-yellow-100 text-yellow-700 "} px-3 py-1 rounded-full text-sm font-medium mb-2`}> {orderDetails.isDelivered ? "Delivered" : "Pending Delivery" } </span>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
                    <div>
                        <h4 className='text-lg font-semibold mb-2 '>Payment Info</h4>
                      <p> Payment Method:<span className='font-semibold'> {orderDetails.paymentMethod}</span> </p>
                        <p>Status: <span className='font-semibold'> {orderDetails.isPaid ? "Paid" : "Unpaid"} </span></p>
                    </div>
                    <div>
                        <h2 className='text-lg font-semibold mb-2'>Shipping Info</h2>
                        <p>Shipping Method:<span className='font-semibold'> {orderDetails.shippingMethod}</span>  </p>
                        <p>Address:<span className='font-semibold'> { orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.country }</span> </p>
                    </div>
                </div>

                <div className=' w-full overflow-x-auto'>
                    <h2 className='text-lg font-semibold mb-4'>Products</h2>
                    <table className='min-w-full  text-gray-600 mb-4'>
                        <thead className='bg-gray-100'>
                            <tr>
                                <th className='py-2 px-4'>Name</th>
                                <th className='py-2 px-4'>Unit Price</th>
                                <th className='py-2 px-4'>Quantity</th>
                                <th className='py-2 px-4'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.orderItems.map((product)=>(
                                <tr key={product.productId} className='boder-b'>
                                    <td className='px-4 py-2 flex items-center'>
                                            <img src={product.image} alt={product.name}
                                                className='w-12 h-12 rounded-lg mr-4 object-cover' />
                                            <Link to={`/product/${product.productId}`} className='text-blue-600 hover:underline' >{product.name}</Link>
                                    </td>
                                    <td className='px-4 py-2 '>${product.price}</td>
                                    <td className='px-4 py-2 '> ${product.quantity} </td>
                                    <td className='px-4 py-2 '> ${product.price * product.quantity} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Link to='/my-orders/' className='text-blue-500 hover:underline'>Back to My orders</Link>
            </div>
        }
        
    </div>
  )
}

export  default OrderDetails;
