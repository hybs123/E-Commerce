import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Title from '../components/Title'
import ProductItem from '../components/Productitem'
import {Card, CardBody, CardFooter, Image,Skeleton} from "@nextui-org/react";

const Collection = () => {
  const {products,search, showsearch,loading,navigate} = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);
  const [subCategory,setsubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent');



  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item=>item!== e.target.value));
    }
    else{
      setCategory(prev=> [...prev,e.target.value]);
    }
  }

  const toggleSubcategory = (e)=>{
    if(subCategory.includes(e.target.value)){
      setsubCategory(prev=> prev.filter(item=>item!== e.target.value));
    }
    else{
      setsubCategory(prev=> [...prev,e.target.value]);
    }
  }

  const applyFilter = ()=>{

      let productsCopy = products.slice();
      
      if(showsearch && search){
        // console.log(search);
        
        productsCopy = productsCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()));
      }


      if(category.length > 0){
        productsCopy = productsCopy.filter(item => category.includes(item.category))
      }
      if(subCategory.length > 0){
        productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
      }

      setFilterProducts(productsCopy);

  }


  const sortProduct = () =>{

    let fproductsCopy = filterProducts.slice();

    switch(sortType) {
      case 'low-high':
      setFilterProducts(fproductsCopy.sort((a,b)=>(a.price-b.price)));
      break;
      case 'high-low':
      setFilterProducts(fproductsCopy.sort((a,b)=>(b.price-a.price)));
      break;
      default:
        applyFilter();
        break;
    }


  }

  
  useEffect(()=>{
      applyFilter();
  },[category,subCategory,search,showsearch,loading])

  useEffect(()=>{
      sortProduct();
      console.log(filterProducts)
  },[sortType]);

 

   return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options  */}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
        <FontAwesomeIcon className={`sm:hidden ${showFilter ? 'rotate-90' : ''}`} icon={faCaretRight} />
        </p>
        {/* Category Filter */}
        <div className={`border border-yellow-200 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`} >
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-4' type='checkbox' value={'Terracotta'} onChange={toggleCategory}/> Terracotta
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type='checkbox' value={'Cup'} onChange={toggleCategory} /> Cup
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type='checkbox' value={'Plate'} onChange={toggleCategory}/> Plate
            </p>
          </div>
        </div>
        <div className={`border border-yellow-200 pl-5 py-3 my-5 ${showFilter ? '' :'hidden'} sm:block`} >
          <p className='mb-3 text-sm font-medium'>SUB-CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-4' type='checkbox' value={'Bottle'} onChange={toggleSubcategory}/> Bottle
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type='checkbox' value={'Cup'} onChange={toggleSubcategory}/> Cup
            </p>
            <p className='flex gap-2'>
              <input className='w-4' type='checkbox' value={'Plate'} onChange={toggleSubcategory}/> Plate
            </p>
          </div>
        </div>
      </div>

      {/* Right side  */}
      <div className='flex-1' >
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'}/>
          {/* Product sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-yellow-200 text-sm px-2'>
            <option  value='relavent'>Sort by: Relavent</option>
            <option  value='low-high'>Sort by: Low to High</option>
            <option  value='high-low'>Sort by: High to Low</option>
          </select>
        </div>

        {/* Map products */}
        { loading ? <Card className="w-[200px] space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-secondary"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary-300"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-full rounded-lg bg-secondary-200"></div>
          </Skeleton>
        </div>
      </Card> : 
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 gap-y-6'>
    {filterProducts.map((item, index) => (
       <Card shadow="sm" key={index} isPressable onPress={()=>navigate(`/product/${item.id}`)}>
      

       
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                
                alt={item.productname}
                className="aspect-1"
                src={`${item.image[0]}`}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.productname}</b>
              <p className="text-default-500">{item.price}</p>
            </CardFooter>
          </Card>
        ))}
    </div>}
        
      </div>
      
    </div>
  )
}

export default Collection
