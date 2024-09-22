import React from 'react'

const NewsLetterbox = () => {

    const onSubmitHandler = ()=>{
        event.preventDefault();
    }
  return (
    <div className='text-center '>
        <p className='text-2xl font-medium'>Subscribe Now and get 20% Off</p>
        <p className='text-yellow-600 mt-3'>Thank you for supporting Thunderbird, which is funded by users like you! Producing Thunderbird requires software engineers,</p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center  gap-3 mx-auto my-6 border pl-3'>
            <input type='email' placeholder='Enter Your Email' className='w-full sm:flex-1 outline-none' required/>
            <button type='submit' className='bg-yellow-900 text-white text-xs px-10 py-4'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterbox
