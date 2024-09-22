import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterbox from '../components/NewsLetterbox'

const About = () => {
  return (
    <div>
    <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT'} text2={'US'} />
    </div>

    <div className='my-10 flex flex-col md:flex-row gap-16'>
    
      <div className='flex flex-col justify-center gap-6 text-gray-600'>
        <p>Beautiful, vibrant collection of chaniya choli for Navratri and Garba. This Navratri, flaunt your festive flair with our chaniya choli collection. These ghagra choli sets will make you the eye of the event when you play dandiya. The beautiful dotted traditional lehengas and the colorful dupattas pair perfectly and work as foils for each other elevating your overall appearance. The small reflective dots all over the lehengas and blouses will make you spread your glitter and glow with every swirl. Whether you are looking for chaniya choli for wedding or a navratri chaniya choli, Sara Organics is your number one destination for all your requirements. These chaniya choli attires can be easily repurposed as stylish lehenga dresses for year-round use. This Navratri, gift a lehenga choli to the women in your life and light up their lives.</p>
        <p>Beautiful, vibrant collection of chaniya choli for Navratri and Garba. This Navratri, flaunt your festive flair with our chaniya choli collection. These ghagra choli sets will make you the eye of the event when you play dandiya. The beautiful dotted traditional lehengas and the colorful dupattas pair perfectly and work as foils for each other elevating your overall appearance. The small reflective dots all over the lehengas and blouses will make you spread your glitter and glow with every swirl. Whether you are looking for chaniya choli for wedding or a navratri chaniya choli, Sara Organics is your number one destination for all your requirements. These chaniya choli attires can be easily repurposed as stylish lehenga dresses for year-round use. This Navratri, gift a lehenga choli to the women in your life and light up their lives.</p>
        <b className='text-gray-800 '>Our Mission</b>
        <p>Beautiful, vibrant collection of chaniya choli for Navratri and Garba. This Navratri, flaunt your festive flair with our chaniya choli collection. These ghagra choli sets will make you the eye of the event when you play dandiya. The beautiful dotted traditional lehengas and the colorful dupattas pair perfectly and work as foils for each other elevating your overall appearance. The small reflective dots all over the lehengas and blouses will make you spread your glitter and glow with every swirl. Whether you are looking for chaniya choli for wedding or a navratri chaniya choli, Sara Organics is your number one destination for all your requirements. These chaniya choli attires can be easily repurposed as stylish lehenga dresses for year-round use. This Navratri, gift a lehenga choli to the women in your life and light up their lives.</p>
      </div>
    </div>

    <div className='text-xl py-4'>
      <Title text1={'WHY'} text2={'CHOOSE US'}/>
    </div>
    <div className='flex flex-col md:flex-row text-sm mb-20'>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Quality Assurance</b>
        <p className='text-gray-600'>Beautiful, vibrant collection of chaniya choli for Navratri and Garba. This Navratri, flaunt your festive flai</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Convenience</b>
        <p className='text-gray-600'>Beautiful, vibrant collection of chaniya choli for Navratri and Garba. This Navratri, flaunt your festive flai</p>
      </div>
      <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
        <b>Exceptional Customer Service</b>
        <p className='text-gray-600'>Beautiful, vibrant collection of chaniya choli for Navratri and Garba. This Navratri, flaunt your festive flai</p>
      </div>
    </div>

    <NewsLetterbox />
      
    </div>
  )
}

export default About
