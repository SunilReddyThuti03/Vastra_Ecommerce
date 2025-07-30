import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import login from "../assets/login.jpeg";
import { loginUser } from "../Redux/slices/AuthSlice";
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../Redux/slices/cartSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showError, setShowError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, guestId, loading, error } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const redirect = new URLSearchParams(location.search).get("redirect") || "/";
  const isCheckoutRedirect = redirect.includes("checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products?.length > 0 && guestId) {
        dispatch(mergeCart(guestId)).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, isCheckoutRedirect, navigate, dispatch]);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setFormError("Email and password are required");
      setShowError(true);
      return;
    }
    if (!validateEmail(email)) {
      setFormError("Enter a valid email address");
      setShowError(true);
      return;
    }

    setFormError("");
    setShowError(false);
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (formError || error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        setFormError("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [formError, error]);

  return (
    <div className='flex'>
      <div className='w-full flex md:w-1/2 flex-col justify-center items-center p-8 md:p-12'>
        <form onSubmit={handleSubmit}
          className='w-full max-w-md bg-white p-8 rounded-lg border shadow-sm'>

          <div className='flex justify-center mb-4'>
            <h2 className='text-xl font-medium'>Vastra</h2>
          </div>

          <h2 className='text-2xl font-bold text-center mb-2'>Hey There!</h2>

         {showError && (formError || error) ? (
            <p className='text-red-500 text-center mb-6'>
              {formError || "Invalid credentials"}
            </p>
          ) : (
            <p className='text-center text-gray-500 mb-6'>
              Enter your email and password to login
            </p>
          )}

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full p-2 border rounded'
              placeholder='Enter your email'
            />
          </div>

          <div className='mb-4'>
            <label className='block text-sm font-semibold mb-2'>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border rounded'
              placeholder='Enter your password'
            />
          </div>

          <button
            type="submit"
            className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>
            Login
          </button>

          <p className='mt-6 text-center text-sm'>
            Don't have an account?{" "}
            <Link
              to={`/register?redirect=${encodeURIComponent(redirect)}`}
              className='text-blue-500'>
              Register
            </Link>
          </p>
        </form>
      </div>

      <div className='hidden md:block w-1/2 bg-gray-800'>
        <div className='h-full flex flex-col justify-center items-center'>
          <img src={login} alt="Login to account" className='h-[650px] w-full object-cover' />
        </div>
      </div>
    </div>
  );
};

export default Login;
