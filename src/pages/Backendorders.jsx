import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Backendorders = () => {
  const { products } = useContext(ShopContext);
  const [ordersall, setOrdersAll] = useState([]);
  const [detailedOrders, setDetailedOrders] = useState([]);




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

  useEffect(() => {
    // Fetch orders from backend
    axios.get("https://sara-organics-backend.vercel.app/ordersbackend")
      .then(response => {
        const ordersData = response.data.ordersbackend;
        setOrdersAll(ordersData);
        // Process orders to include product details
        processOrdersWithProductDetails(ordersData);
      })
      .catch(err => {
        console.error("Error fetching order items from backend:", err);
      });
  }, [products]);

  const onTrackChange = (username, orderitemid, orderitemsize, track) => {
    axios.post("https://sara-organics-backend.vercel.app/ordersbackend", {
      username: username,
      orderitemid: orderitemid,
      track: track,
      orderitemsize: orderitemsize
    })
    .then(response => {
      console.log("Track updated:", response.data.order);
    })
    .catch(err => console.log('Error:', err));
  };

  const processOrdersWithProductDetails = (ordersData) => {
    const detailedOrders = ordersData.map(order => {
      // Find product details based on orderitemid
      const product = products.find(prod => prod._id === order.orderitemid);
      return {
        ...order,
        productDetails: product || {}  // Add product details to the order
      };
    });
    setDetailedOrders(detailedOrders);
  };

  // Filter out orders that have track status 'Delivered to your address'
  const filteredOrders = detailedOrders.filter(item => item.track !== 'Delivered to your address');
  const filteredOrdersFinal = filteredOrders.filter(item => item.track !== 'Cancelled by you or returning');

  return (
    <div className='p-5'>
      <h3>Order Details</h3>
      {filteredOrdersFinal.length > 0 ? 
        filteredOrdersFinal.map((item, index) => (
          <div className='py-4 border-t text-gray-700 border-b grid sm:grid-cols-[2fr_4fr] items-center gap-2' key={index}>
            {item.productDetails && item.productDetails.image && (
              <div>
                <img className='' src={item.productDetails.image[0]} alt={item.productDetails.productname} />
                <p><strong>Product Name:</strong> {item.productDetails.productname}</p>
                <p><strong>Price:</strong> {item.productDetails.price}</p>
                {/* Render additional product details as needed */}
              </div>
            )}
            <div className='gap-4 flex flex-col sm:flex-row'>
              <div>
                <p><strong>Username:</strong> {item.username}</p>
                <p><strong>ZIP:</strong> {item.zip}</p>
                <p><strong>Address:</strong> {item.address}</p>
                <p><strong>Phone:</strong> {item.phone}</p>
              </div>    
              <div>
                <p><strong>Size:</strong> {item.orderitemsize}</p>
                <p><strong>Quantity:</strong> {item.orderitemquantity}</p>
                <p><strong>Method:</strong> {item.method}</p>
                <select onChange={(e) => onTrackChange(item.username, item.orderitemid, item.orderitemsize, e.target.value)}>
                  <option>{item.track}</option>
                  <option>Shipped from the store</option>
                  <option>Delivered to your address</option>
                  <option>Cancelled by you or returning</option>
                </select>
              </div>         
            </div>
          </div>
        ))
        :
        <p>No orders to display.</p>
      }
    </div>
  );
};

export default Backendorders;
