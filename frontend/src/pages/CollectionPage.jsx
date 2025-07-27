import React,{useEffect, useRef,useState} from 'react';
import {FaFilter} from "react-icons/fa";
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOptions from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import {useDispatch, useSelector} from 'react-redux';
import {fetchProductByFilter} from "../Redux/slices/productSlice";
import { useParams, useSearchParams } from 'react-router';

const CollectionPage = () => {

    const sidebarRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { collection } = useParams();
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const { products, loading, error} = useSelector((state)=> state.products);
    const queryParams = Object.fromEntries([...searchParams]);

    const toggleSidebar = () =>{
        setIsSidebarOpen( !isSidebarOpen);
    }

    const handleClickOutside = (e)=>{
        if(sidebarRef.current && !sidebarRef.current.contains(e.target))
            setIsSidebarOpen(false);
    }

    useEffect(()=>{
        document.addEventListener("mousedown", handleClickOutside);

        return () =>{
            document.removeEventListener("mousedown", handleClickOutside);
        }
    },[]);
    
    useEffect(()=>{
        dispatch(fetchProductByFilter({collection, ...queryParams}));
    },[dispatch,collection, searchParams]);



  return (
    <div className='flex flex-col lg:flex-row'>
        <button className='lg:hidden border p-2 flex justify-center items-center'
            onClick={toggleSidebar}>
                <FaFilter className='mr-2'/>
            </button>

        <div ref={sidebarRef}
            className={`${isSidebarOpen ? "translate-x-0" : " -translate-x-full"} fixed  inset-y-0 z-50
            left-0 w-72 bg-white overflow-y-auto transition-transform duration-500 lg:static lg:translate-x-0`}>
                <FilterSideBar/>
        </div>
        <div >
            <div className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-10">
  <h2 className="text-lg md:text-xl font-semibold uppercase mt-4 md:mt-6 mb-2 md:mb-4 text-center md:text-left">
    All Collections
  </h2>
  <SortOptions />
</div>

            <ProductGrid products={products} loading={loading} error={error} />
        </div>

    </div>
  )
}

export default CollectionPage
