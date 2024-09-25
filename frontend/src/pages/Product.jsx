import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import RelatedProducts from '../components/RelatedProducts';
import Review from '../components/Review';
import { Card, CardBody, Tabs, Tab } from "@nextui-org/react";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addtocart, productreview, review, setproductReview, reviewloading, setreviewloading, renderStars, starloading, setstarloading } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState();
  const [star, setStar] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (products.length > 0) {
      fetchProductData();
    }
  }, [products]);

  const fetchProductData = async () => {
    console.log('Available products:', products); // Log all products
    console.log('Fetching product with ID:', productId);
    const product = products.find(item => item.id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      setproductReview(product.id);
      setreviewloading(false);
      setLoading(false);
    } else {
      setLoading(false); // Handle case where product is not found
    }
  };

  const calculateStars = async () => {
    if (review.length === 0) {
      setStar(0);
      return;
    }

    let totalRating = review.reduce((acc, element) => acc + Number(element.rating), 0);
    const averageRating = totalRating / review.length;
    setStar(Math.round(averageRating));
  };

 

  useEffect(() => {
    calculateStars();
  }, [review]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner
  }

  if (!productData) {
    return <div>Product not found.</div>; // Handle case where product data is not found
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image && productData.image.map((item) => (
              <div key={item}>
                <img
                  src={`${item}`}
                  className='aspect-1 w-1/2 sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer pb-3'
                  onClick={() => setImage(item)}
                />
              </div>
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full aspect-1' src={`${image}`} alt={productData.name} />
          </div>
        </div>

        {/* Product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <p className='text-yellow-500 text-[20px]'>{renderStars(star)}</p>
            <p className='pl-1'>({review.length})</p>
          </div>
          <p className='mt-3 text-3xl font-medium'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>Finely and precisely handcrafted {productData.category} products for you.</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item) => (
                <button 
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`}
                  key={item}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => addtocart(productData._id, productData.productname, size)} 
            className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'
          >
            ADD TO CART
          </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original Product</p>
            <p>Cash on Delivery is Available</p>
            <p>Easy Return in 7 Days</p>
          </div>
        </div>
      </div>

      {/* Description and review */}
      <div className='mt-20'>
        <Tabs aria-label="Dynamic tabs">
          <Tab key='a' title='Description'>
            <Card>
              <CardBody>
                {productData.description}
              </CardBody>
            </Card>  
          </Tab>
          <Tab key='b' title='Review'>
            <Card>
              <CardBody>
                <Review props={productData.id} />
              </CardBody>
            </Card>  
          </Tab>
        </Tabs>
      </div>

      {/* Related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  );
};

export default Product;
