import React, { useContext, useState } from 'react'
import { ProductContext } from '../Utils/Context';
import { nanoid } from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Create = () => {

    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [products, setProducts] = useContext(ProductContext);
    const navigate = useNavigate();

    const AddProductHandler = (e)=>{
        e.preventDefault();

        if(
            title.trim().length < 5 ||
            image.trim().length < 5 ||
            category.trim().length < 5  ||
            price.trim().length < 1 ||
            description.trim().length < 5
        ) {
            alert("Each input must have atleast five characters");
            return;
        }

        const product =  {
            id : nanoid(),
            title,
            image,
            category,
            price,
            description
        };
        setProducts([...products, product]);
        localStorage.setItem("products", JSON.stringify([...products, product]));
        toast.success("Product added successfully !");
        navigate('/');
        // console.log(products);
    }

  return (
    <form 
        onSubmit={AddProductHandler}
        className='flex flex-col items-center p-[5%] w-screen h-screen'>
        <h1 className='mb-5 w-1/2 text-2xl'>Add New Product</h1>
        
        <input 
            type="url" 
            placeholder='Image Link'
            className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            onChange={(e) => setImage(e.target.value)}
            value={image}
        />

        <input 
            type="text" 
            placeholder='Title'
            className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
        />

        <input 
            type="text" 
            placeholder='Category'
            className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            onChange={(e) => setCategory(e.target.value)}
            value={category}
        />

        <input 
            type="number" 
            placeholder='Price'
            className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            onChange={(e) => setPrice(e.target.value)}
            value={price}
        />

        <textarea 
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
            value={description}
            className='text-xl bg-zinc-100 rounded p-3 w-1/2 mb-3'
            rows={5}>
        </textarea>

        <div className='w-1/2'>

            <button className='py-3 px-5 border rounded border-blue-200 text-blue-300'>
                Add Product
            </button>

        </div>

    </form>
  )
}

export default Create
