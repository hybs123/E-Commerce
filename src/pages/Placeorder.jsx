import React, { useContext, useState,useEffect } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/cartTotal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStripe } from '@fortawesome/free-brands-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';





const Placeorder = () => {


  const [method,setMethod] = useState('cod');
  const [zip,setzip] = useState();
  const {navigate,user,orderplaced,getCartAmount,delivery_fee} = useContext(ShopContext);
 
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if(method==='cod'){
      orderplaced(user,method,zip);
      navigate('/orders');
      return;
    }
    try {
      const response = await fetch('http://localhost:3001/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: getCartAmount()+delivery_fee }), // or use getCartCount() for the actual amount
      });
  
      // Check if the response is OK (status in the range 200-299)
      if (!response.ok) {
        const errorText = await response.text();
        console.error('HTTP error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);

 
  
      if (data.orderId && data.success) {
        const options = {
          key:'rzp_test_IMNXcjCcKrkByM',
          amount: data.amount,
          currency: data.currency,
          name: 'Sara Organics',
          description: 'Test Transaction',
          order_id: data.orderId,
          handler: function (response) {
            console.log('Payment successful:', response);
            // Call orderplaced only on successful payment
            orderplaced(user, method, zip);
            navigate('/orders');
          },
          prefill: {
            name: `${user.name}`,
            email: `${user.username}`,
            contact: `${user.Phone}`,
          },
          theme: {
            color: '#3399cc',
          },
        };
  
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        console.error('Failed to create order:', data.error);
      }
    } catch (error) {
      console.error('Payment handling error:', error.message);
    }
  };
  


  


  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 mini-h-[80vh] border-t'>
      {/* Left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl my-3 sm:text-2xl'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        
          
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' defaultValue={user.name} placeholder={user.name ? user.name : 'Name'} required/>
          {/* <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last Name'/> */}
        </div>
       
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' defaultValue={user.username} placeholder={user.username ? user.username : 'Enter Email'} required/>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' defaultValue={user.Address} placeholder={user.Address ? user.Address : 'Address'} required/>

        {/* <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' defaultValue={user.city} placeholder={user.city ? user.city : 'City'}/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' defaultValue={user.state} placeholder={user.state ? user.state : 'State'}/>
        </div> */}

        <div className='flex gap-3'>
          <input onChange={(e)=>setzip(e.target.value)} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder={'Zipcode'} required/>
          {/* <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country'/> */}
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' defaultValue={user.Phone} placeholder={user.Phone ? user.Phone : 'Phone'} required/>
        </div>

        


      </div>



        

      {/* Right side */}

      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title  text1={'PAYMENT'} text2={'METHOD'}/>
          {/* Payment Method Selection */}
          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3 h-3.5 border rounded-full ${method==='razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='w-[100px]' src={assets.razor}/>
            </div>
            <div onClick={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`min-w-3 h-3.5 border rounded-full ${method==='cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button onClick={()=>{handlePayment()}} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Placeorder
