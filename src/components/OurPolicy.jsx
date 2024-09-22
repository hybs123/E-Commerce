import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gry-700'>
      <div>
      <FontAwesomeIcon className='text-[50px] my-6 text-gray-800' icon={faArrowRightArrowLeft} />
        <p className='font-semibold'>Easy Exchange Policy</p>
        <p className='text-yellow-600'>We offer Hassle free exchange policy</p>
      </div>
      <div>
      <FontAwesomeIcon className='text-[50px] my-6 text-gray-800' icon={faBolt} />
        <p className='font-semibold'>7 Days Return Policy </p>
        <p className='text-yellow-600'>We Provide 7 days free return policy</p>
      </div>
      <div>
      <FontAwesomeIcon className='text-[50px] my-6 text-gray-800' icon={faHandshake} />
        <p className='font-semibold'>Best customer support</p>
        <p className='text-yellow-600'>We Provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
