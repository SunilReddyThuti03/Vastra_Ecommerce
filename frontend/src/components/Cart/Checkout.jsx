import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import PaypalButton from './PaypalButton';
import { useDispatch, useSelector } from 'react-redux';
import { createCheckout } from '../../Redux/slices/checkoutSlice';
import axios from 'axios';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { FaGift } from 'react-icons/fa';

const Checkout = () => {
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  });

  const [checkoutId, setCheckoutId] = useState(null);

  // Gift box toggle and message
  const [showGift, setShowGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    if (cart && cart.products.length > 0) {
      const response = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress,
          paymentMethod: 'Paypal',
          totalPrice: cart?.totalPrice ?? 0,
          gift: giftMessage, // Add gift message to backend if needed
        })
      );
      if (response.payload && response.payload._id) {
        setCheckoutId(response.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: 'isPaid',
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      navigate('/order-conformation');
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products?.length > 0) return <p>Your cart is empty</p>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-sm mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={user.email}
              className="w-full p-1 border rounded"
              disabled
            />
          </div>

          <h3 className="text-sm mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                required
                className="w-full p-1 border rounded"
                value={shippingAddress.firstName}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, firstName: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                required
                className="w-full p-1 border rounded"
                value={shippingAddress.lastName}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, lastName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              required
              className="w-full p-1 border rounded"
              value={shippingAddress.address}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, address: e.target.value })
              }
            />
          </div>

          <div className="mb-4 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-700">City</label>
              <input
                type="text"
                required
                className="w-full p-1 border rounded"
                value={shippingAddress.city}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, city: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700">Postal Code</label>
              <input
                type="number"
                required
                className="w-full p-1 border rounded"
                value={shippingAddress.postalCode}
                onChange={(e) =>
                  setShippingAddress({ ...shippingAddress, postalCode: e.target.value })
                }
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input
              type="text"
              required
              className="w-full p-1 border rounded"
              value={shippingAddress.country}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, country: e.target.value })
              }
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="number"
              required
              className="w-full p-1 border rounded"
              value={shippingAddress.phone}
              onChange={(e) =>
                setShippingAddress({ ...shippingAddress, phone: e.target.value })
              }
            />
          </div>

          {/* Gift Option Toggle */}
          <div className="mb-4 flex items-center justify-between">
            <label className="text-sm font-medium">Use this credentials to pay via PayPal!!</label>
            <button
              type="button"
              onClick={() => setShowGift(!showGift)}
              className="text-pink-600 hover:text-pink-800"
              title="Add a gift message"
            >
              <FaGift className="h-5 w-5" />
            </button>
          </div>

          {showGift && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-1">email  : payment@paypa.com  </label>
              <label  className="block text-gray-700 text-sm mb-1">Password  : {`Abc@12345`}</label>
            </div>
          )}

          <div className="mt-4">
            {!checkoutId ? (
              <button
                type="submit"
                className="bg-black text-white w-full py-2 rounded flex items-center justify-center gap-2"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <PayPalScriptProvider
                  options={{ 'client-id': import.meta.env.VITE_PAYPAL_CLIENT_ID }}
                >
                  <PaypalButton
                    amount={cart.totalPrice}
                    onSuccess={handlePaymentSuccess}
                    onError={() => alert('Payment failed. Try again')}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-sm text-center mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart?.products.map((product, index) => (
            <div className="flex items-start justify-between py-2 border-b" key={index}>
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-20 h-24 object-cover mr-4"
                />
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size: {product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-sm mb-4">
          <p>Subtotal</p>
          <p>${cart?.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-sm">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-sm mt-4 border-t pt-4">
          <p>Total Price</p>
          <p>${cart?.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
