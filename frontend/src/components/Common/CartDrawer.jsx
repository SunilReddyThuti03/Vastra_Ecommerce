import React from 'react';
import { IoMdClose } from 'react-icons/io';
import CartContents from "../Cart/CartContents";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CartDrawer = ({ isDrawerOpen, handleDrawerToggle }) => {
  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const userId = user ? user.id : null;
  const navigate = useNavigate();

  const handleCheckout = () => {
    handleDrawerToggle();
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate("/checkout");
    }
  };

  if (!isDrawerOpen) return null;

  return (
    // Background overlay
    <div
      className="fixed inset-0  z-40"
      onClick={handleDrawerToggle}
    >
      {/* Drawer */}
      <div
        className={`absolute right-0 top-0 w-3/4 sm:w-1/2 md:w-[24rem] h-full
          bg-white shadow-lg transform transition-transform duration-300 flex flex-col z-50`}
        onClick={(e) => e.stopPropagation()} // Prevent overlay click
      >
        {/* Close Button */}
        <div className='flex justify-end p-4'>
          <button onClick={handleDrawerToggle}>
            <IoMdClose className='h-6 w-6 text-gray-600' />
          </button>
        </div>

        {/* Cart Contents */}
        <div className='flex-grow p-4 overflow-y-auto'>
          <p className='text-xl font-semibold mb-4'>Your Cart</p>
          {cart?.products?.length > 0 ? (
            <CartContents cart={cart} userId={userId} guestId={guestId} />
          ) : (
            <p>The Cart is empty!!</p>
          )}
        </div>

        {/* Checkout Button */}
        {cart?.products?.length > 0 && (
          <div className='sticky p-4 bottom-0 bg-white'>
            <button
              onClick={handleCheckout}
              className='w-full rounded-full py-3 font-semibold bg-black text-white hover:bg-gray-800 transition'
            >
              Checkout
            </button>
            <p className='text-sm tracking-tighter text-gray-500 mt-2 text-center'>
              Shipping, taxes, and discount codes calculated at checkout.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
