import React from 'react'
import { RiDeleteBin3Line} from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { removeItemFromCart, updateQuantity } from '../../Redux/slices/cartSlice';



const CartContents = ({cart, userId, guestId}) => {
    const dispatch = useDispatch();
    const handleQuantity = (productId, delta, quantity, size, color)=>{
        const Quantity = quantity + delta;
        if(Quantity > 0){
            dispatch( updateQuantity({userId, guestId, productId, quantity:Quantity, size,color}));
        }
    }

    const deleteProductFromCart = (productId, size, color)=>{
        if(cart && cart?.products?.length > 0)
            dispatch( removeItemFromCart({productId, size, color, userId, guestId}));
    }
return (
    <div>
        { 
            cart?.products?.length > 0 ? (
                cart.products.map((product,index)=>{
                    return (
                    <div key={index} className='flex items-start justify-between py-4 border-b'>
                        <div className='flex items-start'>
                            <img src={product.image} alt={product.name} 
                                className='h-24 w-20 rounded mr-4 object-cover'/>
                        </div>
                        <div>
                            <h3>{product.name}</h3>
                            <p className='text-sm text-gray-500'> size :{product.size} | color: {product.color}                                 
                            </p>
                            <div className='flex items-center mt-2'>
                                <button onClick={()=> handleQuantity(product.productId, -1, product.quantity, product.size, product.color)}
                                    className='border rounded px-2 py-1 text-xl font-medium'>-</button>
                                <span className='mx-4'>{product.quantity}</span>
                                <button onClick={()=> handleQuantity(product.productId, 1, product.quantity, product.size, product.color)}
                                    className='border rounded px-2 py-1 text-xl font-medium'>+</button>
                            </div>
                        </div>
                        <div>
                            <p>$ {product.price.toLocaleString()} </p>
                            <button onClick={()=> deleteProductFromCart(product.productId, product.size, product.color)}>
                                <RiDeleteBin3Line className='h-6 w-6 text-red-600'/>
                            </button>
                        </div>
                    </div>)
                })
            ) : (<p> No products in the cart!!</p>)
        }
    </div>
)
}

export default CartContents