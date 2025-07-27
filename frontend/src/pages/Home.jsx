import React,{useEffect, useState} from 'react';
import Hero from '../components/Layout/Hero';
import GenderCollection from '../components/Products/GenderCollection';
import NewArrivals from '../components/Products/NewArrivals';
import ProductDetails from '../components/Products/ProductDetails';
import ProductGrid from '../components/Products/ProductGrid';
import FeaturedCollection from '../components/Products/FeaturedCollection';
import FeaturedSection from '../components/Products/FeaturedSection';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchProductByFilter } from '../Redux/slices/productSlice';

const Home = () => {
    const [bestSellerProduct, setBestSellerProduct] = useState(null);
    const dispatch = useDispatch();
    const {products, loading, error}= useSelector((state)=>state.products);

    useEffect(()=>{
        dispatch(
            fetchProductByFilter({
                gender:"Women",
                category:"Top Wear",
                limit:8,
            })
        )

    const fetchBestSeller = async() =>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
            setBestSellerProduct(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    fetchBestSeller();
     },[dispatch]);
  return (
    <div>
        <Hero/>
        <GenderCollection/>
        <NewArrivals/>
        {/* best sellers */}
        <h2 className='text-3xl text-center font-bold b-4'>Best Seller</h2>
        { bestSellerProduct && bestSellerProduct._id ? (
            <ProductDetails productId={bestSellerProduct._id} />) :(
                <p>Loading...</p> )
        }

        <div className='container mx-auto'>
            <h2 className='text-3xl text-center font-bold mb-4 '>Top Wear for Women</h2>
            <ProductGrid products={products} loading={loading} error={error} />
        </div>

        <FeaturedCollection/>
        <FeaturedSection/>
    </div>
  )
}

export default Home
