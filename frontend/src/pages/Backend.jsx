import React, { useState,useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Backend = () => {

  const {user,userloading,navigate} = useContext(ShopContext);

  useEffect(()=>{
    console.log("User in admin is:",user,userloading)
    if(!userloading && user.username!=='haidersoni47@gmail.com'){
      toast.error('Admin access denied');
      navigate('/')
    }
    else if(userloading && !user.username){
      toast.error('Admin access denied');
      navigate('/')
    }
  },[userloading])

  const [formData, setFormData] = useState({
    id: '',
    productname: '',
    category: '',
    subCategory: '',
    price: '',
    stars: '',
    description: '',
    bestseller: ''
  });

  const [sizes, setSizes] = useState(['']);
  const [files, setFiles] = useState([]);
  const [shipnreturn, setShipnreturn] = useState(['']); // For multiple shipping/return policies

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle changes for the sizes array
  const handleSizeChange = (index, value) => {
    const updatedSizes = sizes.map((size, i) => (i === index ? value : size));
    setSizes(updatedSizes);
  };

  // Add new size input
  const addSizeField = () => {
    setSizes([...sizes, '']);
  };

  // Remove size input
  const removeSizeField = (index) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  // Handle file change for multiple images
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // Handle changes for shipping and return policies
  const handleShipnreturnChange = (index, value) => {
    const updatedShipnreturn = shipnreturn.map((policy, i) => (i === index ? value : policy));
    setShipnreturn(updatedShipnreturn);
  };

  // Add new shipnreturn policy field
  const addShipnreturnField = () => {
    setShipnreturn([...shipnreturn, '']);
  };

  // Remove shipnreturn policy input
  const removeShipnreturnField = (index) => {
    setShipnreturn(shipnreturn.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();

    // Append form fields
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key]);
    });

    // Append sizes array
    sizes.forEach(size => form.append('sizes', size));

    // Append multiple shipping/return policies
    shipnreturn.forEach(policy => form.append('shipnreturn', policy));

    // Append files (multiple images)
    files.forEach(file => form.append('productImage', file));

    try {
      const response = await axios.post('https://sara-organics-backend.onrender.com/uploads', form, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Form data successfully submitted:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
    <Link to={'/backendorders'}><p>Go to Backend Orders Page</p></Link>
    
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-full m-auto mt-14 gap-4 text-gray-800'>
      {/* Multiple Image inputs */}
      <input className='border border-gray-500 w-[70%] px-3 py-3' type="file" name="productImage" multiple onChange={handleFileChange} />

      {/* Text inputs */}
      <input className='border border-gray-500 w-[70%] px-3 py-3' placeholder="Id" name="id" value={formData.id} onChange={handleInputChange} />
      <input className='border border-gray-500 w-[70%] px-3 py-3' placeholder="Name" name="productname" value={formData.productname} onChange={handleInputChange} />
      <input className='border border-gray-500 w-[70%] px-3 py-3' placeholder="Category" name="category" value={formData.category} onChange={handleInputChange} />
      <input className='border border-gray-500 w-[70%] px-3 py-3' placeholder="Subcategory" name="subCategory" value={formData.subCategory} onChange={handleInputChange} />
      <input className='border border-gray-500 w-[70%] px-3 py-3' placeholder="Price" name="price" value={formData.price} onChange={handleInputChange} />
      <input className='border border-gray-500 w-[70%] px-3 py-3' placeholder="Rating" name="stars" value={formData.stars} onChange={handleInputChange} />
      <input className='border border-gray-500 w-[70%] px-3 py-3' placeholder="Description" name="description" value={formData.description} onChange={handleInputChange} />
      <input className='border border-gray-500 w-[70%] px-3 py-3' placeholder="Bestseller" name="bestseller" value={formData.bestseller} onChange={handleInputChange} />

      {/* Size inputs */}
      <div className='w-[70%]'>
        {sizes.map((size, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              className='border border-gray-500 px-3 py-3 w-full'
              placeholder="Size"
              value={size}
              onChange={(e) => handleSizeChange(index, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeSizeField(index)}
              className="bg-red-500 text-white px-3 py-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addSizeField} className="bg-blue-500 text-white px-3 py-2 mt-4">
          Add Size
        </button>
      </div>

      {/* Shipping and Return Policy inputs */}
      <div className='w-[70%]'>
        {shipnreturn.map((policy, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              className='border border-gray-500 px-3 py-3 w-full'
              placeholder="Ship and Return Policy"
              value={policy}
              onChange={(e) => handleShipnreturnChange(index, e.target.value)}
            />
            <button
              type="button"
              onClick={() => removeShipnreturnField(index)}
              className="bg-red-500 text-white px-3 py-2"
            >
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addShipnreturnField} className="bg-blue-500 text-white px-3 py-2 mt-4">
          Add Policy
        </button>
      </div>

      {/* Submit button */}
      <button className='bg-black text-white text-sm my-8 px-8 py-3' type="submit">
        Submit
      </button>
    </form>
    </div>
  );
};

export default Backend;
