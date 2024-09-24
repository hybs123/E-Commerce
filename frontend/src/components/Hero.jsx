import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';


const Hero = () => {
  const { products, loading,navigate } = useContext(ShopContext);
  const [img, setImg] = useState('');
  const [prodId, setProdId] = useState('');

  const url = "https://sara-organics-backend.onrender.com"
  const url2 = "cloudinary://399922269683698:GZZKiE0U4KUjgKIBZ3DX9OEdoD4@dcwniwn2m"

  useEffect(() => {
    if (products.length > 0) {
      const latestProduct = products[products.length - 1]; // Get the latest product
      if (latestProduct && latestProduct.image && latestProduct.image.length > 0) {
        setImg(latestProduct.image[0]);
        console.log(img);
        setProdId(latestProduct.id);
      }
    }
  }, [loading, products]);

  return (
    <div className='flex sm:flex-row flex-col'>

        <div className='w-full sm:w-3/4 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141]'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
          </div>
        </div>
      </div>
      {/* Hero right side */}
        {prodId && img && (
        <Link className='w-full sm:w-1/2' to={`/product/${prodId}`}>
          <p>{img}</p>
          <img className='w-full' src={`${img}`} alt="Latest Arrival" />
          <p>{url2}{img}</p>
          <img className='w-full' src={`${url2}${img}`} alt="Latest Arrival" />
        </Link>
      )}  


     


      

      {/* <div className=" gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="grid grid-cols-3 col-span-3 bg-pink-800 min-h-[300px]"
        className=""
      >
        <div className="col-span-3 max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Gippity AI powers the entire universe
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            With over 100,000 mothly active bot users, Gippity AI is the most
            popular AI platform for developers.
          </p>
        </div>
        <div>
          
        <Image
          src={img}
          
          alt="linear demo image"
          className="object-contain rounded-2xl"
        />
        </div>
      </WobbleCard>
     
    
    </div> */}
    </div>
  );
};

export default Hero;
