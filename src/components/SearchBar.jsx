import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {search, showsearch,setSearch,setShowSearch} = useContext(ShopContext);
    const [visible,setVisible] = useState(false);
    const location = useLocation();

    useEffect(()=>{
      
      console.log(location.pathname);

      if(location.pathname.includes('collection')){
        setVisible(true);
        
      }
      else{
        setVisible(false);
      }

    },[location])

    

  return showsearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input value={search} onChange={(e)=>setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' type='text' placeholder='Search' />
            <FontAwesomeIcon icon={faMagnifyingGlass} className=' cursor-pointer' />
        </div>
        <FontAwesomeIcon onClick={()=>setShowSearch(false)} icon={faXmark} className=' cursor-pointer w-3 inline ' />
    </div>
  ) : null
}

export default SearchBar
