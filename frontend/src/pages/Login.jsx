import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('login');
  const { navigate, setUser } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    password: '',
    image: null,
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const url = currentState === 'login' ? 'http://localhost:3001/login' : 'http://localhost:3001/register';

    // Prepare JSON data
    const dataToSend = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        image: formData.image,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok. Status: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log('Success:', result);

        Cookies.set('token', result.response, { expires: 7, secure: true, sameSite: 'Strict' });
        setUser(result.user);
        navigate('/');

    } catch (error) {
        console.error('Error:', error.message);
        toast.error("Please enter valid user details or create a new account")
    }
};



  const handleChange = (event) => {
    const { name, type, files, value } = event.target;
    
    if (type === 'file') {
      // Handle file input change
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0] // Save the selected file
      }));
    } else {
      // Handle other input types
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'
    >
      <div className='inline-flex items-center gap-3 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {currentState !== 'login' && (
        <>
          <input
            type='file'
            name='image'
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Upload Image Here'
          />
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Name'
            required
          />
          <input
            type='text'
            name='address'
            value={formData.address}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Address'
            required
          />
          <input
            type='number'
            name='phone'
            value={formData.phone}
            onChange={handleChange}
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Phone'
            required
          />
        </>
      )}

      <input
        type='email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Email'
        required
      />
      <input
        type='password'
        name='password'
        value={formData.password}
        onChange={handleChange}
        className='w-full px-3 py-2 border border-gray-800'
        placeholder='Password'
        required
      />

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        {currentState === 'login' ? (
          <p className='cursor-pointer'>Forgot Password</p>
        ) : (
          ''
        )}
        {currentState === 'login' ? (
          <p onClick={() => setCurrentState('signup')} className='cursor-pointer'>
            Create Account
          </p>
        ) : (
          <p onClick={() => setCurrentState('login')} className='cursor-pointer'>
            Login Here
          </p>
        )}
      </div>

      <button
        type='submit'
        className='bg-black text-white font-light px-8 py-2 mt-4'
      >
        {currentState === 'login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
