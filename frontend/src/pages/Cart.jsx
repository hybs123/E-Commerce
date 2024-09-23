import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import CartTotal from '../components/CartTotal';
import {Card, CardBody, CardFooter, Image,Skeleton} from "@nextui-org/react";

const Cart = () => {
  const { currency, products, cartitems,user, updatequantity, navigate, cart,setCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const url = 'https://sara-organics-backend.onrender.com';

  useEffect(() => {
     
      
    if(!user.username){
      toast.error('User not logged in cannot access cart.');
      navigate('/login');
    }
      // Start with existing cart
      let tempData = [...cart];

      // Update tempData based on cartitems
      for (const itemId in cartitems) {
        for (const size in cartitems[itemId]) {
          const quantity = cartitems[itemId][size];
          if (quantity > 0) {
            // Check if item already exists in tempData
            const index = tempData.findIndex(item => item.itemId === itemId && item.size === size);
            if (index !== -1) {
              // Update existing item quantity
              tempData[index].quantity = quantity;
            } else {
              // Add new item
              tempData.push({
                itemId: itemId,
                size: size,
                quantity: quantity
              });
            }
          } else {
            // If quantity is zero or less, remove the item from tempData if it exists
            tempData = tempData.filter(item => !(item.itemId === itemId && item.size === size));
          }
        }
      }

      // Update cartData state
      setCartData(tempData);
      // setCart(tempData);
      
  }, [cart]);

  const handleQuantityChange = (itemId, size, e) => {
    console.log("Handle quantity in cart was called");
    const newQuantity = Number(e.target.value);
    if (newQuantity > 0) {
      updatequantity(itemId, size, newQuantity);
    } else {


      updatequantity(itemId, size, 0);
    }
  };

  return (

    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      <div>
        {!cartData ? (
          <div className="max-w-[300px] w-full flex items-center gap-3">
      <div>
        <Skeleton className="flex rounded-full w-12 h-12"/>
      </div>  
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-3/5 rounded-lg"/>
        <Skeleton className="h-3 w-4/5 rounded-lg"/>
      </div>
    </div>
        ) : (
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item.itemId);
            console.log("Cart and itemId is",item.itemId);
            if (!productData) return null; // Ensure productData exists
            return (
              <div key={index} className='py-4 border-t text-gray-700 border-b grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img className='w-16 sm:w-20 aspect-1' src={`${url}${productData.image[0]}`} alt={productData.name} />
                  <div>
                    <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency} {productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                <input
                  onChange={(e) => handleQuantityChange(item.itemId, item.size, e)}
                  className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                  type='number'
                  min={1}
                  value={item.quantity} // Controlled component
                />
                <FontAwesomeIcon
                  onClick={() => updatequantity(item.itemId, item.size, 0)}
                  className='cursor-pointer sm:text-[18px]'
                  icon={faTrash}
                />
              </div>
            );
          })
        )}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <button onClick={() => navigate('/placeorder')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
