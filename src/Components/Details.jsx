import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from '../Utils/Axios';
import Loading from './Loading';
import { ProductContext } from '../Utils/Context';

const Details = () => {

  const navigate = useNavigate();

  const {id} = useParams();
  const [products, setProducts] = useContext(ProductContext);

  const [product, setproduct] = useState(null);

  // const getSingleProduct = async ()=>{
  //   try {
  //     const {data} = await axios.get(`/products/${id}`);
  //     setproduct(data);
  //     // console.log(data);
  //   } catch (error) {
  //      console.log(error);
  //   }
  // }

  useEffect(()=>{ 
    if(!product){
      setproduct(products.filter((p) => p.id == id)[0]);
    }
    // getSingleProduct();
  }, [])

  const ProductDeleteHandler = (id) =>{
      const FilteredProducts = products.filter((p) => p.id !== id);
      setProducts(FilteredProducts);
      localStorage.setItem("products", JSON.stringify(FilteredProducts));
      navigate('/');
  }

  return (
    product ?
    <div className='w-[70%] flex justify-between items-center  h-full m-auto p-[10%]'>
         <img 
            className='object-contain h-[80%] w-[50%]' 
            src={`${product.image}`} 
            alt="" 
        />
         <div className='content w-[50%]'>
             <h1 className='text-4xl mb-2'>
               {product.title}
             </h1>
             <h3 className='text-zinc-400 mb-2'>{product.category}</h3>
             <h2 className='text-blue-400 mb-2'>$ {product.price}</h2>
             <p className='mb-5'>{product.description}</p>
             <Link to={`/edit/${product.id}`} className='mr-5 py-2 px-5 border-2 rounded border-blue-200 text blue-300'>Edit</Link>
             <button
                onClick={() => ProductDeleteHandler(product.id)}
                className='py-2 px-5 border-2 rounded border-red-200 text red-300'>Delete</button>
         </div>
    </div>
    : <Loading/>
  )
}

export default Details
