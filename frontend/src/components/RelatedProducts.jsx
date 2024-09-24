import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import Productitem from './Productitem';
import {Card, CardBody, CardFooter, Image,Skeleton} from "@nextui-org/react";

const RelatedProducts = ({category,subCategory}) => {
    const {products,navigate} = useContext(ShopContext);
    const [related,setRelated] = useState([]);

    useEffect(()=>{

        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter((item)=>category === item.category);
            productsCopy = productsCopy.filter((item)=>subCategory === item.subCategory);

            setRelated(productsCopy.slice(0,5));
            
        }

    },[products])
  return (
    <div className='my-24'>
      <div className='text-center text-3xl py-2'>
        <Title  text1={'RELATED'} text2={'PRODUCTS'}/>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y6'>
      {related.map((item, index) => (
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
      </div>
    </div>
  )
}

export default RelatedProducts
