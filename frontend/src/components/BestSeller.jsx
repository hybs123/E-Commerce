import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import Productitem from './Productitem';
import {Card, CardBody, CardFooter, Image,Skeleton} from "@nextui-org/react";

const BestSeller = () => {

    const {products,loading,navigate} = useContext(ShopContext);
    const [bestseller,setBestseller] = useState([]);
    const url = "https://sara-organics-backend.onrender.com"

    useEffect(()=>{
        const bestproduct = products.filter((item)=>(item.bestseller));
        setBestseller(bestproduct.slice(0,5));
    },[loading])

  return (
    <div className='my-10'>
    <div className='text-center text-3xl py-8' >
        <Title text1={'BEST'} text2={"SELLERS"} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base'>
        Thank you for supporting Thunderbird, which is funded by users like you! Producing Thunderbird requires software engineers, designers, system administrators and server infrastructure. So if you like Thunderbird, the 
        </p>
    </div>

    {loading ? <Card className="w-[200px] space-y-5 p-4" radius="lg">
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
      </Card> :  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
    {bestseller.map((item, index) => (
       <Card shadow="sm" key={index} isPressable onPress={()=>navigate(`/product/${item.id}`)}>
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                
                alt={item.productname}
                className="aspect-1"
                src={`${url}${item.image[0]}`}
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
  )
}

export default BestSeller
