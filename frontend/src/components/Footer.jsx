import React from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div>
            <img src={assets.logo} className='mb-5 w-32' />
            <p className='w-full md:w-2/3 '>Thank you for supporting Thunderbird, which is funded by users like you! Producing Thunderbird requires software engineers,</p>
            
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>COMPANY</p>
            <ul className='flex flex-col gap-1 '>
              <Link to={'/'}><li>HOME</li></Link>
                <Link to={'/adminpanel'}><li>ADMIN</li></Link>
       
                <Link to={'/about'}><li>ABOUT</li></Link>

            </ul>
        </div>

        <div>
            <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
            <ul className='flex flex-col gap-1 '>
                <li>+1-123-456-7890</li>
                <li>contact@saraorganics.com</li>
            </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @ saraorganics.com All rights reserved</p>
      </div>
    </div>
  )
}

export default Footer
