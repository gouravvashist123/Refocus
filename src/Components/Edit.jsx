import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../Utils/Context';
import { nanoid } from 'nanoid';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {
    
    const [products, setProducts] = useContext(ProductContext);
    const {id} = useParams();
    const [product, setproduct] = useState({
        title : '',
        image : '',
        price : '',
        description : '',
        category : '',
    });
    // const [title, setTitle] = useState("");
    // const [image, setImage] = useState("");
    // const [price, setPrice] = useState("");
    // const [description, setDescription] = useState("");
    // const [category, setCategory] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        setproduct(products.filter((p) => p.id == id)[0]);
    }, [id])

    const changeHandler = ((e) => {

        setproduct({...product, [e.target.name] : e.target.value})
    })

    const AddProductHandler = (e)=>{
        e.preventDefault();

        if(
            product.title.trim().length < 5 ||
            product.image.trim().length < 5 ||
            product.category.trim().length < 5  ||
            product.price.trim().length < 1 ||
            product.description.trim().length < 5
        ) {
            alert("Each input must have atleast five characters");
            return;
        }

        const pi=products.findIndex((p) => p.id == id);

        const copyData = [...products];
        copyData[pi] = {...products[pi], ...product};

        // console.log(pi, product);

        setProducts(copyData);
        localStorage.setItem("products", JSON.stringify(copyData));
        navigate(-1);
        // console.log(products);
    }

  return (
    <form 
        onSubmit={AddProductHandler}
        className='flex flex-col items-center p-[5%] w-screen h-screen'>
        <h1 className='mb-5 w-1/2 text-2xl'>Edit Product</h1>
        
        <input 
            type="url" 
            placeholder='Image Link'
            className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            onChange={changeHandler}
            name='image'
            value={product && product.image}
        />

        <input 
            type="text" 
            placeholder='Title'
            className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            onChange={changeHandler}
            name='title'
            value={product && product.title}
        />

        <input 
            type="text" 
            placeholder='Category'
            className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            onChange={changeHandler}
            name='category'
            value={product && product.category}
        />

        <input 
            type="number" 
            placeholder='Price'
            className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            onChange={changeHandler}
            name='price'
            value={product && product.price}
        />

        <textarea 
            onChange={changeHandler}
            placeholder='Description'
            value={product && product.description}
            className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            rows={5}
            name='description'>

        </textarea>

        <div className='w-1/2'>

            <button className='py-3 px-5 border rounded border-blue-200 text-blue-300'>
                Save Product
            </button>

        </div>

    </form>
  )
}

export default Edit
