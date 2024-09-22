import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import {faBagShopping} from '@fortawesome/free-solid-svg-icons';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../context/ShopContext';
import Cookies from 'js-cookie';
// import {famaglight} from '@fortawesome/free-regular-svg-icons'


const Navbar = () => {


  const {setShowSearch,getCartCount,user,setUser} = useContext(ShopContext);

  const [visible,setVisible] = useState(false);



  const logoutuser = async () => {
    try {
      // Optional: Send a logout request to the backend
      await fetch('http://localhost:3001/logout', { method: 'POST', credentials: 'include' });

      // Clear user data from context and local storage
      setUser(null); // Assuming setUser updates the user context
      Cookies.remove('token');// Clear the token from local storage
      // Optionally redirect to home or login page after logout
      window.location.href = '/'; // Redirecting to home page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <div className='flex item-center justify-between py-5 font-medium'>

    <Link to='/'><img src={assets.logo} className='w-36' /></Link>

    <ul className='hidden sm:flex gap-5 text-sm '>
    <NavLink to='/' className='flex flex-col items-center gap-1'>
      <p>HOME</p>
      <hr className='w-2/4 border-none h-[1.5px] bg-yellow-500 hidden' />

    </NavLink>
    <NavLink to='/collection' className='flex flex-col items-center gap-1'>
      <p>COLLECTION</p>
      <hr className='w-2/4 border-none h-[1.5px] bg-yellow-500 hidden' />

    </NavLink>
    <NavLink to='/about' className='flex flex-col items-center gap-1'>
      <p>ABOUT</p>
      <hr className='w-2/4 border-none h-[1.5px] bg-yellow-500 hidden' />

    </NavLink>
    <NavLink to='/contact' className='flex flex-col items-center gap-1'>
      <p>CONTACT</p>
      <hr className='w-2/4 border-none h-[1.5px] bg-yellow-500 hidden' />

    </NavLink>

    </ul>

    <div className='flex text-[20px] item-center gap-6'>
    <div>

    <FontAwesomeIcon onClick={()=>setShowSearch(true)} icon={faMagnifyingGlass} className=' cursor-pointer' />
    </div>

    <div className='group relative'>

    
    <Link to={'/login'}><FontAwesomeIcon icon={faUser} className='profile cursor-pointer'/></Link>
    
      
      <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4' >
      <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
      <Link to={'/profile'}> <p className='cursor-pointer hover:text-black'>My Profile</p></Link> 
      <Link to={'/orders'}>  <p className='cursor-pointer hover:text-black'>Orders</p></Link>
        <p onClick={()=>logoutuser()} className='cursor-pointer hover:text-black'>Logout</p>
      </div>
    </div>
    </div>
     
    <Link to='/cart' className='relative'>
    <FontAwesomeIcon icon={faBagShopping} />
    <p className='absolute right-[-5px] top-[15px] w-4 text-center leading-4 bg-gray-200 text-black aspect-square rounded-full text-[8px]' >
      {getCartCount()}
    </p>
    </Link>
    <div>

    <FontAwesomeIcon onClick={()=>setVisible(true)} icon={faBars} className='cursor-pointer sm:hidden' />
    </div>
    </div>

    {/* Sidbar menu for small screen  */}
    <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`} >
      <div className='flex flex-col text-gray-600'>
        <div onClick={()=>setVisible(false)} className='flex text-[22px] item-center gap-4 p-6'>
          <FontAwesomeIcon icon={faXmark} />
          
        </div>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT</NavLink>
        <NavLink onClick={()=>setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT</NavLink>
      </div>
    </div>
      
    </div>
  )
}

export default Navbar
