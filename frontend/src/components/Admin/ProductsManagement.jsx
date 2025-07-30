import React,{ useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { deleteProduct, fetchAdminProducts} from "../../Redux/slices/adminProductsSlice";

const ProductsManagement = () => {

    const dispatch = useDispatch();
    const { products } = useSelector((state)=> state.adminProducts);
    const handleDelete = (productId) =>{
        if(window.confirm("Are you sure you want to delete this product?")){
            dispatch( deleteProduct(productId));
        }
    };

    useEffect(()=>{
        dispatch( fetchAdminProducts());
    },[dispatch]);


  return (
    <div className='max-w-7xl p-6 mx-auto'>
      <h2  className='text-3xl font-bold mb-6'>Product Management</h2>
        <div className='overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='min-w-full text-gray-800 rounded-lg p-3 text-left'>
                <thead className='text-gray-700 text-xs uppercase bg-gray-100'>
                    <tr>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Price</th>
                        <th className='px-4 py-2'>SKU</th>
                        <th className='px-4 py-2'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { products.length > 0 ?
                    products.map((product)=>(
                        <tr key={product._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                            <td className='px-4 py-2'>{product.name}</td>
                            <td className='px-4 py-2'>{product.price}</td>
                            <td className='px-4 py-2'>{product.sku}</td>
                            <td className='px-4 py-2'>
                                <Link to={`/admin/products/${product._id}/edit`}
                                className='bg-yellow-500 px-4  hover:bg-yellow-600 py-2 text-white rounded mr-2'>Edit</Link>
                                <button onClick={()=>handleDelete(product._id)}
                                    className='bg-red-500 sm:m-3 px-4 py-2 hover:bg-red-600 text-white rounded'>DELETE</button>
                            </td>
                        </tr>
                    )):(
                        <tr>
                            <td colSpan={4} className='text-center font-medium text-gray-700 p-3'>No Products Found!!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default ProductsManagement
