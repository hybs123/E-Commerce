import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterbox from '../components/NewsLetterbox'

const Contact = () => {
  return (
    <div>
      
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='md:max-w-[450px]' src={assets.About} />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>1271/1 Near Fubey Lodge <br />Jabalpur</p>
          <p className='text-gray-500'>Tel: 9131105535 <br /> Email: xyz@gmail.com</p>
          {/* <p className='font-semibold text-xl text-gray-600'>Careers at Sara Organics</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button> */}
          <p></p>
        </div>
      </div>

      <NewsLetterbox />

    </div>
  )
}

export default Contact
