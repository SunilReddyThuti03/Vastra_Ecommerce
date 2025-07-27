import React, { useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { clearCart} from '../Redux/slices/cartSlice';

const OrderConfirmation = () => {

    const calculateEstimatedDelivery= (createdAt)=>{
        const orderDate = new Date(createdAt);
        orderDate.setDate( orderDate.getDate() + 10);
        return orderDate.toLocaleDateString();
    }

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state)=> state.checkout);

    useEffect(()=>{
        if(checkout && checkout._id){
            dispatch(clearCart());
            localStorage.removeItem("cart");
        } else {
            navigate("/my-orders");
        }
    }, [checkout, dispatch, navigate]);

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white'>
        <h1 className='text-4xlfont-bold text-center text-emerald-700 mb-8'>
            Thank You for Your Order!!
        </h1>
        {
            checkout && (
                <div className='p-6 rounded-lg border'>
                    <div className='flex justify-between mb-20'>
                        <div>
                            <h2 className='text-xl font-semibold'>
                                Order Id: {  checkout._id }
                            </h2>
                            <p className='text-gray-500'>
                                Order Date: {new Date(checkout.createdAt).toLocaleDateString()}
                            </p>
                        </div>

                        <div >
                            <p className='text-emerald-700 text-sm'>
                                Estimated Delivery: {""}
                                {calculateEstimatedDelivery(checkout.createdAt)}
                            </p>
                        </div>
                    </div>
                    <div className='mb-20 '>
                        {
                            checkout.checkoutItems.map((product)=>(
                                <div key ={product._id}
                                    className='flex items-center justify-between mb-4 '>
                                        <div className='flex px-3 mr-4'>
                                            <img src={product.image} alt={ product.name}
                                                className='w-16 h-16 object-cover rounded mr-4 ' />
                                            <div>
                                                <h1 className='text-md font-semibold '>{product.name}</h1>
                                                <p className='text-sm text-gray-500 '>{product.color} | {product.size}</p>
                                            </div>
                                        </div>
                                        <div className='ml-auto text-right'>
                                            <p className='text-md'>${product.price}</p>
                                            <p className='text-sm text-gray-500'>Qty: {product.quantity}</p>
                                        </div>
                                    </div>
                            ))
                        }
                    </div>
                    <div className='grid grid-cols-2 gap-8 mb-8'>
                        <div>
                            <h4 className='text-lg mb-2 font-semibold'>Payment</h4>
                            <p className='text-gray-600 '>Paypal</p>
                        </div>
                        <div >
                            <h3 className='text-lg mb-2 font-semibold '>Delivery</h3>
                            <p className='text-gray-600'>{ checkout.shippingAddress.address}</p>
                            <p className='text-gray-600'> {checkout.shippingAddress.city} | {checkout.shippingAddress.country}</p>
                        </div>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default OrderConfirmation
