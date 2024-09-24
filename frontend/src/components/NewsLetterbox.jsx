import React, { useState } from 'react';

const NewsLetterbox = () => {
    const [email, setEmail] = useState('');

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('https://sara-organics-backend.onrender.com/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username:email }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Optionally handle the response here (e.g., show a success message)
            console.log('Email submitted successfully!');
            setEmail(''); // Clear the input field
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Optionally handle errors (e.g., show an error message)
        }
    };

    return (
        <div className='text-center'>
            <p className='text-2xl font-medium'>Subscribe Now and get 20% Off</p>
            <p className='text-yellow-600 mt-3'>
                Thank you for supporting Thunderbird, which is funded by users like you! Producing Thunderbird requires software engineers,
            </p>
            <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
                <input
                    type='email'
                    placeholder='Enter Your Email'
                    className='w-full sm:flex-1 outline-none'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type='submit' className='bg-yellow-900 text-white text-xs px-10 py-4'>
                    SUBSCRIBE
                </button>
            </form>
        </div>
    );
};

export default NewsLetterbox;
