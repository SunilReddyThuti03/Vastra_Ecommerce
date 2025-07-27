import React,{useState} from 'react';
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { fetchProductByFilter,setFilters } from '../../Redux/slices/productSlice';
import {  useNavigate } from 'react-router-dom';

const SearchBar = () => {
    
    const [searchItem, setSearchItem] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchToggle = ()=>{
        setIsOpen(!isOpen);
    }
    const handleSearch =(e)=>{
        e.preventDefault();
        dispatch(setFilters({search: searchItem}));
        dispatch(fetchProductByFilter({search : searchItem}));
        navigate(`collections/all?search=${searchItem}`);
        setIsOpen(false);
    }
  return (
    <div className={`flex items-center w-full transition-all duration-300  
    ${isOpen ?  "absolute top-0 left-0 w-full bg-white h-24 z-50 ":" w-auto"}`}>
        {
            isOpen ? (
                <form onSubmit={handleSearch} className='relative flex items-center justify-center w-full'>
                    <div  className='relative w-1/2'>
                    <input 
                        autoFocus
                        placeholder='Search'
                        type='text'
                        onChange={(e)=> setSearchItem(e.target.value)}
                        className='bg-gray-100 px-4 py-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700'>
                    </input>
                    <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                        <HiMagnifyingGlass className='h-6 w-6'/>
                    </button>
                </div>
                {/* close button for th epop up */}
                <button type='button'  onClick={handleSearchToggle} className='absolute right-4 top-1/2 transform -translate-y-1/2  text-gray-600 hover:text-gray-800 '>
                    <HiMiniXMark className='h-6 w-6'/>
                </button>
                </form>
            ) :(
                <button onClick={handleSearchToggle}>
                    <HiMagnifyingGlass className='h-6 w-6'/>
                </button>
            ) }
    </div>
)
};

export default SearchBar
