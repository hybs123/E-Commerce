import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLetterbox from '../components/NewsLetterbox'

const Home = () => {
  return (
    <div className='text-yellow-900'>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPolicy />
      <NewsLetterbox />
    </div>
  )
}

export default Home
