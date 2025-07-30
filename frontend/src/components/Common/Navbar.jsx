import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight
} from 'react-icons/hi2';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../../Redux/slices/cartSlice';
import SearchBar from '../Common/SearchBar';
import CartDrawer from '../Common/CartDrawer';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [navbarDrawerOpen, setNavbarDrawerOpen] = useState(false);

  const { user, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const location = useLocation();

  const hideButtonPaths = ['/login', '/register'];
  const currentPath = location.pathname + location.search;

  const totalItems = (cart?.products ?? []).reduce(
    (total, item) => item.quantity + total,
    0
  );

  const handleNavbarDrawer = () => {
    setNavbarDrawerOpen((prev) => !prev);
  };

  const handleDrawerToggle = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCart({ userId: user.id, guestId }));
    }
  }, [user, dispatch, guestId]);

  const getActiveClass = (path) =>
    currentPath.includes(path)
      ? 'bg-black text-white'
      : 'hover:bg-gray-500 hover:text-black text-gray-700';

  return (
    <>
      {/* Top Navbar */}
      <nav className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold">Vastra</Link>
        </div>

        {/* Center nav links - hidden on mobile */}
        <div className="hidden md:flex space-x-4">
          {['Men', 'Women'].map((gender) => (
            <Link
              key={gender}
              to={`/collections/all?gender=${gender}`}
              className={`text-sm font-medium uppercase px-3 py-1 rounded ${getActiveClass(`gender=${gender}`)}`}
            >
              {gender}
            </Link>
          ))}
          {['Top Wear', 'Bottom Wear'].map((category) => (
            <Link
              key={category}
              to={`/collections/all?category=${category}`}
              className={`text-sm font-medium uppercase px-3 py-1 rounded ${getActiveClass(`category=${category}`)}`}
            >
              {category}
            </Link>
          ))}
        </div>

        {/* Right icons */}
        <div className="flex items-center space-x-4">
          {user?.role === 'admin' && (
            <Link
              to="/admin"
              className="bg-black text-sm text-white rounded px-2 py-1 font-medium"
            >
              Admin
            </Link>
          )}
          {user ? (
            <Link to="/profile" className="hover:text-black">
              <HiOutlineUser className="h-6 w-6 text-gray-700" />
            </Link>
          ) : (
            !(hideButtonPaths.includes(location.pathname)) &&
            <Link to="/login">
              <button className="bg-black text-sm text-white rounded px-2 py-1 font-medium">Login / Signup</button>
            </Link>
          )}

          <button className="relative hover:text-black" onClick={handleDrawerToggle}>
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {totalItems > 0 && (
              <span className="absolute top-0 -right-2 bg-red-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {totalItems}
              </span>
            )}
          </button>

          <div className="hidden sm:block">
            <SearchBar />
          </div>

          {/* Hamburger */}
          <button className="md:hidden" onClick={handleNavbarDrawer}>
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isDrawerOpen={isDrawerOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 sm:w-1/2 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          navbarDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button onClick={handleNavbarDrawer}>
            <IoMdClose className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          {['Men', 'Women'].map((gender) => (
            <Link
              key={gender}
              to={`/collections/all?gender=${gender}`}
              onClick={handleNavbarDrawer}
              className={`uppercase px-3 py-1 rounded ${getActiveClass(`gender=${gender}`)}`}
            >
              {gender}
            </Link>
          ))}
          {['Top Wear', 'Bottom Wear'].map((category) => (
            <Link
              key={category}
              to={`/collections/all?category=${category}`}
              onClick={handleNavbarDrawer}
              className={`uppercase px-3 py-1 rounded ${getActiveClass(`category=${category}`)}`}
            >
              {category}
            </Link>
          ))}
          <div className="block sm:hidden pt-4 border-t">
            <SearchBar />
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      {navbarDrawerOpen && (
        <div
          onClick={handleNavbarDrawer}
          className="fixed inset-0 bg-black opacity-30 z-40 md:hidden"
        />
      )}
    </>
  );
};

export default Navbar;
