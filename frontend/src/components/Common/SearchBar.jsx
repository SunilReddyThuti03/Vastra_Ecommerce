import React, { useState } from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { fetchProductByFilter, setFilters } from '../../Redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchItem, setSearchItem] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchItem.trim()) return;
    dispatch(setFilters({ search: searchItem }));
    dispatch(fetchProductByFilter({ search: searchItem }));
    navigate(`/collections/all?search=${searchItem}`);
    setIsOpen(false);
  };

  return (
    <div
      className={`transition-all duration-300 z-10 ${
        isOpen
          ? 'fixed top-0 left-0 w-full bg-white h-20 flex items-center px-4 shadow-md'
          : 'relative'
      }`}
    >
      {isOpen ? (
        <>
          <form
            onSubmit={handleSearch}
            className="flex items-center justify-between w-full"
          >
            <div className="relative w-full">
              <input
                autoFocus
                type="text"
                placeholder="Search"
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="w-full bg-gray-100 px-4 py-2 pr-10 rounded-lg focus:outline-none placeholder:text-gray-700"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-black"
              >
                <HiMagnifyingGlass className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Close Icon (X) - stays far right */}
          <button
            onClick={handleSearchToggle}
            className="ml-4 text-gray-600 hover:text-black"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </>
      ) : (
        <button onClick={handleSearchToggle} className="text-gray-800">
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
