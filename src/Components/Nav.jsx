import React, { useContext } from 'react'
import { ProductContext } from '../Utils/Context'
import { Link } from 'react-router-dom';

const Nav = () => {

  const [products] = useContext(ProductContext);

  let distinct_category = products && products.reduce((acc, cv) => [...acc, cv.category], [])
  distinct_category = [...new Set(distinct_category)];

  const color = () =>{
    return `rgba(${(Math.random()*255).toFixed()}, ${(Math.random()*255).toFixed()}, ${(Math.random()*255).toFixed()}, 0.4)`;
  }

  return (
      <nav className='w-[15%] h-full bg-zinc-50 flex flex-col items-center pt-5'>
            <a className='py-3 px-5 border rounded border-blue-200 text-blue-300' href="/create">Add New Product</a>
            <hr className='my-3 w-[80%]' />
            <h1 className='text-2xl mb-3 w-[80%]'>Category Filter</h1>
            <div className='w-[80%]'>
                {distinct_category.map((c,i)=>{

                 return <Link
                   key={i}
                   to={`/?category=${c}`}
                   className=' mb-3 flex items-center'>
                    <span style={{backgroundColor : color()}} className='rounded-full mr-2 w-[15px] h-[15px]'></span>
                    {c}
                  </Link>

                })}
            </div>
        </nav>
  )
}

export default Nav
