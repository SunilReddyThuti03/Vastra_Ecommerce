import React, { useEffect, useState } from 'react'
import {toast } from 'sonner';
import ProductGrid from './ProductGrid';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails,fetchSimilarProducts } from '../../Redux/slices/productSlice';
import { addToCart } from '../../Redux/slices/cartSlice';


function ProductDetails({ productId}) {

    const {id} = useParams();
    const fetchProductById =  productId  || id;
    const dispatch = useDispatch();
    const { selectedProduct, loading, error,similarProducts } = useSelector((state)=> state.products);
    const { user, guestId } = useSelector((state)=> state.auth);

    useEffect(()=>{
        if(fetchProductById){
            
          dispatch(fetchProductDetails(fetchProductById));
          dispatch(fetchSimilarProducts(fetchProductById));
        };
    },[dispatch,fetchProductById]);

 

    const [mainImage, setMainImage] = useState(null);
    const [selectedSize,setSelectedSize] = useState("");
    const [selectedColor,setSelectedColor] = useState("");
    const [quantity,setQuantity] = useState(1);

    useEffect(()=>{
        if( selectedProduct?.images?.length > 0){
            setMainImage(selectedProduct.images[0].url);
        }
    },[selectedProduct]);

    const handleQuantity=( operation )=>{
        if(operation === "minus" && quantity > 1)
            setQuantity((prev)=>prev - 1);
        else
            setQuantity((prev)=>prev+ 1);
    }

    const handleAddToCart =()=>{
        if(!selectedSize || !selectedColor){
            toast.error("Please select size and color of the product",{
        duration: 1000,});
        return;
        }
        dispatch(addToCart({
            productId : fetchProductById,
            quantity ,
            size: selectedSize, 
            color : selectedColor, 
            userId:  user?.id,
            guestId,
        }))
        .then(()=>{
            toast.success("Product added to the cart!",{
                duration : 1000,
            })
        })
        // .finally(()=>{
        //     setIsButtonDisabled(true);
        // });
    }
    if(!selectedProduct || loading){
      return   <p> Loading...</p>
    }

    if(error){
      return   <p>Error : {error}</p>
    }
  return (
    
    <div className='px-6 md:ml-20'>
        <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
            <div className='flex flex-col md:flex-row'>
                {/* left thumbnail */}
                <div className='hidden md:flex mt-20 flex-col space-y-4 mr-6 '>
                    {selectedProduct.images.map((image,index)=>(
                        <img 
                            key={index} 
                            src={image.url} 
                            onClick={()=>setMainImage(image.url)}
                            alt={image.altText || `Thumbnail${index}`}
                            className={`w-20 h-30 object-cover rounded-lg cursor-pointer border${mainImage === image.url ? ' border-gray-900 border-4':''}`}>
                            </img>
                    ))}
                 </div>
                    {/* main image */}
                <div className=' flex items-center justify-center wd:w-1/2'>
                    <div className='  mb-4 h-70 w-80'>
                        <img src={mainImage} alt="Main Product" 
                        className='w-full h-full object-cover rounded-lg'/>
                    </div>
                </div>
                    {/* mobile thumbnail */}
                <div className='md:hidden flex overscroll-x-scroll space-x-4 mb-4'>
                        {selectedProduct.images.map((image,index)=>(
                        <img 
                            key={index} 
                            src={image.url}
                            onClick={()=>setMainImage(image.url)} 
                            alt={image.altText || `Thumbnail${index}`}
                            className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? 'border-gray-900 border-4':''}`}
                            ></img>
                        ))}
                </div>
                {/* Right side */}
                <div className='md:w-1/2 md:ml-10'>
                        <h1 className='text-2xl md:text-3xl font-semibold mb-2'>
                            {selectedProduct.name}
                        </h1>
                        <p className='text-lg text-gray-600 mb-1 line-through'>
                        $ {`${selectedProduct.price}`}
                        </p>
                        <p className='text-xl text-gray-500 mb-2'>
                           $ {selectedProduct.discountPrice}
                        </p>
                        <p className='text-gray-600 mb-4'>
                            {selectedProduct.description}
                        </p>
                        <div className='mb-4'>
                            <p className='text-gray-700 '>Color:</p>
                            <div className='flex gap-2 mt-2'>
                                {selectedProduct.colors.map((color)=>(
                                    <button
                                    key={color} 
                                    onClick={()=>setSelectedColor(color)}
                                    className={`w-8 h-8 rounded-full border ${selectedColor===color ? 'border-black border-4':'border-gray-300'} `}
                                    style={{backgroundColor:color.toLocaleLowerCase(),filter:"brightness(0.5)",}}>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='mb-4'>
                            <p className='text-gray-700 '>Size:</p>
                            <div className='flex gap-2 mt-2'>
                                {selectedProduct.sizes.map((size)=>(
                                    <button key={size} onClick={()=>setSelectedSize(size)} className={`px-4 py-2 rounded border ${selectedSize === size ?'bg-black text-white':''}`}>{size}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className='mb-4'>
                            <p className='text-gray-700 ' >Quantity:</p>
                            <div className='flex items-center space-x-4 mt-2'>
                                <button className='px-2 bg-gray-200 text-lg rounded' onClick={()=> handleQuantity("minus")}>-</button>
                                <span className='text-lg '>{quantity}</span>
                                <button className='px-2 bg-gray-200 text-lg rounded' onClick={()=> handleQuantity("plus")}>+</button>
                            </div>
                        </div>
                        <button  
                         onClick={handleAddToCart}
                         className={`px-10 py-2 bg-black text-white rounded mb-4 w-[280px]  
                             "hover:bg-gray-900"`}
                        >ADD TO CART</button>
                        <div className=' text-gray-700'>
                            <h3 className='text-xl mb-4 font-bold'>Characteristics:</h3>
                            <table className='w-full text-left text-sm text-gray-600'>
                                <tbody className='py-1'>
                                    <tr>
                                        <td  className='py-1'>Brand</td>
                                        <td className='py-1'>{selectedProduct.brand}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1'>Material</td>
                                        <td className='py-1'>{selectedProduct.material}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                </div>
            </div>
            
            <div className='mt-20'>
                <h2 className='text-2xl text-center font-medium mb-4'>You May Aslo Like</h2>
                <ProductGrid products={similarProducts} loading={loading} error={error}  />
            </div>
         </div>
    </div>
  )
}

export default ProductDetails;