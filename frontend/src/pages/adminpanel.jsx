import React, { useEffect, useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill, faCartShopping, faClock } from '@fortawesome/free-solid-svg-icons';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import Cookies from "js-cookie";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminPanel = () => {

  const { products,currency,navigate,userloading,orders,admin } = useContext(ShopContext);
  const [ordersall, setOrdersAll] = useState([]);
  const [detailedOrders, setDetailedOrders] = useState([]);
  const [totalsales, settotalsales] = useState([]);
  const [totalrevenue,setTotalrevenue] = useState(0);
  const [user,setUser] = useState({})
  const [loading, setLoading] = useState(true); // State to track loading
  const url = 'https://sara-organics-backend.onrender.com';

  const checkAdmin = () => {
    if (user.username !== 'haidersoni47@gmail.com') {
      toast.error("Admin Access Denied");
      navigate('/');
    }
  };

  useEffect(() => {
    axios.get("https://sara-organics-backend.onrender.com/checkAuth", {
      headers: {
        Authorization: Cookies.get("token"),
      },
      withCredentials: true
    })
    .then(response => {
      setUser(response.data.rootUser);
      console.log("User Authenticated in backend");
    })
    .catch(err => console.log(err))
    .finally(() => {
      setLoading(false); // Set loading to false after the request is done
    });
  }, []);

  useEffect(() => {
    if (!loading && user) { // Only call checkAdmin when not loading and user is set
      console.log(user); // This will show the updated user
      checkAdmin();
    }
  }, [user, loading]);


  useEffect(() => {
    // Fetch orders from backend
    if(!loading){

      axios.get("https://sara-organics-backend.onrender.com/ordersbackend")
        .then(response => {
          const ordersData = response.data.ordersbackend;
          setOrdersAll(ordersData);
          // Process orders to include product details
         
          processOrdersWithProductDetails(ordersData);
        })
        .catch(err => {
          console.error("Error fetching order items from backend:", err);
        });
    }
  }, [loading,products,orders]);

  useEffect(() => {
    if (detailedOrders) {
      const filteredSales = detailedOrders.filter(order => order.track !== "Cancelled by you or returning");
      settotalsales(filteredSales);
    }
  }, [detailedOrders]);

 useEffect(() => {
    let temp = 0;
    if (Array.isArray(totalsales) && totalsales.length > 0) {
        totalsales.forEach(element => {
            if (element.productDetails && typeof element.productDetails.price === 'number') {
                temp += element.productDetails.price;
            }
        });
        setTotalrevenue(temp);
    }
}, [totalsales]);


  

  const onTrackChange = (username, orderitemid, orderitemsize, track) => {
    axios.post("https://sara-organics-backend.onrender.com/ordersbackend", {
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
    console.log("Detailed products and products",products);
    const detailedOrders = ordersData.map(order => {
      // Find product details based on orderitemid
      const product = products.find(prod => prod._id === order.orderitemid);
      return {
        ...order,
        productDetails: product || {}  // Add product details to the order
      };
    });
    console.log("Detailed Products",detailedOrders);
    
    setDetailedOrders(detailedOrders);
  };
  

  return (
    <div className='grid grid-cols-6 w-full gap-2'>
      <div className='bg-gray-300 col-span-6 md:col-span-1 flex flex-col items-center'>
        <ul>
         <Link to={'/adminpanel'}> <li>Dashboard</li></Link>
          <Link to={'/backendorders'}><li>Orders</li></Link>
         <Link to={'/backend'}> <li>Products</li></Link>
        </ul>
      </div>
      <div className='md:col-span-5 col-span-6 grid grid-cols-3 gap-2'>
        <div className='bg-blue-200 col-span-1 flex flex-row items-center justify-evenly md:text-[20px] min-h-[200px] rounded-xl text-yellow-900'>
          <FontAwesomeIcon className='text-[40px]' icon={faMoneyBill} />
          <div>
          <p className='sm:text-lg'>Total Revenue:</p>
          <b>{currency} {totalrevenue}</b>
          </div>
        </div>
        <div className='bg-green-300 col-span-1 flex flex-row items-center justify-evenly md:text-[20px] min-h-[200px] rounded-xl text-yellow-900'>
          <FontAwesomeIcon className='text-[40px]' icon={faCartShopping} />
          <div>
          <p className='sm:text-lg'>Total Orders:</p>
          <b>{detailedOrders.length}</b>
          </div>
        </div>
        <div className='bg-pink-300 col-span-1 flex flex-row items-center justify-evenly md:text-[20px] min-h-[200px] rounded-xl text-yellow-900'>
          <FontAwesomeIcon className='text-[40px]' icon={faClock} />
          <div>
          <p className='sm:text-lg'>Total Sales:</p>
          <b>{totalsales.length}</b>
          </div>
        </div>

        <div className='col-span-3'>
        <h1>PENDING ORDERS</h1>
          {
          detailedOrders.length > 0 ? (
              detailedOrders.slice(detailedOrders.length-3,detailedOrders.length).reverse().map((item,index) => (
                <div key={index} className="grid grid-cols-6 gap-4 bg-yellow-100 my-3 text-center">
    
                  <img className='col-span-1 aspect-1' src={`${url}${item.productDetails.image[0]}`} alt={item.productDetails.productname} />
                  <p className='col-span-1 md:text-[16px] text-[10px]'>{item.productDetails.productname}</p>
                  <p className='col-span-2 md:text-[16px] text-[10px]'>Buyer: {item.username}</p>
                  <p className='col-span-1 md:text-[16px] text-[10px]'>Size: {item.orderitemsize}</p>
                  <p className='col-span-1 md:text-[16px] text-[10px]'>Quantity: {item.orderitemquantity}</p>
                </div>
              ))
            ) : (
              <p>No orders available.</p>
            )
          }
        </div>


      </div>
    </div>
  );
};

export default AdminPanel;
