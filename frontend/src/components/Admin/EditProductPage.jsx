import React,{ useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, updateProduct} from '../../Redux/slices/productSlice';
import axios from 'axios';

const EditProductPage = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, loading, error} = useSelector((state)=> state.products);
    const navigate = useNavigate();

    const [productData, setProductData] = useState({
        name:"",
        description:"",
        price:0,
        countInStock : 0,
        sku:"",
        category :"",
        brand:"",
        sizes:[],
        colors:[],
        collections:"",
        material :"",
        gender:"",
        images:[
            { url: "https://picsum.photos/150?random=1",},
            { url : "https://picsum.photos/150?random=2"},
        ], 
    });

    const [uploading, setUploading] = useState( false );
     
    useEffect(()=>{
        if(id){
            dispatch( fetchProductDetails(id));
        }
    },[dispatch, id]);

    useEffect(()=>{
        if(selectedProduct){
            setProductData( selectedProduct);
        }
    },[selectedProduct]);

    useEffect(()=>{
        const product = dispatch( fetchProductDetails(id));
        setProductData(product);
    },[id, dispatch]);

    const handleChange= (e)=>{
        const { name, value} = e.target;
        setProductData((prevData)=> ({...prevData, [name]: value}));
    };

    const handleImageUpload = async(e)=>{
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try{
            setUploading(true);
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/upload`, formData,{
                headers:{
                    "Content-Type": "multipart/form-data"
                },
            }) ;
            setProductData( (prevData)=> ({
                ...prevData,
                images:[...prevData.images, {url: data.imageUrl, altText:""}]
            }))
            setUploading(false); 
        } catch (Error){
            setUploading(false);
        }
    }

    const handleSubmit= (e) =>{
        e.preventDefault();
        dispatch( updateProduct({id, productData}));
        navigate("/admin/products");

    }
    

    if(loading)
            return <p>Loading...</p>
    if(error)
        return <p>Error: {error}</p>

  return (
    <div className='max-w-5xl mx-auto p-6 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold mb-6 '>Edit Product</h2>
        <div>
            <form onSubmit={handleSubmit}>
                <div className='mb-6'>
                    <label className='text-sm block font-bold mb-2 '>Product Name</label>
                    <input type="text"
                        name='name'
                        value={productData.name} 
                        onChange={handleChange}
                        required
                        className='w-full border rounded p-1'/>
                </div>
                <div className='mb-6'>
                    <label className='text-sm block font-bold mb-2 '>Description</label>
                    <textarea type="text"
                        name='description'
                        value={productData.description} 
                        onChange={handleChange}
                        required rows={4}
                        className='w-full border rounded p-1'/>
                </div>
                <div className='mb-6'>
                    <label className='text-sm block font-bold mb-2 '>Price</label>
                    <input type="text"
                        name='price'
                        value={productData.price} 
                        onChange={handleChange}
                        required
                        className='w-full border rounded p-1'/>
                </div>
                <div className='mb-6'>
                    <label className='text-sm block font-bold mb-2 '>Count in Stock</label>
                    <input type="number"
                        name='countinstock'
                        value={productData.countInStock} 
                        onChange={handleChange}
                        required
                        className='w-full border rounded p-1'/>
                </div>
                <div className='mb-6'>
                    <label className='text-sm block font-bold mb-2 '>SKU</label>
                    <input type="text"
                        name='sku'
                        value={productData.sku} 
                        onChange={handleChange}
                        required
                        className='w-full border rounded p-1'/>
                </div>
                <div className='mb-6'>
                    <label className='text-sm block font-bold mb-2 '>Sizes (comma seperated)</label>
                    <input type="text"
                        name='sizes'
                        value={productData.sizes?.join(", ")} 
                        onChange={(e)=>setProductData({...productData, sizes: e.target.value.split(",").map((size)=>size.trim())})}
                        required
                        className='w-full border rounded p-1'/>
                </div>
                <div className='mb-6'>
                    <label className='text-sm block font-bold mb-2 '>Colors (comma seperated)</label>
                    <input type="text"
                        name='colors'
                        value={productData.colors?.join(", ")} 
                        onChange={(e)=>setProductData({...productData, colors: e.target.value.split(",").map((color)=>color.trim())})}
                        required
                        className='w-full border rounded p-1'/>
                </div>
                <div className='mb-6'>
                    <label className='text-sm block font-bold mb-2'>Upload Image</label>
                    <input type="file"
                        name='images'
                        onChange={handleImageUpload}
                        className='border rounded mt-2 mb-2'/>
                        { uploading && <p>Uploading Image</p>}
                        <div className='flex gap-4 mt-4 '>
                            {productData.images?.map((image, index)=>(
                                <div  key={index}> 
                                <img src={image.url}  alt={image.altText} 
                                className='w-20 h-20 rounded object-cover shadow-md'/></div>
                            ))}
                        </div>
                </div>
                <div>
                    <button className='bg-green-500 hover:bg-green-600 transition-colors px-2 py-2 text-center text-white w-full rounded-lg uppercase'>
                        Update Product
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditProductPage
