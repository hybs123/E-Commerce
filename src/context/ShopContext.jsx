import { createContext, useEffect, useState } from "react";
import { fetchProducts } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export const ShopContext = createContext();

const ShopContextProvider = (props)=> {

    const currency = '$';
    const delivery_fee = 10;

    const [search,setSearch] = useState('');
    const [showsearch,setShowSearch] = useState(false);
    const [cart,setCart] = useState([]);
    const [carttotal,setCarttotal] = useState(0);
    const [cartitems,setCartitems] = useState({});
    const [orders,setorders] = useState([]);
    const navigate = useNavigate();
    const [products,setProducts] = useState([]);
    const [loading,setloading] = useState(true);
    const [userloading,setuserloading] = useState(true);

    const [orderloading,setorderloading] = useState(true);
    const [cartpush,setcartpush] = useState(false);
    const [user,setUser] = useState({});
    const [review,setReview] = useState([]);
    const [productreview,setproductReview] = useState();
    const [reviewloading,setreviewloading] = useState(true);
    const [starloading,setstarloading] = useState(true);

   

    useEffect(() => {
        async function getProducts() {
            try {
                const fetchedProducts = await fetchProducts();
                console.log("fetched products initial:", fetchedProducts);
                setProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setloading(false);
            }
        }
        getProducts();
    }, []);

    useEffect(() => {
        console.log("fetched products final:", products);
    }, [products]);

    // console.log("Shop Context",Cookies.get("token"));

    useEffect(() => {
        
        axios.get("http://127.0.0.1:3001/checkAuth", {
            headers: {
                Authorization: Cookies.get("token"),
            }, withCredentials: true
        })
            .then(response => {setUser(response.data.rootUser);setCart(response.data.rootUser.cart || []);console.log("User Authenticated");setuserloading(false)})
            
            .catch(err => console.log(err))
            
            
    },[])
    useEffect(() => {
        if(userloading){
            return;
        }
        if (!user.username) {
            console.log("User is not defined.");
            return;
        }
    
        axios.get("http://127.0.0.1:3001/addtocart", {
            params: { user: user.username }
        })
        .then(response => {
            console.log('use effect to get cart items and initial',cart);
            console.log('use effect to get cart items and',response.data.cart);
            setCart(response.data.cart);
            
            
        })
        .catch(err => {
            console.error("Error fetching cart items:", err);
            
        });
    }, [user,userloading]);

    useEffect(() => {
        if(userloading){
            return;
        }
        if (!user.username) {
            console.log("User is not defined.");
            return;
        }
    
        axios.get("http://127.0.0.1:3001/orders", {
            params: { user: user.username }
        })
        .then(response => {
            console.log("USe effect orders here and orders are:",response.data[0].prods);
            setorders(response.data[0].prods);
            setorderloading(false);
            
        })
        .catch(err => {
            console.error("Error fetching cart items:", err);
            
        });
    }, [user,orderloading,userloading]);

    useEffect(() => {
        if (!productreview) {
            console.log("Product review is not defined.");
            return;
        }

        axios.get("http://127.0.0.1:3001/review", {
            params: { product: productreview }
        })
        .then(response => {
            console.log("Review is called in useEffect and the response coming from get review is:", response.data);
            setReview(response.data.reviews); // Ensure response.data.reviews is the correct path
            setreviewloading(false);
        })
        .catch(err => {
            console.error("Error fetching reviews:", err);
            setreviewloading(true);
        });
    }, [productreview,reviewloading]);
    

    useEffect(() => {
        if (user.username && cart && cartpush) {
            axios.post("http://127.0.0.1:3001/addtocart", {
                user: user.username,
                cart: cart
            })
            .then(response => {
                setUser(response.data.usertoadd);
                
                setcartpush(false);
            })
            .catch(err => console.log('Error:', err));
        }
    }, [user.username,cartpush]);
    
    


    const addtocart = async (itemId,productname, size) => {
        
        if (!size) {
            toast.error('Select Product Size');
            return;
        }
        
        console.log('Adding to cart:', itemId,productname, size);
    
        // Clone the cart array to avoid direct mutation
        let cartData = structuredClone(cart || []);
        console.log('Initial cartData:', cartData);
    
        // Check if the item already exists in the cart
        const existingItemIndex = cartData.findIndex(item => item.itemId === itemId && item.size === size);
    
        if (existingItemIndex !== -1) {
            // If the item exists, update its quantity
            cartData[existingItemIndex].quantity += 1;
            console.log(`Updated quantity for itemId ${itemId}, size ${size}:`, cartData[existingItemIndex].quantity);
        } else {
            // If the item does not exist, add it to the cart
            cartData.push({ itemId,productname, size, quantity: 1 });
            console.log('Added new item to cart:', { itemId,productname, size, quantity: 1 });
        }
    
        console.log('Updated cartData:', cartData);
    
        // Update the state with the modified cartData
        
        setcartpush(true);
        setCart(cartData);
    };
    
    
    


    const getCartCount = () => {
        let totalCount = 0;
    
        // Iterate through each item in the cart array
        for (const item of cart) {
            // Add the quantity of each item to the total count
            if (item.quantity > 0) {
                totalCount += item.quantity;
            }
        }
    
        
        return totalCount;
    };
    
    
    
    


    const updatequantity = (itemId, size, quantity) => {
        
        setCart(prevCart => {
            // Create a shallow copy of the previous cart array
            const newCart = [...prevCart];
    
            // Find the index of the item in the cart array
            const itemIndex = newCart.findIndex(item => item.itemId === itemId && item.size === size);
    
            if (quantity <= 0) {
                if (itemIndex !== -1) {
                    // Remove the item if its quantity is 0 or less
                    newCart.splice(itemIndex, 1);
                }
            } else {
                if (itemIndex !== -1) {
                    // Update the existing item’s quantity
                    newCart[itemIndex].quantity = quantity;
                } else {
                    // Add the new item to the cart
                    newCart.push({ itemId, size, quantity });
                }
            }
            
            setcartpush(true);
            console.log('Updated cart:', newCart); // Debugging: Check the updated cart
            return newCart;
        });
    };
    
    
    
    

    const getCartAmount = () => {
        let totalAmount = 0;
    
        // Iterate through each item in the cart array
        for (const item of cart) {
            // Find the product information based on the item's itemId
            const itemInfo = products.find(product => product._id === item.itemId);
    
            // Calculate the amount if the product is found and the quantity is positive
            if (itemInfo && item.quantity > 0) {
                totalAmount += itemInfo.price * item.quantity;
            }
        }
    
        return totalAmount;
    };
    


    const renderStars = (rating) => {
        // Ensure rating is a number and within the range of 0 to 5
        const validRating = Math.max(0, Math.min(5, Number(rating)));
        
        const filledStars = '★'.repeat(validRating); // Repeat filled star based on rating
        const emptyStars = '☆'.repeat(5 - validRating);
        
         // Repeat empty star to make a total of 5 stars
       
        return filledStars + emptyStars;
    };
    const formatDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year
    
        return `${day}/${month}/${year}`;
    };

    const orderplaced = async (user, method, zip) => {
        if (!user) {
            toast.error('Login First to Place an Order');
            return; // Exit early if user is not defined
        }
    
        const trackDate = formatDate(); // Assuming formatDate is defined somewhere in your code
    
        try {
            // Create an array of promises for each cart item
            console.log("phone:",user.Phone,'Address:',user.Address)
                axios.post("http://127.0.0.1:3001/mail", {
                   
                    user: user,
                    
                     // Ensure user.username is defined
                    zip: zip,
                    track:`Order Placed on: ${trackDate}`,
                    method:method,
                    cart: cart
                })
                .then(response => {
                    console.log("The Message Id is:", response.data.emailInfo);
                    
                })

               
                axios.post("http://127.0.0.1:3001/orderplaced", {
                   
                    id: user.username,
                    address:user.Address,
                    phone:user.Phone,
                     // Ensure user.username is defined
                    zip: zip,
                    track:`Order Placed on: ${trackDate}`,
                    method:method,
                    prod: cart
                })
          
    
            // Wait for all promises to resolve
           
            setCart([]);
            setcartpush(true);
            setorderloading(true);
            
            console.log("The orders have been saved successfully");
            toast.success('Your Order Has been placed.');
        } catch (err) {
            console.error("Error placing orders:", err);
            toast.error('There was an error placing your order.');
        }
    };
    
    
   

    const value = {
        
        products ,orderloading,setorderloading,setorders,orders,starloading,orderplaced,setstarloading,setproductReview,renderStars, productreview,review,reviewloading,setreviewloading,user,userloading,setuserloading,setUser,loading, currency, delivery_fee, search, showsearch,setSearch,setShowSearch,cartitems,cart,setCart,addtocart,getCartCount,updatequantity,getCartAmount,navigate
    }


    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;