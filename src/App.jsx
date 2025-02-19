import { useState } from 'react'
import Home from './Components/Home'
import Details from './Components/Details'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Create from './Components/Create';
import Edit from './Components/Edit';

function App() {

  const {search, pathname} = useLocation();

  return (
     <div className='h-screen w-screen flex'>

      {(pathname != '/' || search.length > 0) && (

        <Link to='/' className='text-red-300 absolute left-[17%] top-[3%]'>
          Home
        </Link>

      )}
        <Routes>
           <Route path='/' element={<Home/>}></Route>
           <Route path='/details/:id' element={<Details/>}></Route>
           <Route path='/create' element={<Create/>}></Route>
           <Route path='/edit/:id' element={<Edit/>}></Route>
        </Routes>
     </div>
  )
}

export default App;
